import HeaderInfo from "./components/HeaderInfo";
// import TierBoxBitcoin from "./components/TierBoxBitcoin";
import TierBoxUSD from "./components/TierBoxUSD";
import TopNavigation from "./components/TopNavigation";

function BidTier() {
  return (
    <>
      <TopNavigation />
      <div className="hero-box bg-fixed bg-no-repeat ">
        <HeaderInfo />
        <TierBoxUSD />
      </div>
    </>
  );
}

export default BidTier;
