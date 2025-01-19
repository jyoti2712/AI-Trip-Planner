import React from 'react'
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='flex flex-col items-center mx-8 sm:mx-16 md:mx-32 lg:mx-56 gap-9'>
      <h1 className='font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] text-center mt-16'>
        <span className='text-[#f56551]'>Discover your Next Adventure with AI:</span> Personalized Itineraries at your Fingertips
      </h1>
      <p className='text-lg sm:text-xl md:text-2xl text-gray-500 text-center'>
        Your Personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className="mt-6 px-6 py-3 text-lg sm:text-xl">Get Started, It's Free</Button>
      </Link>
    </div>
  )
}

export default LandingPage;
