import { Brain,LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import {HtmlButton, BtnLink,BtnBulletList,BtnNumberedList,Separator,BtnStrikeThrough,BtnUnderline, BtnBold, BtnItalic, createButton, Editor, EditorProvider, Toolbar} from 'react-simple-wysiwyg';
import { chatSession } from '../../../../service/Aimodel'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useToast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button';

const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [value,setValue]=useState()
    const { toast } = useToast()
    const [loading,setLoading]=useState(false)

    const GenerateSummery=async()=>{
        if(!resumeInfo?.experiences[index]?.title){
            toast({title:"Job title is Missing"})
            return
        }
        setLoading(true)
        const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experiences[index].title)
        const result = await chatSession.sendMessage(prompt);
        let content = result.response.candidates[0]?.content?.parts[0]?.text;
        if (content) {
            content = content.replace(/```json|```/g, '').trim();
            // Parse the cleaned content
            onRichTextEditorChange({ target: { value: content } }, 'workSummery', index);
            setValue(content);
        }
        else {
            console.log('The response does not contain text:', result);
        }
        setLoading(false);
    }

  return (
    <div>
        <div className='flex justify-between my-2'>
            <label className='text-xs'>Summery</label>
            <Button onClick={GenerateSummery} variant="outline" size="sm" 
                disabled={loading}
                className="flex gap-2 border border-violet-600 text-violet-600">
                {loading?
                <LoaderCircle className='animate-spin'/>:  
                <>
                <Brain className='h-4 w-4'/> Generate from AI 
                </>}
            </Button>        
        </div>
        <EditorProvider>
            <Editor value={value} onChange={(e)=>{setValue(e.target.value)
                onRichTextEditorChange(e)
            }}>
            <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <HtmlButton />
                <Separator />
            </Toolbar>
            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor