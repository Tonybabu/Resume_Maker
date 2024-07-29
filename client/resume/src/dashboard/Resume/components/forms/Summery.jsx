import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle,Brain } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import {updateResumeDetail} from "../../../../../service/GlobalApi"
import { useUser } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'
import { chatSession } from '../../../../../service/Aimodel'


const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"
function Summery({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [summary,setSummary]=useState('')
    const [formData,setFormData]=useState({summary:''})
    const [loading,setLoading]=useState(false)
    const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();
    const {user}=useUser()
    const params=useParams()
    const { toast } = useToast()

    useEffect(()=>{
        enabledNext(false)
        summary && setResumeInfo({
            ...resumeInfo,summary:summary
        })

        setFormData((prevFormData) => ({
          ...prevFormData,
          summary: summary,
          userEmail: user?.primaryEmailAddress?.emailAddress
      }))
        
    },[summary])

    const generateSummery = async () => {
        try {
          setLoading(true);
          const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
      
          // Send the prompt to the chat model
            const result = await chatSession.sendMessage(PROMPT);
            let content = result.response.candidates[0]?.content?.parts[0]?.text;
            // Log the extracted content
            //console.log('Extracted Content:', content);
            // Check if the response and text properties exist
          if (content) {
            content = content.replace(/```json|```/g, '').trim();
            // Parse the cleaned content
            const parsedContent = JSON.parse(content);
            setAiGenerateSummeryList(parsedContent);
            //setSummary(content);
          }else {
            //console.log('The response does not contain text:', result);
            toast({title:"The response does not contain text"})
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast({title:"Something Went Wrong"})
          //console.log('Error generating summary:', error);
        }
      };
    const onSave=(e)=>{
        e.preventDefault()
        setLoading(true)
        setFormData({...formData,['userEmail']:user?.primaryEmailAddress?.emailAddress})
        setFormData({...formData,['summary']:summary})
        //console.log(formData)
        const data={
            formData
        }
  updateResumeDetail.update(params?.resumeId,data).then(res=>{
      //console.log(res)
      enabledNext(true)
      toast({variant: "success",title:"Details Saved"})
      setLoading(false)
  }).catch(err=>{
    //console.log(err)
    setLoading(false)
  })
    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summary Detail</h2>
            <p>Add summary for your job title</p>
            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add Summary</label>
                    <Button size="sm" disabled={loading} variant="outline" className="border border-violet-800 text-violet-800" onClick={generateSummery}>{loading?
                      <LoaderCircle className='animate-spin'/>:  
                      <>
                        <Brain className='h-4 w-4'/> Generate from AI 
                      </>}
                    </Button>
                </div>
                <Textarea rows={20}  className="mt-2 h-8" value={summary}  placeholder={summary?summary:resumeInfo?.summery} required onChange={(e)=>setSummary(e.target.value)} />
                <Button className="mt-3" disabled={loading} type="submit">{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
            </form>
        </div>
        {aiGeneratedSummeryList && (
  <div className='my-5'>
    <h2 className='font-bold text-lg'>Suggestions</h2>
    {aiGeneratedSummeryList.map((item, index) => (
      <div
        key={index}
        onClick={() => setSummary(item.summary)}
        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
        <h2 className='font-bold my-1 text-primary'>Level: {item.experience_level}</h2>
        <p>{item.summary}</p>
      </div>
    ))}
  </div>
)}

    </div>
  )
}

export default Summery