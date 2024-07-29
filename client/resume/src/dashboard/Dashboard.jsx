import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import {getUserResume,deleteResumeDetail} from '../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'
function Dashboard() {
  const {user}=useUser()
  const [resumeList,setResumeList]=useState([])
   useEffect(()=>{
      user && GetResumesList()
   },[user])

  const GetResumesList=()=>{
      getUserResume.getResume(user?.primaryEmailAddress?.emailAddress).then(res=>{
        //console.log(res.data[0])
        setResumeList(res.data);
        //console.log(resumeList[0])
      })
  }
  const handleDelete = async (resId, title) => {
    try {
      const data={resumeId:resId,title:title,userEmail:user?.primaryEmailAddress?.emailAddress}
      await deleteResumeDetail.deleteResume(data)

      setResumeList(prevList => 
        prevList.map(resume => ({
          ...resume,
          titles: resume.titles.filter(t => t !== title),
          resumeIds: resume.resumeIds.filter(id => id !== resId)
        })).filter(resume => resume.titles.length > 0)
      );
    } catch (error) {
      console.log(error)
    }
    
  };
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start creating resume to your next job role.</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume/>
        {resumeList.length > 0 ? (
        resumeList.map((resume, index) => (
          resume.titles.map((title, titleIndex) => (
            <ResumeCardItem resumeInfo={title} key={titleIndex} resId={resume.resumeIds[titleIndex]} onDelete={handleDelete} />
          ))
        ))
      ) : (
        <div>No resumes found.</div>
      )}
      </div>
    </div>
  )
}

export default Dashboard