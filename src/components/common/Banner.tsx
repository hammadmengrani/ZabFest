'use client';
import React, { useState } from 'react';

export interface MyImage {
    images: string[];
}

const Banner = (props: MyImage) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? props.images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === props.images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div id="default-carousel" className="relative container mx-auto md:w-[1400px]" data-carousel="slide">
            <div className="relative h-[9rem] overflow-hidden md:h-96">
                {props.images.map((image, index) => (
                    <div key={index} className={`absolute inset-0 ${index === currentIndex ? 'block' : 'hidden'}`} data-carousel-item>
                        <img
                            src={image}
                            className="w-full object-cover md:h-[438px]"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {props.images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                        aria-current={index === currentIndex ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
            
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={handlePrev}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-blue-500 group-focus:ring-4 group-focus:ring-blue-500 group-focus:outline-none">
                    <svg className="w-4 h-4 text-black group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={handleNext}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-blue-500 group-focus:ring-4 group-focus:ring-blue-500 group-focus:outline-none">
                    <svg className="w-4 h-4 text-black group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default Banner;
