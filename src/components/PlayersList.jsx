import ListUserImage from "../assets/images/ListUserImage.svg";
import chevIcon from "../assets/images/chevIcon.svg";
function PlayersList() {
  return (
    <>
      <div className="playersList">
        <p className="font-normal font-inter text-[14px] text-white">
          All Rank Players
        </p>

        <div className="list">
          <div className="bg-[#B5923B] text-white font-inter font-bold text-[16px] px-3 py-1 rounded-[16px] mb-3">
            <span className="bg-[#6F5108] relative bottom-[30px] mr-3 mb-5 text-white font-inter font-bold py-1 px-2 rounded-full">
              1
            </span>
            <span>
              <img
                src={ListUserImage}
                width={"70x"}
                className="rounded-full"
                alt=""
              />
              <span className="relative bottom-[30px] ml-3">Laila</span>
            </span>
            <span className="float-right mt-7">
              1 <img src={chevIcon} width={"15x"} alt="" />
            </span>
          </div>

          <div className="bg-[#8A8A8A] text-white font-inter font-bold text-[16px] px-3 py-1 rounded-[16px] mb-3">
            <span className="bg-[#2B2B2B] relative bottom-[30px] mr-3 mb-5 text-white font-inter font-bold py-1 px-2 rounded-full">
              2
            </span>
            <span>
              <img
                src={ListUserImage}
                width={"70x"}
                className="rounded-full"
                alt=""
              />
              <span className="relative bottom-[30px] ml-3">Laila</span>
            </span>
            <span className="float-right mt-7">
              1 <img src={chevIcon} width={"15x"} alt="" />
            </span>
          </div>

          <div className="bg-[#5A3E25] text-white font-inter font-bold text-[16px] px-3 py-1 rounded-[16px] mb-3">
            <span className="bg-[#2B2B2B] relative bottom-[30px] mr-3 mb-5 text-white font-inter font-bold py-1 px-2 rounded-full">
              3
            </span>
            <span>
              <img
                src={ListUserImage}
                width={"70x"}
                className="rounded-full"
                alt=""
              />
              <span className="relative bottom-[30px] ml-3">Laila</span>
            </span>
            <span className="float-right mt-7">
              1 <img src={chevIcon} width={"15x"} alt="" />
            </span>
          </div>

          <div className="bg-transparent text-white font-inter font-bold text-[16px] px-3 py-1 rounded-[16px] mb-3">
            <span className="bg-[#0C3483] relative bottom-[30px] mr-3 mb-5 text-white font-inter font-bold py-1 px-2 rounded-full">
              4
            </span>
            <span>
              <img
                src={ListUserImage}
                width={"70x"}
                className="rounded-full"
                alt=""
              />
              <span className="relative bottom-[30px] ml-3">Laila</span>
            </span>
            <span className="float-right mt-7">
              1 <img src={chevIcon} width={"15x"} alt="" />
            </span>
          </div>

          <div className="bg-transparent text-white font-inter font-bold text-[16px] px-3 py-1 rounded-[16px] mb-3">
            <span className="bg-[#0C3483] relative bottom-[30px] mr-3 mb-5 text-white font-inter font-bold py-1 px-2 rounded-full">
              5
            </span>
            <span>
              <img
                src={ListUserImage}
                width={"70x"}
                className="rounded-full"
                alt=""
              />
              <span className="relative bottom-[30px] ml-3">Laila</span>
            </span>
            <span className="float-right mt-7">
              1 <img src={chevIcon} width={"15x"} alt="" />
            </span>
          </div>

          <div className="bg-transparent text-white font-inter font-bold text-[16px] px-3 py-1 rounded-[16px] mb-3">
            <span className="bg-[#0C3483] relative bottom-[30px] mr-3 mb-5 text-white font-inter font-bold py-1 px-2 rounded-full">
              6
            </span>
            <span>
              <img
                src={ListUserImage}
                width={"70x"}
                className="rounded-full"
                alt=""
              />
              <span className="relative bottom-[30px] ml-3">Laila</span>
            </span>
            <span className="float-right mt-7">
              1 <img src={chevIcon} width={"15x"} alt="" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayersList;
