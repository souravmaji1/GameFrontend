import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import chevIcon from "../assets/images/chevIcon.svg";
import chevronDown from "../assets/images/chevronDown.svg";
import ListUserImage from "../assets/images/ListUserImage.svg";
import supabase from "../store/supabaseClient";
import { useTelegram } from "../hooks/useTelegram";

function LeaderBoardInfo() {
  const location = useLocation();
  const isStreakList = location.pathname.includes("/streak-list");
  const { user } = useTelegram();

  const options = [
    { value: "Tiers 1", label: "Tiers 1" },
    { value: "Tiers 2", label: "Tiers 2" },
    { value: "Tiers 3", label: "Tiers 3" },
    { value: "Tiers 4", label: "Tiers 4" },
  ];

  const defaultOption = options[0];
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [selectedTier, setSelectedTier] = useState(1);
  const [sortedUserData, setSortedUserData] = useState([]);
  const [streakUserData, setStreakUserData] = useState([]);
  const [isStreakView, setIsStreakView] = useState(false);

  const handleTierChange = (option) => {
    setSelectedOption(option);
    setSelectedTier(parseInt(option.value.slice(5)));
    setIsStreakView(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: userData, error } = await supabase
        .from("userdata")
        .select("*")
        .eq("tier", selectedTier)
        .order("points", { ascending: false });

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setSortedUserData(userData);
      }
    };

    fetchUserData();
  }, [selectedTier]);

  useEffect(() => {
    const fetchInitialUserData = async () => {
      const { data: userData, error } = await supabase
        .from("userdata")
        .select("*")
        .eq("tier", 1)
        .order("points", { ascending: false });

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setSortedUserData(userData);
      }
    };

    fetchInitialUserData();
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: isStreakList ? "#FFAD7E" : "#FF772A",
      border: "none",
      borderRadius: "33px",
      textAlign: "center",
      fontFamily: "Inter, sans-serif",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
      fontWeight: 700,
      fontSize: "16px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      backgroundImage: `url(${chevronDown})`,
      backgroundSize: "cover",
      width: "15px",
      height: "15px",
      marginRight: "15px",
      marginLeft: "15px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FBD5C0" : "transparent",
      color: state.isSelected ? "black" : "black",
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
      fontWeight: state.isSelected ? 700 : "normal",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px",
    }),
    menu: (provided) => ({
      ...provided,
      borderBottomLeftRadius: "33px",
      borderBottomRightRadius: "33px",
    }),
  };

  const currentUserIndex = sortedUserData.findIndex(
    (data) => data.username === user.username
  );

  const fetchStreakUserData = async () => {
    const { data: userData, error } = await supabase
      .from("userdata")
      .select("*")
      .order("consecutiveCorrectGuesses", { ascending: false });

    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      setStreakUserData(userData);
    }
  };

  const handleStreakClick = () => {
    fetchStreakUserData();
    setIsStreakView(true);
  };

  return (
    <>
      <div className="userInfo">
        <h2 className="font-inter font-bold text-white text-[16px]">
          HI, {user.username}
        </h2>
        <p className="text-white text-[14px] font-inter font-normal">
          Your Currently Rank{" "}
          <span className="float-right">
            {currentUserIndex !== -1 ? currentUserIndex + 1 : "N/A"}{" "}
            <img src={chevIcon} width={"15px"} alt="" />
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="tier-select">
          <Select
            options={options}
            styles={customStyles}
            className="font-inter"
            value={selectedOption}
            onChange={handleTierChange}
          />
        </div>
        <div className="streakBtn">
          <button
            className={`bg-${
              isStreakList ? '[#FF772A]' : '[#FFAD7E]'
            } rounded-[33px] border-[1px] border-${
              isStreakList ? '[#FF772A]' : '[#FFAD7E]'
            } py-2 font-inter font-bold text-black text-[16px] w-full`}
            onClick={handleStreakClick}
          >
            Streak
          </button>
        </div>
      </div>

      <div className="playersList">
        <p className="font-normal font-inter text-[14px] text-white">
          All Rank Players
        </p>

        <div className="list">
          {isStreakView
            ? streakUserData.map((user, index) => (
                <div
                  key={user.id}
                  className="bg-[#8A8A8A] text-white font-inter font-bold text-[16px] px-3 py-1 rounded-[16px] mb-3"
                >
                  <span className="bg-[#2B2B2B] relative bottom-[30px] mr-3 mb-5 text-white font-inter font-bold py-1 px-2 rounded-full">
                    {index + 1}
                  </span>
                  <span>
                    {user.photo_url ? (
                      <img
                        src={user.photo_url}
                        width={"70px"}
                        className="rounded-full"
                        alt=""
                      />
                    ) : (
                      <img
                        src={ListUserImage}
                        width={"70px"}
                        className="rounded-full"
                        alt=""
                      />
                    )}
                    <span className="relative bottom-[30px] ml-3">
                      {user.username}
                    </span>
                  </span>
                  <span className="float-right mt-7">
                    {user.consecutiveCorrectGuesses}{" "}
                    <img src={chevIcon} width={"15px"} alt="" />
                  </span>
                </div>
              ))
            : sortedUserData.map((user, index) => (
                <div
                  key={user.id}
                  className="bg-[#8A8A8A] text-white font-inter font-bold text-[16px] px-3 py-1 rounded-[16px] mb-3"
                >
                  <span className="bg-[#2B2B2B] relative bottom-[30px] mr-3 mb-5 text-white font-inter font-bold py-1 px-2 rounded-full">
                    {index + 1}
                  </span>
                  <span>
                    {user.photo_url ? (
                      <img
                        src={user.photo_url}
                        width={"70px"}
                        className="rounded-full"
                        alt=""
                      />
                    ) : (
                      <img
                        src={ListUserImage}
                        width={"70px"}
                        className="rounded-full"
                        alt=""
                      />
                    )}
                    <span className="relative bottom-[30px] ml-3">
                      {user.username}
                    </span>
                  </span>
                  <span className="float-right mt-7">
                    {user.points} <img src={chevIcon} width={"15px"} alt="" />
                  </span>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default LeaderBoardInfo;
