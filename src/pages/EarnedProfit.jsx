import TopNavigation from "../components/TopNavigation";
import HeaderInfo from "../components/HeaderInfo";
import EarnUSD from "../components/EarnUSD";
function EarnedProfit() {
  return (
    <>
      <TopNavigation />
      <div className="earned-profit bg-fixed bg-no-repeat">
        <HeaderInfo />
        <EarnUSD />
      </div>
    </>
  );
}

export default EarnedProfit;
