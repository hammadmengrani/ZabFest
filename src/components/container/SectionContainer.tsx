import Link from 'next/link'
import React from 'react'

interface SectionContainerProps{
    title?: string
    link?: string
    linkTitle?: string
    desc?:string,
    children?: any
    className?: string
    titleClassName?: string
    childClassName?: string
}

const SectionContainer = (props:SectionContainerProps) => {
  return (
<section className={`text-gray-600 body-font`}>
    <div className={`flex flex-col w-full px-12 ${props.className}  justify-center`}>
        <h3 className='text-[24px] font-semibold text-black'>{props.title}</h3>
        <p className='md:text-[16px] text-[#878787] text-[14px] text-center'>{props.desc}</p>
    </div>
  <div className=" flex flex-row items-center w-full justify-center">
    <div className={`${props.childClassName}`}>
        {props.children}
    </div>
</div>
</section>
  )
}

export default SectionContainer