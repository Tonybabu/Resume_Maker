// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { useUser } from '@clerk/clerk-react'
// import { LoaderCircle } from 'lucide-react'
// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useToast } from "@/components/ui/use-toast"
// import {updateResumeDetail} from "../../../../../service/GlobalApi"
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import RichTextEditor from '../RichTextEditor'


// const formField={
//     title:'',
//     workSummery:'',

// }
// function Projects({enabledNext}) {
//     const [projectList,setProjectList]=useState([formField])
//     const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
//     const params=useParams();
//     const [loading,setLoading]=useState(false);
//     const { toast } = useToast()
//     const {user}=useUser()
//     const [formData, setFormData] = useState({projects:[]})
//     useEffect(()=>{
//         resumeInfo?.projects.length>0 && setProjectList(resumeInfo?.projects)
        
//     },[])
//     useEffect(()=>{
//         setResumeInfo({...resumeInfo,projects:projectList})
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             projects:projectList,
//             userEmail: user?.primaryEmailAddress?.emailAddress
//         }))
//     },[projectList])

//     const AddNewProject=()=>{
//         setProjectList([...projectList,formField])
//     }
//     const RemoveProject=()=>{
//         setExperienceList(experinceList=>experinceList.slice(0,-1))
//     }

//     const handleChange=(index,event)=>{
//         const newEntries=projectList.slice()
//         const {name,value}=event.target
//         newEntries[index][name]=value
//         setProjectList(newEntries)
//     }
//     const handleRichTextEditor=(e,name,index)=>{
//         const newEntries=projectList.slice()
//         newEntries[index][name]=e.target.value
//         setProjectList(newEntries)
//     }
//     const onSave=()=>{
//         setLoading(true)
//         setFormData({...formData,['userEmail']:user?.primaryEmailAddress?.emailAddress})
//         setFormData({...formData,['projects']:projectList})
//         const data={formData}
//         //console.log(data,params.resumeId)
//         updateResumeDetail.update(params?.resumeId,data).then(res=>{
//             console.log(res)
//             enabledNext(true)
//             toast({variant: "success",title:"Details Saved"})
//             setLoading(false)
//         }).catch(err=>{
//           console.log(err)
//           setLoading(false)
//         })
        
//     }

//   return (
//     <div>
//     <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//     <h2 className='font-bold text-lg'>Projects</h2>
//     <p>Add Your Projects</p>
//     <div>
//         {projectList.map((item,index)=>(
//             <div key={index}>
//                 <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
//                     <div>
//                         <label className='text-xs'>Title</label>
//                         <Input name="title" 
//                         onChange={(event)=>handleChange(index,event)}
//                         placeholder={item?.title}
//                         />
//                     </div>
//                     <div className='col-span-2'>
//                        {/* Project Summery  */}
//                        <RichTextEditor
//                        index={index}
//                        defaultValue={item?.workSummery}
//                        onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}  />
//                     </div>
//                 </div>
//             </div>
//         ))}
//     </div>
//     <div className='flex justify-between'>
//         <div className='flex gap-2'>
//         <Button variant="outline" onClick={AddNewProject} className="text-primary"> + Add More Projects</Button>
//         <Button variant="outline" onClick={RemoveProject} className="text-primary"> - Remove</Button>

//         </div>
//         <Button disabled={loading} onClick={()=>onSave()}>
//         {loading?<LoaderCircle className='animate-spin' />:'Save'}    
//         </Button>
//     </div>
//     </div>
// </div>
//   )
// }

// export default Projects


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/clerk-react'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"
import { updateResumeDetail } from "../../../../../service/GlobalApi"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import RichTextEditor from '../RichTextEditor'

const formField = {
  title: '',
  workSummery: '',
}

function Projects({ enabledNext }) {
  const [projectList, setProjectList] = useState([formField])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { user } = useUser()
  const [formData, setFormData] = useState({ projects: [] })

  useEffect(()=>{
        resumeInfo?.projects.length>0 && setProjectList(resumeInfo?.projects)
            
    },[])
  useEffect(() => {
    setResumeInfo(prev => ({ ...prev, projects: projectList }))
    setFormData(prevFormData => ({
      ...prevFormData,
      projects: projectList,
      userEmail: user?.primaryEmailAddress?.emailAddress
    }))
  }, [projectList, user])

  const AddNewProject = () => {
    setProjectList(prevList => [...prevList, formField])
  }

  const RemoveProject = () => {
    setProjectList(prevList => prevList.slice(0, -1))
  }

  const handleChange = (index, event) => {
    const { name, value } = event.target
    setProjectList(prevList => {
      const newEntries = [...prevList]
      newEntries[index][name] = value
      return newEntries
    })
  }

  const handleRichTextEditor = (e, name, index) => {
    setProjectList(prevList => {
      const newEntries = [...prevList]
      newEntries[index][name] = e.target.value
      return newEntries
    })
  }

  const onSave = async () => {
    setLoading(true)
    setFormData({...formData,['userEmail']:user?.primaryEmailAddress?.emailAddress})
    setFormData({...formData,['projects']:projectList})
    const data = {
      formData
    }

    try {
      await updateResumeDetail.update(params?.resumeId, data)
      enabledNext(true)
      toast({ variant: "success", title: "Details Saved" })
    } catch (err) {
      console.error(err)
      toast({ variant: "destructive", title: "Error Saving Details" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Projects</h2>
        <p>Add Your Projects</p>
        <div>
          {projectList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.title}
                    placeholder="Title"
                  />
                </div>
                <div className='col-span-2'>
                  {/* Project Summary */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewProject} className="text-primary"> + Add More Projects</Button>
            <Button variant="outline" onClick={RemoveProject} className="text-primary"> - Remove</Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Projects
