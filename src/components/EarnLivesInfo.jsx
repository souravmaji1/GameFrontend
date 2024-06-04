import SingleInvite from "../assets/images/SingleInvite.svg";
import heartIcon from "../assets/images/HeartIcon.svg";
import Twitter from "../assets/images/Twitter.svg";
import Telegram from "../assets/images/Telegram.svg";
import Clipboard from "../assets/images/Clipboard.svg";
import HeartBucket from "../assets/images/HeartBucket.svg";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTelegram } from "../hooks/useTelegram";
import supabase from "../store/supabaseClient";

function EarnLivesInfo() {
 
  const [tonConnectUI] = useTonConnectUI();
  const {user} = useTelegram();

  const transaction = {
    messages: [
        {
            address: "0QDxGGuxF6w2Sikwcwf1PuHF5SH6v6HR8WiXCuCZox03PddZ", // destination address
            amount: "20000000" //Toncoin in nanotons
        }
    ]}

const handleClick = async () => {
  try {
    const call = await tonConnectUI.sendTransaction(transaction);

    if (call.boc){
      await handleTransactionSuccess();
    }

  } catch (error) {
    console.error('Error sending transaction:', error);
  }
};


    const handleTransactionSuccess = async () => {
      
    
      const { id } = user;
      
      const { data: userData, error: fetchError } = await supabase
        .from("userdata")
        .select("*")
        .eq("userid", id)
        .single();
    
      if (fetchError) {
        console.error("Error fetching user data:", fetchError);
        return;
      }
    
      const { lives } = userData;
      const newLives = lives + 10;
    
      const { error: updateError } = await supabase
        .from("userdata")
        .update({ lives: newLives })
        .eq("userid", id);
    
      if (updateError) {
        console.error("Error updating user data:", updateError);
      } else {
        console.log("send and get lives");
      }
    };

    const handleInviteFriend = async () => {
      const botUsername = "lovedlydtoday_bot";
      const shareUrl = `https://t.me/share/url?url=https://t.me/${botUsername}`;
      window.open(shareUrl, "_blank");
    
      try {
        // Get the user's data
        const { id } = user;
        const { data: userData, error: fetchError } = await supabase
          .from("userdata")
          .select("*")
          .eq("userid", id)
          .single();
    
        if (fetchError) {
          console.error("Error fetching user data:", fetchError);
          return;
        }
    
        const { lives } = userData;
        const newLives = lives + 10;
    
        // Update the user's lives in the database
        const { error: updateError } = await supabase
          .from("userdata")
          .update({ lives: newLives })
          .eq("userid", id);
    
        if (updateError) {
          console.error("Error updating user data:", updateError);
        } else {
          console.log("User lives updated successfully.");
        }
      } catch (error) {
        console.error("Error handling invite friend:", error);
      }
    };



  return (
    <>
      <div>
        <p className="font-inter font-bold text-white text-[16px]">
          Earn Lives {user?.username}
        </p>
        
        <TonConnectButton  />
        <br>
        </br>
        <div className="invitation-box bg-[#0F2249] rounded-[24px] px-8 pt-8 pb-6 mb-3">
          <div className="flex">
            <div>
              <img src={SingleInvite} width={"54px"} alt="" />
            </div>
            <div className="ml-7">
              <span className="font-inter font-bold text-[16px] text-white">
                Invite a Friend
              </span>
              <br />
              <span className="font-inter font-bold text-[16px] text-white">
                +10{" "}
                <img
                  className="relative top-[5px] left-[5px]"
                  src={heartIcon}
                  width={"20px"}
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>

        <div className="invitation-box bg-[#0F2249] rounded-[24px] px-8 pt-8 pb-6 mb-3">
          <div className="flex">
            <div className="relative">
              <span className="absolute right-[-5px] top-[-10px] px-1 py-1 rounded-full bg-[#D9D9D9] text-black font-bold font-inter text-[14px]">
                10
              </span>
              <img src={SingleInvite} width={"54px"} alt="" />
            </div>
            <div className="ml-7"  onClick={handleInviteFriend}  >
              <span className="font-inter font-bold text-[16px] text-white">
                Invite a Friend
              </span>
              <br />
              <span className="font-inter font-bold text-[16px] text-white">
                +10{" "}
                <img
                  className="relative top-[5px] left-[5px]"
                  src={heartIcon}
                  width={"20px"}
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>

        <div className="invitation-box bg-[#0F2249] rounded-[24px] px-8 pt-8 pb-6 mb-3">
          <div className="flex">
            <div>
              <img src={Twitter} width={"54px"} alt="" />
            </div>
            <div className="ml-7">
              <span className="font-inter font-bold text-[16px] text-white">
                Follow Smartwhales on X
              </span>
              <br />
              <span className="font-inter font-bold text-[16px] text-white">
                +10{" "}
                <img
                  className="relative top-[5px] left-[5px]"
                  src={heartIcon}
                  width={"20px"}
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>

        <div className="invitation-box bg-[#0F2249] rounded-[24px] px-8 pt-8 pb-6 mb-3">
          <div className="flex">
            <div>
              <img src={Telegram} width={"54px"} alt="" />
            </div>
            <div className="ml-7">
              <span className="font-inter font-bold text-[16px] text-white">
                Join Smartwhales on telegram
              </span>
              <br />
              <span className="font-inter font-bold text-[16px] text-white">
                +10{" "}
                <img
                  className="relative top-[5px] left-[5px]"
                  src={heartIcon}
                  width={"20px"}
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>

        <div className="invitation-box bg-[#0F2249] rounded-[24px] px-8 pt-8 pb-6 mb-3">
          <div className="flex">
            <div>
              <img src={Clipboard} width={"54px"} alt="" />
            </div>
            <div className="ml-7">
              <span className="font-inter font-bold text-[16px] text-white">
                Tonstarter Task
              </span>
              <br />
              <span className="font-inter font-bold text-[16px] text-white">
                +10{" "}
                <img
                  className="relative top-[5px] left-[5px]"
                  src={heartIcon}
                  width={"20px"}
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>

       <button style={{background:'none',padding:'0',border:'none',width:"100%"}} onClick={handleClick} >
       <div className="invitation-box bg-[#0F2249] rounded-[24px] px-8 pt-8 pb-6 mb-3">
          <div className="flex">
            <div>
              <img src={HeartBucket} width={"54px"} alt="" />
            </div>
            <div className="ml-7">
              <span className="font-inter font-bold text-[16px] text-white">
                Purchase Lives
              </span>
              <br />
              <span className="font-inter font-bold text-[16px] text-white flex items-baseline gap-1 ">
                +10{" "}
                <img
                  className="relative top-[5px] left-[5px]"
                  src={heartIcon}
                  width={"20px"}
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
        </button>
      </div>
    </>
  );
}

export default EarnLivesInfo;
