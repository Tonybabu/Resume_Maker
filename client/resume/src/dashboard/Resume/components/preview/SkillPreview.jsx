import React from 'react'

function SkillPreview({resumeInfo}) {
  return (
    <div>
        <h2 className='text-center font-bold text-sm mb-2'>Skills</h2>
        <hr className='border-[1.5px] my-2' />
        <div className='grid grid-cols-4 gap-2 my-4'>
        {resumeInfo?.skills.map((sk, index) => (
          <div key={index}>
            <h2 className='text-xs'>{sk.name}</h2>
          </div>
        ))}
        </div>
    </div>
  )
}

export default SkillPreview