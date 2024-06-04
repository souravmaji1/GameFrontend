import Homepage from "../pages/Homepage";
import { Route, Routes as Switch } from "react-router-dom";
import BidTier from "../pages/BidTier";
import ChartPageUP from "../pages/ChartPageUP";
import ChartPageDown from "../pages/ChartPageDown";
import EarnedProfit from "../pages/EarnedProfit";
import LossProfite from "../pages/LossProfit";
import LeaderBoardList from "../pages/LeaderBoardList";
import AirdropStatus from "../pages/AirdropStatus";
import EarnLives from "../pages/EarnLives";
import StreakList from "../pages/StreaksList";


function Routes() {
  return (
    <Switch>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/select-price" element={<BidTier />} />
      <Route exact path="/chart-price-up" element={<ChartPageUP />} />
      <Route exact path="/chart-price-down" element={<ChartPageDown />} />
      <Route exact path="/profit-earned" element={<EarnedProfit />} />
      <Route exact path="/profit-loss" element={<LossProfite />} />
      <Route exact path="/leaderboard-list" element={<LeaderBoardList />} />
      <Route exact path="/airdrop-status" element={<AirdropStatus />} />
      <Route exact path="/earn-lives" element={<EarnLives />} />
      <Route exact path="/streak-list" element={<StreakList />} />
    </Switch>
  );
}

export default Routes;
