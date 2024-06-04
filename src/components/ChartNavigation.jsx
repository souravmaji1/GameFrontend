import { Tooltip } from "react-tooltip";
import heartIcon from "../assets/images/HeartIcon.svg";
import { Link } from "react-router-dom";
import supabase from "../store/supabaseClient";
import React from "react";
import { useState,useEffect } from "react";
import { useTelegram } from "../hooks/useTelegram";

function ChartNavigation() {
  const [lives, setLives] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const {user} = useTelegram();

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
            const { lives } = userData;
            setLives(lives);
          }
        };
      
    

    fetchSession();
  }, []);



  return (
    <div className="text-center mx-7">
      <p className="text-white text-center text-[16px]  font-inter">
        Check the price after :
        <br />
        <span className="text-[#FF772A] font-bold">{formattedTime}</span> on the{" "}
        <span className="text-[#FF772A] font-bold">{formattedDate}</span>
      </p>
      <div className="flex w-100 justify-center">
        <button className="flex relative bg-[#373573] w-100 text-white border-0 py-2 pl-4 font-bold text-[12px] rounded-[6px] ml-2">
          <img src={heartIcon} className="w-[17px]" alt="" />
          <span className="text-white text-[15px] font-bold ml-5 mr-8">
            {lives} left
          </span>

          <a
            data-tooltip-id="my-tooltip"
            className="tooltip-info bg-[#ffffff] text-[16px] text-[#000000] rounded-full"
            data-tooltip-content="1 life = 30 Minutes"
          >
            i
          </a>
          <Tooltip id="my-tooltip" />
        </button>

        {/* <div className="flex"> */}
        <Link to="/earn-lives">
          <button className="bg-[#373573] text-white border-0 py-2 pl-3 font-bold text-[12px] rounded-[6px] ml-2">
            <img src={heartIcon} className="w-[17px]" alt="" />
            <span className="text-white text-[15px] font-bold font-inter ml-2 mr-3">
              Earn lives
            </span>
          </button>
        </Link>
        <Link to="/earn-lives">
          <button className="text-white text-[30px]  border-0 mx-2 px-2 rounded-[9px] bg-[#0FCEA0] ">
            +
          </button>
        </Link>

        {/* </div> */}
      </div>
      <Link to="/airdrop-status">
        <button className="text-white pl-14 pr-10 mt-3 text-[16px] border-0 mx-2 px-2 rounded-[9px] bg-[#FF772A] ">
          <span className="relative top-[-7px]">Check Airdrop Status</span>{" "}
          <span className="text-[40px]">&rarr;</span>
        </button>
      </Link>
    </div>
  );
}

export default ChartNavigation;
