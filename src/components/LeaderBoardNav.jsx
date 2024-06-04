import closeBtn from "../assets/images/close_btn.svg";
import { Link } from "react-router-dom";
// import leaderBoardIcon from "../assets/images/leaderboardicon.svg";
function LeaderBoardNav() {
  return (
    <>
      <div className="topNavigation mx-5 pt-3">
        <div className="flex w-full">
          <Link to="/">
            <button className="bg-transparent border-0 mt-2">
              <img src={closeBtn} className="w-[24px]" alt="" />
            </button>
          </Link>
          <h2 className="font-inter font-light text-[16px] text-white mx-3">
            Leaderboard
          </h2>
        </div>
      </div>
    </>
  );
}

export default LeaderBoardNav;
