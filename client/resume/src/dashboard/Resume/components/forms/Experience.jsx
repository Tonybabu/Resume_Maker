import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"
import { LoaderCircle } from 'lucide-react'
import RichTextEditor from '../RichTextEditor'
import { useUser } from '@clerk/clerk-react'
import { updateResumeDetail } from '../../../../../service/GlobalApi'

const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:'',

}
function Experience({enabledNext}) {
    const [experinceList,setExperienceList]=useState([formField])
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const [loading,setLoading]=useState(false);
    const { toast } = useToast()
    const {user}=useUser()
    const [formData, setFormData] = useState({experiences:[]})

    useEffect(()=>{
        resumeInfo?.experiences.length>0 && setExperienceList(resumeInfo?.experiences)
        
    },[])
    useEffect(()=>{
        setResumeInfo({...resumeInfo,experiences:experinceList})
        setFormData((prevFormData) => ({
            ...prevFormData,
            experiences:experinceList,
            userEmail: user?.primaryEmailAddress?.emailAddress
        }))
    },[experinceList])
    const AddNewExperience=()=>{
        setExperienceList([...experinceList,formField])
    }
    const RemoveExperience=()=>{
        setExperienceList(experinceList=>experinceList.slice(0,-1))
    }

    const handleChange=(index,event)=>{
        const newEntries=experinceList.slice()
        const {name,value}=event.target
        newEntries[index][name]=value
        setExperienceList(newEntries)
    }
    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experinceList.slice()
        newEntries[index][name]=e.target.value
        setExperienceList(newEntries)
    }

    const onSave=()=>{
        setLoading(true)
        setFormData({...formData,['userEmail']:user?.primaryEmailAddress?.emailAddress})
        setFormData({...formData,['experiences']:experinceList})
        const data={formData}
        //console.log(data,params.resumeId)
        updateResumeDetail.update(params?.resumeId,data).then(res=>{
            console.log(res)
            enabledNext(true)
            toast({variant: "success",title:"Details Saved"})
            setLoading(false)
        }).catch(err=>{
          console.log(err)
          setLoading(false)
        })
        
    }
    
  return (
    <div>
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Professional Experience</h2>
    <p>Add Your previous Job experience</p>
    <div>
        {experinceList.map((item,index)=>(
            <div key={index}>
                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                    <div>
                        <label className='text-xs'>Position Title</label>
                        <Input name="title" 
                        onChange={(event)=>handleChange(index,event)}
                        placeholder={item?.title}
                        />
                    </div>
                    <div>
                        <label className='text-xs'>Company Name</label>
                        <Input name="companyName" 
                        onChange={(event)=>handleChange(index,event)}
                        placeholder={item?.companyName} />
                    </div>
                    <div>
                        <label className='text-xs'>City</label>
                        <Input name="city" 
                        onChange={(event)=>handleChange(index,event)} 
                        placeholder={item?.city}/>
                    </div>
                    <div>
                        <label className='text-xs'>State</label>
                        <Input name="state" 
                        onChange={(event)=>handleChange(index,event)}
                        placeholder={item?.state}
                         />
                    </div>
                    <div>
                        <label className='text-xs'>Start Date</label>
                        <Input type="date"  
                        name="startDate" 
                        onChange={(event)=>handleChange(index,event)} 
                        placeholder={item?.startDate}/>
                    </div>
                    <div>
                        <label className='text-xs'>End Date</label>
                        <Input type="date" name="endDate" 
                        onChange={(event)=>handleChange(index,event)} 
                        placeholder={item?.endDate}
                        />
                    </div>
                    <div className='col-span-2'>
                       {/* Work Summery  */}
                       <RichTextEditor
                       index={index}
                       defaultValue={item?.workSummery}
                       onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}  />
                    </div>
                </div>
            </div>
        ))}
    </div>
    <div className='flex justify-between'>
        <div className='flex gap-2'>
        <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
        <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

        </div>
        <Button disabled={loading} onClick={()=>onSave()}>
        {loading?<LoaderCircle className='animate-spin' />:'Save'}    
        </Button>
    </div>
    </div>
</div>
  )
}

export default Experience


// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import React, { useContext, useEffect, useState } from 'react'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import { useParams } from 'react-router-dom'
// import { useToast } from "@/components/ui/use-toast"
// import { LoaderCircle } from 'lucide-react'
// import RichTextEditor from '../RichTextEditor'
// import { useUser } from '@clerk/clerk-react'
// import { updateResumeDetail } from '../../../../../service/GlobalApi'

// const formField = {
//   title: '',
//   companyName: '',
//   city: '',
//   state: '',
//   startDate: '',
//   endDate: '',
//   workSummery: '',
// }

// function Experience({ enabledNext }) {
//   const [experienceList, setExperienceList] = useState([formField])
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
//   const params = useParams()
//   const [loading, setLoading] = useState(false)
//   const { toast } = useToast()
//   const { user } = useUser()
//   const [formData, setFormData] = useState({ experiences: [] })

//   // Load experience list from resumeInfo only on component mount or when resumeInfo changes
//   useEffect(() => {
//     if (resumeInfo?.experience) {
//       setExperienceList(resumeInfo.experience)
//     }
//   }, [resumeInfo?.experience])

//   // Update resumeInfo and formData only if experienceList actually changes
//   useEffect(() => {
//     if (resumeInfo?.experience !== experienceList) {
//       setResumeInfo(prev => ({ ...prev, experience: experienceList }))
//     }
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       experiences: experienceList,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//     }))
//   }, [experienceList, resumeInfo?.experience, user?.primaryEmailAddress?.emailAddress])

//   const AddNewExperience = () => {
//     setExperienceList(prevList => [...prevList, { ...formField }])
//   }

//   const RemoveExperience = () => {
//     setExperienceList(prevList => prevList.slice(0, -1))
//   }

//   const handleChange = (index, event) => {
//     const { name, value } = event.target
//     setExperienceList(prevList => {
//       const newEntries = [...prevList]
//       newEntries[index][name] = value
//       return newEntries
//     })
//   }

//   const handleRichTextEditor = (e, name, index) => {
//     setExperienceList(prevList => {
//       const newEntries = [...prevList]
//       newEntries[index][name] = e.target.value
//       return newEntries
//     })
//   }

//   const onSave = async () => {
//     setLoading(true)
//     try {
//       const data = {
//         ...formData,
//         experiences: experienceList,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//       }
//       await updateResumeDetail.update(params?.resumeId, data)
//       enabledNext(true)
//       toast({ variant: "success", title: "Details Saved" })
//     } catch (err) {
//       toast({ variant: "destructive", title: "Error Saving Details" })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div>
//       <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//         <h2 className='font-bold text-lg'>Professional Experience</h2>
//         <p>Add Your previous Job experience</p>
//         <div>
//           {experienceList.map((item, index) => (
//             <div key={index} className='my-5'>
//               <div className='grid grid-cols-2 gap-3 border p-3 rounded-lg'>
//                 <div>
//                   <label className='text-xs'>Position Title</label>
//                   <Input
//                     name="title"
//                     onChange={(event) => handleChange(index, event)}
//                     value={item.title}
//                     placeholder="Position Title"
//                   />
//                 </div>
//                 <div>
//                   <label className='text-xs'>Company Name</label>
//                   <Input
//                     name="companyName"
//                     onChange={(event) => handleChange(index, event)}
//                     value={item.companyName}
//                     placeholder="Company Name"
//                   />
//                 </div>
//                 <div>
//                   <label className='text-xs'>City</label>
//                   <Input
//                     name="city"
//                     onChange={(event) => handleChange(index, event)}
//                     value={item.city}
//                     placeholder="City"
//                   />
//                 </div>
//                 <div>
//                   <label className='text-xs'>State</label>
//                   <Input
//                     name="state"
//                     onChange={(event) => handleChange(index, event)}
//                     value={item.state}
//                     placeholder="State"
//                   />
//                 </div>
//                 <div>
//                   <label className='text-xs'>Start Date</label>
//                   <Input
//                     type="date"
//                     name="startDate"
//                     onChange={(event) => handleChange(index, event)}
//                     value={item.startDate}
//                     placeholder="Start Date"
//                   />
//                 </div>
//                 <div>
//                   <label className='text-xs'>End Date</label>
//                   <Input
//                     type="date"
//                     name="endDate"
//                     onChange={(event) => handleChange(index, event)}
//                     value={item.endDate}
//                     placeholder="End Date"
//                   />
//                 </div>
//                 <div className='col-span-2'>
//                   {/* Work Summary */}
//                   <RichTextEditor
//                     index={index}
//                     defaultValue={item.workSummery}
//                     onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummery', index)}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className='flex justify-between'>
//           <div className='flex gap-2'>
//             <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
//             <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>
//           </div>
//           <Button disabled={loading} onClick={onSave}>
//             {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Experience
