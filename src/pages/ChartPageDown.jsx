import React, { useEffect, useRef, useState } from "react";
import TopNavigation from "../components/TopNavigation";
import { createChart } from "lightweight-charts";
import ChartNavigation from "../components/ChartNavigation";
import Loader from '../components/Loader';
import supabase from "../store/supabaseClient";
import HeaderInfo from "../components/HeaderInfo";
import { useTelegram } from "../hooks/useTelegram";

function ChartPageDown() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userTier, setUserTier] = useState(1);
  const [lives, setLives] = useState(0);
  const [points, setPoints] = useState(0);
  const [guessResult, setGuessResult] = useState(null);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [consecutiveCorrectGuesses, setConsecutiveCorrectGuesses] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { user } = useTelegram();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  const formattedTime = formatTime(currentDateTime);
  const formattedDate = formatDate(currentDateTime);

  const fetchHistoricalData = async () => {
    const response = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100');
    const data = await response.json();

    return data.map(candle => ({
      time: candle[0] / 1000,
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
    }));
  };

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

    const initializeChart = async () => {
      const historicalData = await fetchHistoricalData();
      candleSeries.setData(historicalData);
      setIsLoading(false);

      const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

      ws.onmessage = (event) => {
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
    };

    initializeChart();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const { id } = user;
      const { data: userData, error: fetchError } = await supabase
        .from("userdata")
        .select("*")
        .eq("userid", id)
        .single();

      if (fetchError) {
        console.error("Error fetching user data:", fetchError);
      } else {
        const { tier, lives, points, consecutiveCorrectGuesses } = userData;
        setUserTier(tier);
        setLives(lives);
        setPoints(points);
        setConsecutiveCorrectGuesses(consecutiveCorrectGuesses);
      }
    };

    fetchSession();
  }, []);

  const handleGuess = async (isUp) => {
    const { id } =  user;
    const { data: userData, error: fetchError } = await supabase
      .from("userdata")
      .select("*")
      .eq("userid", id)
      .single();
  
    if (fetchError) {
      console.error("Error fetching user data:", fetchError);
      return;
    }
  
    const { lives, resultDetermined } = userData;
  
    if (lives <= 0) {
      console.error("User doesn't have lives");
      return;
    }
  
    const currentTime = new Date().getTime();
  
    // Check if the prediction interval has ended
    if (resultDetermined) {
      // User is allowed to make a guess
      const currentPrice = candleSeriesRef.current.lastPriceData.close;
  
      const { error: updateError } = await supabase
        .from("userdata")
        .update({
          lastGuess: isUp ? 'up' : 'down',
          lastGuessPrice: Math.round(currentPrice),
          lastGuessTime: currentTime,
          currentPredictionIntervalStart: currentTime,
          resultDetermined: false,
        })
        .eq("userid", id);
  
      if (updateError) {
        console.error("Error updating user data:", updateError);
      } else {
        setHasGuessed(true);
      }
    } else {
      // User is not allowed to make a guess yet
      console.log("You cannot make a guess until your current prediction interval ends.");
    }
  };

  
  const getCorrectGuessesRequiredForNextTier = (tier) => {
    switch (tier) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
        return 5;
      case 6:
        return 6;
      case 7:
        return 7;
      case 8:
        return 8;
      case 9:
        return 9;
      case 10:
        return 10;
      default:
        return 0;
    }
  };

  return (
    <>
      <div className="chartBar bg-[#1E222D] rounded-t-[20px] h-auto">
        <TopNavigation />
        <div id="crypto-chart" ref={chartContainerRef} className="mt-8" style={{ width: '100%', height: '350px' }}>
          {isLoading ? <Loader /> : null}
        </div>
        <ChartNavigation />
        <button
          className="text-center bg-[#0F2249] mx-14 pt-4 pb-2 mt-3 rounded-[22px]"
          style={{ width: '-webkit-fill-available', border: 'none' }}
          onClick={() => handleGuess(false)}
        >
          <span className="text-white text-[12px] font-bold font-inter">Your Guess</span>
          <h2 className="text-white text-[24px] font-bold font-inter">
            Down <span>&darr;</span>
          </h2>
        </button>
        <p className="text-white text-center text-[15px] font-inter pb-5">
          {getCorrectGuessesRequiredForNextTier(userTier) - consecutiveCorrectGuesses} correct guesses until <span className="font-bold">Tier {userTier + 1}!</span>
        </p>
      </div>
    </>
  );
}

export default ChartPageDown;
