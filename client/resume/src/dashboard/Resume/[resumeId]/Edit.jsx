import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../components/FormSection'
import ResumePreview from '../components/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import userData from "../../../data/dummy"
import dummy from '../../../data/dummy'
import { getResumeDetail } from '../../../../service/GlobalApi'



function Edit() {
    const params=useParams()
    const [resumeInfo,setResumeInfo]=useState(userData)
    useEffect(()=>{
      setResumeInfo(dummy)
      console.log(params)
    },[])

    useEffect(() => {
      const fetchResume = async () => {
        try {
          const response = await getResumeDetail.getResumeInformation(params?.resumeId);
          //console.log(response)
          setResumeInfo(response.data);
        }catch (err) {
          console.log(err)
        }
      };

      fetchResume();
  }, [params?.resumeId]);
  
  return (
    <>
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
       <FormSection/>
       <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
    </>
  )
}

export default Edit