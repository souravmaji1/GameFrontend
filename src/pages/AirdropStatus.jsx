import React from 'react'
import LeaderBoardInfo from '../components/LeaderBoardInfo'
import PlayersList from '../components/PlayersList'
import AirdropNav from '../components/AirdropNav'
import AirdropInfo from '../components/AirdropInfo'

function AirdropStatus() {
  return (
    <>
    <div className='bg-[#0B1426] pb-5 rounded-t-[30px] pt-4'>
    < AirdropNav/>
    <div className='mx-10 justify-center text-center'>
    <AirdropInfo/>
    </div>
    </div>
    </>
  )
}

export default AirdropStatus