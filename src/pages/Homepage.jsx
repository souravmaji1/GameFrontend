import TopNavigation from "../components/TopNavigation";
import HeaderInfo from "../components/HeaderInfo";
import TierBoxBitcoin from "../components/TierBoxBitcoin";

function Homepage() {
  return (
    <>
      <TopNavigation />
      <div className="hero-box bg-fixed bg-no-repeat">
        <HeaderInfo />
        <TierBoxBitcoin />
      </div>
    </>
  );
}

export default Homepage;
