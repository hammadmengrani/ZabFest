import React from 'react'

export interface CategoryProps {
   _id: number,
  image: string,
  category: string,
  count?:number
}

export interface CategoriesPropsArray {
    card : CategoryProps[]
    className?: string,
    childClassName?: string
}

const Categories = (props:CategoriesPropsArray) => {
  return (
    <div className={`${props.className} flex flex-col md:flex-row gap-10 items-center  overflow-x-auto justify-center w-full`}>
        {props.card.map((x, key) => (
            <div key={key} className={`flex flex-col items-center justify-center ${props.childClassName}`}>
                <div className='rounded-full bg-[#f3f4f6] w-32 h-32 flex items-center justify-center'>
                <img src={x.image} alt={x.title} className=" w-24 h-24 object-cover" />
                <h3>{x.title}</h3>
                </div>
                <h3 className="text-[16px] font-semibold text-black">{x.title}</h3>
                {x.count && <p className="text-[14px] text-gray-500">{x.count} items</p>}
            </div>
        ))}
    </div>
  )
}

export default Categories