import USDImg from "../assets/images/USDImg.svg";
import { Link } from "react-router-dom";
function TierBoxUSD() {
  return (
    <div className="tierInfo mt-6">
      <h2 className="text-center text-white font-inter font-bold text-[24px] pt-3 mb-0">
        Tier 2
      </h2>
      <p className="text-center text-white font-inter font-bold text-[16px] ">
        Guess price every
        <span className="text-[#ff9b63]"> 12 hours</span>
      </p>

      <div className="bidLimit text-center py-3">
        <img src={USDImg} className="w-[96px]" alt="" />
        <h2 className="text-white font-inter font-bold text-[24px]">
          0.06 USD
        </h2>
      </div>

      <p className="text-white text-center text-[16px] font-bold font-inter">
        Price at <span className="text-[#ff9b63]">02:14</span> PM on{" "}
        <span className="text-[#ff9b63]">26th March</span>
      </p>
      <div className="flex bidButtons text-center w-full justify-center">
        <Link to="/chart-price-down">
          <button className="downBtn bg-[#E40000] font-bold text-[24px] font-inter text-white py-8 px-8 relative mr-[-15px] border-0">
            Down &#x2193;
          </button>
        </Link>
        <Link to="/chart-price-up">
          <button className="upBtn bg-[#0FCEA0] font-bold text-[24px] font-inter text-white py-8 px-12 border-0">
            Up &#8593;
          </button>
        </Link>
      </div>
      <p className="text-white text-center text-[16px] font-light font-inter">
        3 correct guessess until
        <span className="font-bold"> Tier 3!</span>
      </p>
    </div>
  );
}

export default TierBoxUSD;
