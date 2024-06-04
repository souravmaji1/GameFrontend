import closeBtn from "../assets/images/close_btn.svg";
import leaderBoardIcon from "../assets/images/leaderboardicon.svg";
import { Link } from "react-router-dom";



function TopNavigation() {
  return (
    <>
      <div className="topNavigation mx-5 pt-3">
        <div className="flex w-full">
          <Link to="/">
            <button className="bg-transparent border-0 mt-2">
              <img src={closeBtn} className="w-[24px]" alt="" />
            </button>
          </Link>
          <h2 className="font-inter text-[16px] text-white mx-3">
            Whale Hunter
          </h2>
          <Link className="ml-auto" to="/leaderboard-list">
            <button className="bg-[#FF772A] border-0 ml-auto flex pt-1 px-5 rounded-[13px]">
              <img src={leaderBoardIcon} className="w-[24px] mt-2" alt="" />
              <p className="font-inter text-[12px] text-white ml-3 font-bold">
                Leaderboard
              </p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TopNavigation;
