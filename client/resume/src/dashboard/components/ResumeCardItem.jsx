import { DeleteIcon, Trash } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({resumeInfo,resId,onDelete}) {
  //console.log(resId)
  return (
    <div className="relative group">
      <Link to={`/dashboard/resume/${resId}/edit`}>
        <div className='p-14 bg-gradient-to-b from-pink-100 border-t-purple-400 border-t-4 via-purple-200 to-blue-200 flex items-center justify-center h-[280px] border rounded-lg hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
          <img src="/cv.png" width={80} height={80} alt="resume" />
        </div>
        <h2 className='text-center my-1'>{resumeInfo}</h2>
      </Link>
      <button 
        onClick={(e) => {
          e.preventDefault();
          onDelete(resId, resumeInfo);
        }} 
        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hidden group-hover:flex group-hover:animate-slideInFromRight">
        <Trash/>
        
      </button>
    </div>
  )
}

export default ResumeCardItem