import React from 'react'

function PersonalData({resumeInfo}) {
  return (
    <div>
        <h2 className='font-bold text-xl text-center'>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        <h2 className='text-center text-sm font-medium'>{resumeInfo?.jobTitle}</h2>
        <h2 className='text-center font-normal text-xs'>{resumeInfo?.address}</h2>
        <div className='flex justify-start gap-2 flex-wrap'>
            <h2 className='font-normal text-xs'>{resumeInfo?.phone}</h2>
            <h2 className='font-normal text-xs'>{resumeInfo?.linkedin}</h2>
            <h2 className='font-normal text-xs'>{resumeInfo?.github}</h2>
            <h2 className='font-normal text-xs'>{resumeInfo?.gfg}</h2>
            <h2 className='font-normal text-xs'>{resumeInfo?.email}</h2>
        </div>
        <hr className='border-[1.5px] my-2' />
    </div>
  )
}

export default PersonalData