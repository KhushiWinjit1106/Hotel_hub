import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'

const TCatering = () => {
    return (
        <div>
            <div className='flex justify-center items-center bg-[url("src/assets/1.jpg")] bg-cover'>
                <div className='md:min-h-[100vh]   min-h-[86vh] w-5/6  '>
                    <div className="flex justify-center">
                        <div className="flex font-bold text-white md:text-5xl text-2xl leading-8  h-6 md:mt-20 mt-24 md:mb-12 mb-6">Choose your meal</div>
                    </div>
                    <div className="h-96 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
                        {/* 1st */}
                        <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-lg">
                            <div className="h-96 bg-teal-600 ">
                                <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="src/assets/Breakfast.jpg" alt="" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent group-hover:from-black/30 group-hover:via-black/30 group-hover:to-black/30"></div>
                            <Link to='/hotels' className="absolute inset-0 flex md:translate-y-[38%] translate-y-[34%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                <h1 className="font-dmserif md:text-6xl text-4xl font-bold text-black textStroke ">Breakfast</h1>
                                {/* <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p> */}
                                {/* <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button> */}
                            </Link>
                        </div>
                        {/* 2nd */}
                        <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-lg">
                            <div className="h-96  ">
                                <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 " src="src/assets/Lunch.jpg" alt="" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent group-hover:from-black/30 group-hover:via-black/30 group-hover:to-black/30"></div>
                            <Link to='/hotels' className="absolute inset-0 flex md:translate-y-[38%] translate-y-[34%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                <h1 className="font-dmserif md:text-6xl text-4xl font-bold text-black textStroke">Lunch</h1>
                                {/* <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p> */}
                                {/* <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button> */}
                            </Link>
                        </div>
                        {/* 3rd */}
                        <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-lg">
                            <div className="h-96  ">
                                <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 " src="src/assets/Dinner.jpg" alt="" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent group-hover:from-black/30 group-hover:via-black/30 group-hover:to-black/30"></div>
                            <Link to='/hotels' className="absolute inset-0 flex md:translate-y-[38%] translate-y-[34%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                <h1 className="font-dmserif md:text-6xl text-4xl font-bold text-black stroke-white stroke-1 textStroke">Dinner</h1>
                                {/* <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p> */}
                                {/* <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button> */}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TCatering
