import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/clerk-react'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"
import {updateResumeDetail} from "../../../../../service/GlobalApi"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

function Education({enabledNext}) {
    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({educations:[]})
    const {user}=useUser();
    const params=useParams();
    const { toast } = useToast()
    const [educationalList,setEducationalList]=useState([
      {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
    useEffect(()=>{
        resumeInfo && setEducationalList(resumeInfo?.educations)
      },[])
      const handleChange=(event,index)=>{
        const newEntries=educationalList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setEducationalList(newEntries);
      }
    
      const AddNewEducation=()=>{
        setEducationalList([...educationalList,
          {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
          }
        ])
      }
      const RemoveEducation=()=>{
        setEducationalList(educationalList=>educationalList.slice(0,-1))
    
      }
      useEffect(()=>{
        setResumeInfo({
          ...resumeInfo,
          educations:educationalList
        })
        setFormData((prevFormData) => ({
            ...prevFormData,
            educations: educationalList,
            userEmail: user?.primaryEmailAddress?.emailAddress
        }))
      },[educationalList])


      const onSave=()=>{
        setLoading(true)
        setFormData({...formData,['userEmail']:user?.primaryEmailAddress?.emailAddress})
        setFormData({...formData,['educations']:educationalList})
        //const data = { ...formData,userEmail: user?.primaryEmailAddress?.emailAddress, experiences: experinceList }; 
        const data={formData}
        //console.log(data,params.resumeId)
        updateResumeDetail.update(params?.resumeId,data).then(res=>{
            console.log(res)
            enabledNext(true)
            toast({title:"Details Saved"})
            setLoading(false)
        }).catch(err=>{
          console.log(err)
          toast({title:"Something Went Wrong"})
          setLoading(false)
        })
        
    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add Your educational details</p>

    <div>
      {educationalList.map((item,index)=>(
        <div>
          <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>University or school Name</label>
              <Input name="universityName" 
              onChange={(e)=>handleChange(e,index)}
              placeholder={item?.universityName}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input name="degree" 
              onChange={(e)=>handleChange(e,index)}
              placeholder={item?.degree} />
            </div>
            <div>
              <label>Major</label>
              <Input name="major" 
              onChange={(e)=>handleChange(e,index)}
              placeholder={item?.major} />
            </div>
            <div>
              <label>Start Date</label>
              <Input type="date" name="startDate" 
              onChange={(e)=>handleChange(e,index)}
              placeholder={item?.startDate} />
            </div>
            <div>
              <label>End Date</label>
              <Input type="date" name="endDate" 
              onChange={(e)=>handleChange(e,index)}
              placeholder={item?.endDate} />
            </div>
            <div className='col-span-2'>
              <label>Description</label>
              <Textarea name="description" 
              onChange={(e)=>handleChange(e,index)}
              placeholder={item?.description} />
            </div>

          </div>
       
        </div>
      ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
            <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
    </div>
  )
}

export default Education