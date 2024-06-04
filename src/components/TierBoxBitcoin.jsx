import bitCoinImg from "../assets/images/bitCoinImg.svg";
import { Link } from "react-router-dom";

import supabase from "../store/supabaseClient";
import React, { useEffect,useRef, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from '../hooks/useTelegram';
import axios from "axios";

function TierBoxBitcoin() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [userTier, setUserTier] = useState(1);
  const [lives, setLives] = useState(0);
  const [points, setPoints] = useState(0);
  const [guessResult, setGuessResult] = useState(null);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [consecutiveCorrectGuesses, setConsecutiveCorrectGuesses] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const {user} = useTelegram();
  const [currentBtcPrice, setCurrentBtcPrice] = useState(0);

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

  const fetchCurrentBtcPrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const currentPrice = response.data.bitcoin.usd;
      setCurrentBtcPrice(currentPrice);
    } catch (error) {
      console.error('Error fetching BTC price:', error);
    }
  };

  useEffect(() => {
    fetchCurrentBtcPrice();
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

  const getGuessingInterval = (tier) => {
    switch (tier) {
      case 1:
        return "Daily";
      case 2:
        return "12 hours";
      case 3:
        return "6 hours";
      case 4:
        return "3 hours";
      case 5:
        return "1 hour";
      case 6:
        return "30 minutes";
      case 7:
        return "15 minutes";
      case 8:
        return "5 minutes";
      case 9:
        return "3 minutes";
      case 10:
        return "1 minute";
      default:
        return "";
    }
  };

  const calculateNextGuessTime = (tier) => {
    const currentTime = new Date();
    let nextGuessTime = new Date(currentTime);

    switch (tier) {
      case 1:
        nextGuessTime.setDate(currentTime.getDate() + 1);
        break;
      case 2:
        nextGuessTime.setHours(currentTime.getHours() + 12);
        break;
      case 3:
        nextGuessTime.setHours(currentTime.getHours() + 6);
        break;
      case 4:
        nextGuessTime.setHours(currentTime.getHours() + 3);
        break;
      case 5:
        nextGuessTime.setHours(currentTime.getHours() + 1);
        break;
      case 6:
        nextGuessTime.setMinutes(currentTime.getMinutes() + 30);
        break;
      case 7:
        nextGuessTime.setMinutes(currentTime.getMinutes() + 15);
        break;
      case 8:
        nextGuessTime.setMinutes(currentTime.getMinutes() + 5);
        break;
      case 9:
        nextGuessTime.setMinutes(currentTime.getMinutes() + 3);
        break;
      case 10:
        nextGuessTime.setMinutes(currentTime.getMinutes() + 1);
        break;
      default:
        break;
    }

    return nextGuessTime;
  };

  const nextGuessTime = calculateNextGuessTime(userTier);
  const formattedNextGuessTime = formatTime(nextGuessTime);
  const formattedNextGuessDate = formatDate(nextGuessTime);





  return (
    <div className="tierInfo mt-6">
      <h2 className="text-center text-white font-inter font-bold text-[24px] pt-3 mb-0">
        Tier {userTier}
      </h2>
      <p className="text-center text-white font-inter font-bold text-[16px] ">
        Guess price every
        <span className="text-[#ff9b63]"> {getGuessingInterval(userTier)}</span>
      </p>

      <div className="bidLimit text-center py-3">
        <img src={bitCoinImg} className="w-[96px]" alt="" />
        <h2 className="text-white font-inter font-bold text-[24px]">
        {currentBtcPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD
        </h2>
      </div>

      <p className="text-white text-center text-[16px] font-bold font-inter">
        Price at <span className="text-[#ff9b63]">{formattedTime}</span>  on{" "}
        <span className="text-[#ff9b63]">{formattedDate}</span>
      </p>
      <div className=" flex bidButtons text-center w-full justify-center">
        <Link to="/chart-price-down">
          <button className="downBtn bg-[#E40000] font-bold text-[24px] font-inter text-white py-8 px-8 relative mr-[-15px] border-0">
            DOWN <span className="text-[30px]">&#x2193;</span>
          </button>
        </Link>
        <Link to="/chart-price-up">
          <button className="upBtn bg-[#0FCEA0] font-bold text-[24px] font-inter text-white py-[32px] px-[55px] border-0">
            UP <span className="text-[30px]">&#8593;</span>
          </button>
        </Link>
      </div>
      <p className="text-white text-center text-[16px] font-light font-inter">
      {getCorrectGuessesRequiredForNextTier(userTier) - consecutiveCorrectGuesses} correct guesses until <span className="font-bold">Tier {userTier + 1}!</span>
      </p>
    </div>
  );
}

export default TierBoxBitcoin;
