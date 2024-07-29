import React from 'react'
import { Link } from 'react-router-dom'
function LangingPage({client}) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
    <header className=" w-full text-white py-8 bg-gray-400 shadow-md flex flex-col items-center">
   <div className='flex justify-evenly'>
   <div className=' p-12'>
    <h1 className="text-3xl text-violet-500 font-bold mb-4">ResumeMaker</h1>
    <p className="text-lg">{`Hey ${client} are you ready to create a Professional Resume in Minutes`}</p>
    <Link to={'/dashboard'}><button className="mt-6 px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Get Started</button></Link>

   </div>
      <div>
        <img src="/resume.png" alt="resume" />
      </div>
   </div>
    </header>
    
    <main className="flex flex-wrap justify-center mt-8 w-full max-w-4xl">
      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Easy to Use</h2>
          <p className="text-gray-700">Our user-friendly interface helps you create your professional resume quickly and effortlessly.</p>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Professional Templates</h2>
          <p className="text-gray-700">Choose from various templates designed by experts to make your resume stand out.</p>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Customizable</h2>
          <p className="text-gray-700">Tailor your resume to your needs using our interactive design tools.</p>
        </div>
      </div>
    </main>
    
    <footer className="w-full py-6 bg-gray-200 mt-auto text-center">
      <p className="text-gray-600">Builder Demo</p>
      <p className="text-gray-600">123 Builder Lane, San Francisco, CA, USA</p>
      <p className="text-gray-600">© 2023 Builder. All rights reserved.</p>
    </footer>
  </div>
  )
}

export default LangingPage