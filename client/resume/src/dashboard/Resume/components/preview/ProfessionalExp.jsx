import React from 'react'

function ProfessionalExp({resumeInfo}) {
  const isFutureDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate > currentDate;
  };
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'>Experience</h2>
        <hr className='border-[1.5px] my-2' />
        {resumeInfo?.experiences.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'>{experience?.title}</h2>
          <h2 className='text-xs flex justify-between'>
            {experience?.companyName}, {experience?.city}, {experience?.state} 
            <span>{experience?.startDate} - {experience?.currentlyWorking || isFutureDate(experience?.endDate) ? 'Present' : experience?.endDate}</span>
          </h2>
          {/* <p className='text-xs my-2'>{experience?.workSummery}</p> */}
          <div className="prose text-xs" dangerouslySetInnerHTML={{ __html: experience?.workSummery }}></div>
        </div>
      ))}
    </div>
  )
}

export default ProfessionalExp