import React from 'react'
import LeaderBoardNav from '../components/LeaderBoardNav'
import LeaderBoardInfo from '../components/LeaderBoardInfo'
import PlayersList from '../components/PlayersList'
import RewardImg from '../assets/images/RewardImg.svg'

function StreakList() {

  const fetchStreakUserData = async () => {
    const { data: userData, error } = await supabase
      .from("userdata")
      .select("*")
      .order("consecutiveCorrectGuesses", { ascending: false });
  
    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      setStreakUserData(userData);
    }
  };





  return (
    <>
    <div className='bg-[#0B1426] pb-5 rounded-t-[30px] pt-4'>
    < LeaderBoardNav/>
    <div className='mx-10'>
    <LeaderBoardInfo/>
    <img className='mt-3' src={RewardImg} width={'100%'} alt="" />
    <PlayersList/>
    </div>
    </div>
    </>
  )
}

export default StreakList