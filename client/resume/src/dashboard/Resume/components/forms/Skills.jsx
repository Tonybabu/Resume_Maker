
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import {updateResumeDetail} from "../../../../../service/GlobalApi"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function Skills() {

    const [skillsList,setSkillsList]=useState([{
        name:'',
    }])
    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

    const {user}=useUser();
    const params=useParams();
    const { toast } = useToast()
    const [formData, setFormData] = useState({skills:[]})

   
    useEffect(()=>{
        resumeInfo && setSkillsList(resumeInfo?.skills)
      },[])
   
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
        }])
    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave=()=>{
        setLoading(true)
        setFormData({...formData,['userEmail']:user?.primaryEmailAddress?.emailAddress})
        setFormData({...formData,['skills']:skillsList})
        const data={formData}
        //console.log(data,params.resumeId)
        updateResumeDetail.update(params?.resumeId,data).then(res=>{
            console.log(res)
            toast({title:"Details Saved"})
            setLoading(false)
        }).catch(err=>{
          console.log(err)
          toast({title:"Something Went Wrong"})
          setLoading(false)
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
        setFormData((prevFormData) => ({
            ...prevFormData,
            skills: skillsList,
            userEmail: user?.primaryEmailAddress?.emailAddress
        }))
    },[skillsList])
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Skills</h2>
    <p>Add Your top professional key skills</p>

    <div>
        {skillsList.map((item,index)=>(
            <div className='flex justify-between mb-2 border rounded-lg p-3 '>
                <div>
                    <label className='text-xs'>Name</label>
                    <Input className="w-full"
                    placeholder={item.name}
                    onChange={(e)=>handleChange(index,'name',e.target.value)} />
                </div>
            </div>
        ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
            <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={onSave}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Skills
