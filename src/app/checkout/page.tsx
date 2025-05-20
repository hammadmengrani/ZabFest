'use client'
import CartDetail from '@/components/common/CartDetail'
import CartTotal from '@/components/common/CartTotal'
import Checkout from '@/components/common/Checkout'
import SectionContainer from '@/components/container/SectionContainer'
import { useCart } from '@/context/CartContext'
import React from 'react'

const page = () => {
      const { cartItems } = useCart();
      const totalPrice = cartItems.reduce(
        (total, item) => total + (item.price - (item.discount ?? 0)) * item.quantity,
        0
      );

      const shipping = cartItems.length > 0 ? 300 : 0;
  return (
    <div className='flex md:flex-row flex-col items-start justify-center py-5 gap-10'>
        <Checkout/>
        <CartDetail checkout={true}/>

    </div>
  )
}

export default page