import heartIcon from "../assets/images/HeartIcon.svg";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import supabase from "../store/supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";

function HeaderInfo() {
  const [session, setSession] = useState(null);
  const [userTier, setUserTier] = useState(1);
  const [lives, setLives] = useState(0);
  const [points, setPoints] = useState(0);
  const [consecutiveCorrectGuesses, setConsecutiveCorrectGuessest] = useState(0);
  const [timeInterval, setTimeInterval] = useState(0);
  const [lastGuessTime, setlastGuessTime] = useState(0);
  const navigate = useNavigate();

  const { user } = useTelegram();

  useEffect(() => {
    const fetchUser = async () => {
      const { id, username, photo_url } = user;

      // Check if the user exists in the 'userdata' table
      const { data: userData, error: fetchError } = await supabase
        .from("userdata")
        .select("*")
        .eq("userid", id);

      if (fetchError) {
        console.error("Error fetching user data:", fetchError);
      } else if (userData.length === 0) {
        // If the user doesn't exist, insert their data with default values
        const { error: insertError } = await supabase.from("userdata").insert([
          {
            userid: id,
            username,
            photo: photo_url,
            tier: 1,
            lives: 1,
            points: 0,
            consecutiveCorrectGuesses: 0,
            timeInterval: 0,
            lastGuessTime: 0,
            currentPredictionIntervalStart: new Date().getTime(),
          },
        ]);

        if (insertError) {
          console.error("Error inserting user data:", insertError);
        } else {
          console.log("User data inserted successfully");
          setUserTier(1);
          setLives(1);
          setPoints(0);
          setConsecutiveCorrectGuessest(0);
          setTimeInterval(0);
          setlastGuessTime(0);
        }
      } else {
        // User already exists, update state variables with existing data
        console.log("User already exists:", userData);
        const userRecord = userData[0];
        setUserTier(userRecord.tier);
        setLives(userRecord.lives);
        setPoints(userRecord.points);
        setConsecutiveCorrectGuessest(userRecord.consecutiveCorrectGuesses);
        setTimeInterval(userRecord.timeInterval);
        setlastGuessTime(userRecord.lastGuessTime);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="mx-8 pt-6">
      <h2 className="font-inter font-bold text-white ml-2 text-[24px]">
        Hey, {user?.username}! You Have <br />
        <span className="text-[#ff9b63]">{points}</span> POINTS
      </h2>
      
      <Link to="/airdrop-status">
        <button className="bg-[#030B32] text-white border-0 py-2 px-3 font-bold text-[12px] rounded-[6px]">
          Check Airdrop Status
        </button>
      </Link>
      <br />
      <button className="flex relative bg-[#171546] text-white border-0 py-2 pl-3 font-bold text-[12px] rounded-[6px] mt-5">
        <img src={heartIcon} className="w-[17px]" alt="" />
        <span className="text-white text-[15px] font-bold ml-2 mr-12"> {lives} left </span>
        <a
          data-tooltip-id="my-tooltip"
          className="tooltip-info bg-[#ffffff] text-[16px] text-[#000000] rounded-full"
          data-tooltip-content="1 life = 30 Minutes"
          data-tooltip-place="right"
        >
          i
        </a>
        <Tooltip id="my-tooltip" />
      </button>
      <br />
      <div className="flex">
        <Link to="/earn-lives">
          <button className="flex bg-[#373573] text-white border-0 py-2 pl-3 font-bold text-[12px] rounded-[6px]">
            <img src={heartIcon} className="w-[17px]" alt="" />
            <span className="text-white text-[15px] font-bold font-inter ml-2 mr-3">
              Earn lives
            </span>
          </button>
        </Link>
        <Link to="/earn-lives">
          <button className="text-white text-[25px] border-0 ml-3 px-2 rounded-[9px] bg-[#0FCEA0]">
            +
          </button>
        </Link>
      </div>
    </div>
  ) 
}

export default HeaderInfo;
