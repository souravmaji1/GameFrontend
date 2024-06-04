import TopNavigation from "../components/TopNavigation";
import HeaderInfo from "../components/HeaderInfo";
import LossUSD from "../components/LossUSD";
function LossProfite() {
  return (
    <>
      <TopNavigation />
      <div className="loss-profit bg-fixed bg-no-repeat ">
        <HeaderInfo />
        <LossUSD />
      </div>
    </>
  );
}

export default LossProfite;
