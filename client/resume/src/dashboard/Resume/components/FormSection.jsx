import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, DownloadIcon } from 'lucide-react'
import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
//import html2canvas from 'html2canvas';
//import jsPDF from 'jspdf';
import Projects from './forms/Projects'

function FormSection() {
    const [activeFormIndex,setActiveFormIndex]=useState(1)
    const [enabledNext,setEnabledNext]=useState(false)

  return (
    <div>
        <div className='flex justify-end gap-2 items-center'>
            {activeFormIndex>1 && <Button size="sm" onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </Button>}
            <Button onClick={()=>setActiveFormIndex(activeFormIndex+1)} disabled={!enabledNext} className='flex gap-2' size="sm">Next <ArrowRight/> </Button>
        </div>
        {activeFormIndex==1?<PersonalDetail enabledNext={(v)=>setEnabledNext(v)}/>:
          activeFormIndex==2?<Summery enabledNext={(v)=>setEnabledNext(v)} />:
          activeFormIndex==3?<Experience enabledNext={(v)=>setEnabledNext(v)}/>:
          activeFormIndex==4?<Projects enabledNext={(v)=>setEnabledNext(v)}/>:
          activeFormIndex==5?<Education enabledNext={(v)=>setEnabledNext(v)} />:
          activeFormIndex==6?<Skills enabledNext={(v)=>setEnabledNext(v)} />:null
        }

        

    </div>
  )
}

export default FormSection