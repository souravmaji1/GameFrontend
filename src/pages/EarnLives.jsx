import EarnLivesNav from "../components/EarnLivesNav";
import EarnLivesInfo from "../components/EarnLivesInfo";

function EarnLives() {
  return (
    <>
      <div className="bg-[#0B1426] pb-5 rounded-t-[30px] pt-4">
        <EarnLivesNav />
        <div className="earn-lives-info mx-10">
          <EarnLivesInfo />
        </div>
      </div>
    </>
  );
}

export default EarnLives;
