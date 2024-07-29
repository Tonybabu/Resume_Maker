import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import {updateResumeDetail} from "../../../../../service/GlobalApi"
import { useUser } from '@clerk/clerk-react'
import { LoaderCircle } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
function PersonalDetail({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [formData,setFormData]=useState()
    const [loading,setLoading]=useState(false)
    const params=useParams()
    const {user}=useUser()
    const { toast } = useToast()
    useEffect(()=>{
    },[])
    function handleInputChange(e){
      enabledNext(false)
      const {name,value}=e.target;
      setResumeInfo({...resumeInfo,[name]:value})
      setFormData({...formData,[name]:value})
}
function onSave(e){
  e.preventDefault()
  setLoading(true)
  setFormData({...formData,['userEmail']:user?.primaryEmailAddress?.emailAddress})
  //console.log(formData)
  const data={
    formData
  }
  updateResumeDetail.update(params?.resumeId,data).then(res=>{
      console.log(res)
      enabledNext(true)
      toast({variant: "success",title:"Details Saved"})
      setLoading(false)
  }).catch(err=>{
    console.log(err)
    toast({title:"Something Went Wrong"})
    setLoading(false)
  })
}
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>
        <form onSubmit={onSave}>
          <div className='grid grid-col-2 mt-5 gap-3'>
            <div>
              <label className='text-sm'>First Name</label>
              <Input name="firstName" placeholder={resumeInfo?.firstName} required onChange={handleInputChange}/>
            </div>
            <div>
              <label className='text-sm'>Last Name</label>
              <Input name="lastName" placeholder={resumeInfo?.lastName} required onChange={handleInputChange}/>
            </div>
            <div className='col-span-2'>
              <label className='text-sm'>Job Title</label>
              <Input name="jobTitle" placeholder={resumeInfo?.jobTitle} required onChange={handleInputChange}/>
            </div>
            <div className='col-span-2'>
              <label className='text-sm'>Address</label>
              <Input name="address" placeholder={resumeInfo?.address} required onChange={handleInputChange}/>
            </div>
            <div>
              <label className='text-sm'>Phone Number</label>
              <Input name="phone" placeholder={resumeInfo?.phone} required onChange={handleInputChange}/>
            </div>
            <div>
              <label className='text-sm'>Email</label>
              <Input name="email" placeholder={resumeInfo?.email} required onChange={handleInputChange}/>
            </div>
            <div>
              <label className='text-sm'>Linkedin profile</label>
              <Input name="linkedin" placeholder={resumeInfo?.linkedin} required onChange={handleInputChange}/>
            </div>
            <div>
              <label className='text-sm'>GitHub profile</label>
              <Input name="github" placeholder={resumeInfo?.github}  onChange={handleInputChange}/>
            </div>
            <div>
              <label className='text-sm'>Any platform where you practice</label>
              <Input name="gfg" placeholder={resumeInfo?.gfg}  onChange={handleInputChange}/>
            </div>
            <div className='mt-10 flex justify-end'>
              <Button disabled={loading} type="submit">{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
            </div>
          </div>
        </form>
    </div>
  )
}

export default PersonalDetail