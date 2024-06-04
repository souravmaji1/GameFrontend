import LossUSDIMG from "../assets/images/LossUSDIMG.svg";
function LossUSD() {
  return (
    <div className="tierInfo mt-6">
      <p className="text-center text-white font-inter pt-4 text-[16px] ">
        Your last guess!
      </p>

      <div className="bidLimit text-center py-3 relative">
        <div className="flex">
          <span className="rounded-full bg-[#D9D9D9] py-2 px-3 text-[24px] font-bold font-inter absolute right-[40%] top-[0px] z-10">
            -1
          </span>
          <span className="bg-[#F64949] p-2 text-[24px] text-white pl-8 font-bold font-inter absolute right-[22%] top-[0px] rounded-[14px] pr-3">
            Point
          </span>
        </div>
        <img src={LossUSDIMG} className="w-[96px]" alt="" />
        <h2 className="text-white font-inter font-bold text-[24px]">
          0.06 USD &gt; <span className="text-[#6FCD35]">10.00 USD</span>
        </h2>
      </div>

      <p className="text-white text-center text-[16px] font-bold font-inter">
        Price at <span className="text-[#ff9b63]">02:14</span> PM on{" "}
        <span className="text-[#ff9b63]">23th March</span>
      </p>

      <div className="text-center bg-[#134292] mx-14 pt-4 pb-2 mt-3 rounded-[22px]">
        <h2 className="text-white text-[24px] font-bold font-inter">Next</h2>
      </div>
      <p className="text-white text-center text-[16px] font-light font-inter">
        3 correct guessess until
        <span className="font-bold"> Tier 3!</span>
      </p>
    </div>
  );
}

export default LossUSD;
