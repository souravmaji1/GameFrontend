import WhaleCoin from "../assets/images/WhaleCoin.svg";
import heartIcon from "../assets/images/HeartIcon.svg";
import { Tooltip } from "react-tooltip";
function AirdropInfo() {
  return (
    <>
      <div className="Airdrop-Info">
        <p className="font-inter font-bold text-white text-[16px]">
          Airdrop to be distributed
        </p>
        <img src={WhaleCoin} width={"150px"} className="my-3" alt="" />
        <h2 className="font-inter font-bold text-white text-[24px]">
          500,000 $SWHALE
        </h2>
        <p className="font-inter font-bold text-white text-[16px] mb-1">
          Your Share
        </p>
        <h2 className="font-inter font-bold text-white text-[36px] m-0">
          0.21%
        </h2>
        <p className="font-inter font-bold text-white text-[16px] mb-0">
          &#8764; 450 USDT (1345 $SWHALE){" "}
        </p>
        <i className="font-inter font-noraml text-white text-[12px]">
          based on{" "}
          <span className="not-italic font-bold text-[#FF772A]">
            0.10 USDT{" "}
          </span>
          Token Listing Price
        </i>
        <h2 className="font-inter font-bold text-white text-[24px]">
          You Have <br />
          <span className="text-[#ff9b63]">4,7771</span> POINTS
        </h2>
        <button className="flex relative bg-[#030B32] mx-auto text-white border-0 py-2 pl-3 font-bold text-[12px] rounded-[6px] mt-5">
          <img src={heartIcon} className="w-[17px]" alt="" />
          <span className="text-white text-[15px] font-bold ml-4 mr-8">
            3 left
          </span>

          <a
            data-tooltip-id="my-tooltip"
            className="tooltip-info bg-[#ffffff] text-[16px] text-[#000000] rounded-full"
            data-tooltip-content="1 life = 30 Minutes"
          >
            i
          </a>
          <Tooltip id="my-tooltip" />
        </button>
        <div className="text-center purchase-btn px-12 bg-[#0FCEA0] py-7 mt-3 rounded-[22px]">
          <span className="text-white text-[24px] m-0 font-bold font-inter">
            Purchase Lives
          </span>
          <br />
          <span className="text-white text-[16px] font-bold m-0 font-inter">
            1 Purchased <img src={heartIcon} className="w-[17px]" alt="" /> = 1
            Point
          </span>
        </div>
      </div>
    </>
  );
}

export default AirdropInfo;
