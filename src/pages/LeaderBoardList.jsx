import React from 'react'
import LeaderBoardNav from '../components/LeaderBoardNav'
import LeaderBoardInfo from '../components/LeaderBoardInfo'
import PlayersList from '../components/PlayersList'

function LeaderBoardList() {
  return (
    <>
    <div className='bg-[#0B1426] pb-5 rounded-t-[30px] pt-4'>
    < LeaderBoardNav/>
    <div className='mx-10'>
    <LeaderBoardInfo/>
  
    </div>
    </div>
    </>
  )
}

export default LeaderBoardList