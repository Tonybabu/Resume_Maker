import React from 'react'

function Educational({resumeInfo}) {
  return (
    <div>
        <h2 className='text-center font-bold text-sm mb-2'>Education</h2>
        <hr className='border-[1.5px] my-2' />

        {resumeInfo?.educations.map((ed, index) => (
          <div key={index} className='my-5'>
            <h2 className='text-sm font-bold'>{ed?.universityName}</h2>
            <h2 className='text-xs flex justify-between'>
              {ed?.degree} in {ed?.major}
              <span>{ed?.startDate} - {ed?.endDate}</span>
            </h2>
            <p>{ed?.description}</p>
          </div>
        ))}
    </div>
  )
}

export default Educational