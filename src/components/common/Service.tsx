import React from 'react'

const Service = () => {
  return (
    <div className='flex flex-col md:flex-row gap-5  items-center mx-auto p-5 justify-center'>
        <div className='flex gap-2 items-center justify-center'>
            <img src="group 17.png" alt="" className='w-10 h-10' />
            <div className='flex flex-col  md:w-[89%]'>
            <h3 className='text-[18px]'>Free Shipping</h3>
            <p className='text-[14px]'>Recieve your product Within 2-3 Working days. Free Cash on Delivery all over Pakistan.</p>
            </div>
        </div>
        <div className='flex gap-2 items-center justify-center'>
            <img src="package-return.png" alt="" className='w-10 h-10' />
            <div className='flex flex-col md:w-[89%]'>
            <h3 className='text-[18px]'>Return or Refunded</h3>
            <p className='text-[14px] '>You can return your product within 7 days of receiving it. To request a refund.</p>
            </div>
        </div>
        <div className='flex gap-2 items-center justify-center'>
            <img src="group.png" alt="" className='w-10 h-10' />
            <div className='flex flex-col  md:w-[89%]'>
            <h3 className='text-[18px]'>Customer Support</h3>
            <p className='text-[14px] '>24/7 Customer support that is respectful and helpful "Your Satisfication is our top priority</p>
            </div>
        </div>
    </div>
  )
}

export default Service