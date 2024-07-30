import React from 'react'

function ProjectPreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'>Project</h2>
        <hr className='border-[1.5px] my-2' />
        {resumeInfo?.projects.map((project, index) => (
        <div key={index} className='my-5'>
          <h3 className='text-sm font-bold'>{project?.title}</h3>
          {/* <p className='text-xs my-2'>{experience?.workSummery}</p> */}
          <div className="prose text-xs" dangerouslySetInnerHTML={{ __html: project?.workSummery }}></div>
        </div>
      ))}
    </div>
  )
}

export default ProjectPreview