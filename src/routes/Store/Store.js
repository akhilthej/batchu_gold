import React from 'react'
import { Link } from 'react-router-dom'

import {GoldCoin} from '../../assets/data/Imagedata'

function Store() {
  return (
    <section className='my-20'>

    <div className='p-5'>
<h2 className="text-3xl font-bold text-center">Store</h2>
<h2 className="text-[12px]  text-center">Click on the coin and start saving !</h2>
</div>

<div className="flex w-full  bg-white">

 <div className="w-1/2  flex items-center justify-center">
 <Link to='/Store/GoldCoins'><img src={GoldCoin} alt="Gold" className="w-[50%] h-auto mx-auto m-2" />
 <p className="text-[10px] text-white bg-yellow-400  text-center">Gold Coins</p>
 </Link>
 </div>

 <div className="w-1/2  flex items-center bg-yellow-500 hover:bg-orange-600 transition duration-300  justify-center">
 <Link to='/Store/GoldCoins'> <div>Silver Coins</div></Link>
 </div>
</div>


    </section>
  )
}

export default Store