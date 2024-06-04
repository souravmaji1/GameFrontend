import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import Loader from './Loader';
import supabase from "../store/supabaseClient";

function TradingChart() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [userTier, setUserTier] = useState(1);
  const [lives, setLives] = useState(0);
  const [points, setPoints] = useState(0);
  const [guessResult, setGuessResult] = useState(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: chartContainerRef.current.offsetHeight,
      layout: {
        background: { color: '#171B26' },
        textColor: '#8A8D97',
      },
      grid: {
        vertLines: {
          color: '#636363',
          style: 0,
          visible: true,
        },
        horzLines: {
          color: '#636363',
          style: 0,
          visible: true,
        }
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#485158',
      },
      priceScale: {
        borderColor: '#485158',
      },
    });

    const candleSeries = chart.addCandlestickSeries();
    candleSeriesRef.current = candleSeries;
    chartRef.current = chart;

    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

    ws.onmessage = (event) => {
      setIsLoading(false);
      const message = JSON.parse(event.data);
      const candle = message.k;

      const newCandle = {
        time: candle.t / 1000,
        open: parseFloat(candle.o),
        high: parseFloat(candle.h),
        low: parseFloat(candle.l),
        close: parseFloat(candle.c),
      };

      if (candleSeriesRef.current) {
        candleSeriesRef.current.update(newCandle);
        candleSeriesRef.current.lastPriceData = newCandle;
      }
    };

    return () => {
      if (ws) ws.close();
      if (chartRef.current) chartRef.current.remove();
    };
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session: fetchedSession }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setSession(fetchedSession);

        if (fetchedSession) {
          const { user } = fetchedSession;
          const { id: userId } = user;

          const { data: userData, error: fetchError } = await supabase
            .from("userdata")
            .select("*")
            .eq("userid", userId)
            .single();

          if (fetchError) {
            console.error("Error fetching user data:", fetchError);
          } else {
            const { tier, lives, points } = userData;
            setUserTier(tier);
            setLives(lives);
            setPoints(points);
          }
        }
      }
    };

    fetchSession();
  }, []);

  const handleGuess = async (isUp) => {
    if (!session) {
      console.error("User session not available");
      return;
    }


    const { user } = session;
    const { id: userId } = user;

    const { data: userData, error: fetchError } = await supabase
      .from("userdata")
      .select("*")
      .eq("userid", userId)
      .single();

    if (fetchError) {
      console.error("Error fetching user data:", fetchError);
      return;
    }

  
    const { tier, lives, points, consecutiveCorrectGuesses, timeInterval, lastGuessTime } = userData;

    if (lives <= 0) {
      console.error("User don't have lives");
      return;
    }

    // Determine if the guess is correct based on the last candlestick data
    const isCorrect =
      (isUp && candleSeriesRef.current.lastPriceData.close > candleSeriesRef.current.lastPriceData.open) ||
      (!isUp && candleSeriesRef.current.lastPriceData.close < candleSeriesRef.current.lastPriceData.open);

    let newTier = tier;
    let newLives = lives;
    let newPoints = points;
    let newConsecutiveCorrectGuesses = isCorrect ? consecutiveCorrectGuesses + 1 : 0;
    let newTimeInterval = 0;
  
    const currentTime = new Date().getTime();
    const timeSinceLastGuess = lastGuessTime ? currentTime - lastGuessTime : 0;

    console.log(newConsecutiveCorrectGuesses)
  
    if (isCorrect) {
      // Increment the tier based on the tier progression rules and time intervals
      
      switch (tier) {
        case 1:
          newPoints += 1;
          newLives--;
          if (newConsecutiveCorrectGuesses === 1) {
            newTier = 2;
            newConsecutiveCorrectGuesses = 0;
          }
          break;
        case 2:
          newPoints += 2;
          newLives--;
          if (newConsecutiveCorrectGuesses === 2 && timeSinceLastGuess >= 12 * 60 * 60 * 1000) {
            newTier = 3;
            newConsecutiveCorrectGuesses = 0;
          }
          break;
        case 3:
          newPoints += 3;
          if (newConsecutiveCorrectGuesses === 3 && timeSinceLastGuess >= 6 * 60 * 60 * 1000) {
            newTier = 4;
            newLives--;
            newConsecutiveCorrectGuesses = 0;
          }
          break;
        case 4:
          newPoints += 4;
          if (newConsecutiveCorrectGuesses === 4 && timeSinceLastGuess >= 3 * 60 * 60 * 1000) {
            newTier = 5;
            newLives--;
            newConsecutiveCorrectGuesses = 0;
          }
          break;
        case 5:
          newPoints += 5;
          if (newConsecutiveCorrectGuesses === 5 && timeSinceLastGuess >= 60 * 60 * 1000) {
            newTier = 6;
            newLives--;
            newConsecutiveCorrectGuesses = 0;
          }
          break;
        case 6:
          newPoints += 6;
          if (newConsecutiveCorrectGuesses === 6 && timeSinceLastGuess >= 30 * 60 * 1000) {
            newTier = 7;
            newLives--;
            newConsecutiveCorrectGuesses = 0;
          }
          break;
        case 7:
          newPoints += 7;
          if (newConsecutiveCorrectGuesses === 7 && timeSinceLastGuess >= 15 * 60 * 1000) {
            newTier = 8;
            newLives--;
            newConsecutiveCorrectGuesses = 0;
          }
          break;
        case 8:
          newPoints += 8;
          if (newConsecutiveCorrectGuesses === 8 && timeSinceLastGuess >= 5 * 60 * 1000) {
            newTier = 9;
            newLives--;
            newConsecutiveCorrectGuesses = 0;
          } else {
            newTimeInterval++;
          }
          break;
        case 9:
          newPoints += 9;
          if (newConsecutiveCorrectGuesses === 9 && timeSinceLastGuess >= 3 * 60 * 1000) {
            newTier = 10;
            newLives--;
            newConsecutiveCorrectGuesses = 0;
          } else {
            newTimeInterval++;
          }
          break;
        case 10:
          newPoints += 10;
          if (newConsecutiveCorrectGuesses === 10 && timeSinceLastGuess >= 60 * 1000) {
            // Stay at Tier 10
          } else {
            newTier = 9;
            newTimeInterval = 0;
          }
          break;
        default:
          break;
      }
      newPoints += tier;
    } else {
      // Decrement the tier if the user guessed incorrectly
      if (tier > 1) {
        newTier--;
      }
      newLives--;
      newTimeInterval = 0; // Reset the time interval counter
      newConsecutiveCorrectGuesses = 0; // Reset the consecutive correct guesses counter
    }
  
    setGuessResult(isCorrect ? 'Correct' : 'Incorrect');
   
    // Update the user data in the database
    const { error: updateError } = await supabase
      .from("userdata")
      .update({ tier: newTier, lives: newLives, points: newPoints, consecutiveCorrectGuesses: newConsecutiveCorrectGuesses, timeInterval: newTimeInterval, lastGuessTime: currentTime })
      .eq("userid", userId);

    if (updateError) {
      console.error("Error updating user data:", updateError);
    } else {
      setUserTier(newTier);
      setLives(newLives);
      setPoints(newPoints);
    }
  };

  

  const regenerateLife = async () => {
    if (!session) {
      console.error("User session not available");
      return;
    }

    const { user } = session;
    const { id: userId } = user;

    const { data: userData, error: fetchError } = await supabase
      .from("userdata")
      .select("*")
      .eq("userid", userId)
      .single();

    if (fetchError) {
      console.error("Error fetching user data:", fetchError);
      return;
    }

    const { tier, lives } = userData;
    const newLives = Math.min(lives + 1, tier);

    const { error: updateError } = await supabase
      .from("userdata")
      .update({ lives: newLives })
      .eq("userid", userId);

    if (updateError) {
      console.error("Error updating user data:", updateError);
    } else {
      setLives(newLives);
    }
  };

  useEffect(() => {
    const interval = setInterval(regenerateLife, 30 * 60 * 1000); // 30 minutes in milliseconds

    // 30 * 60 * 1000
    return () => {
      clearInterval(interval);
    };
  }, [regenerateLife, session]);

  return (
    <div>
      <div id="crypto-chart" ref={chartContainerRef} className="mt-8" style={{ width: '100%', height: '350px' }}>
        {isLoading ? <Loader /> : null}
      </div>
      <div>
        <button onClick={() => handleGuess(true)}>Up</button>
        <button onClick={() => handleGuess(false)}>Down</button>
      </div>
      {guessResult && <p>Your guess was: {guessResult}</p>}
    </div>
  );
}

export default TradingChart;