import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext ,useRef} from 'react'
import PersonalData from './preview/PersonalData'
import Summary from './preview/Summary'
import ProfessionalExp from './preview/ProfessionalExp'
import Educational from './preview/Educational'
import SkillPreview from './preview/SkillPreview'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { DownloadIcon } from 'lucide-react'

function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const resumeRef = useRef()

    const handleDownload = async () => {
        const element = resumeRef.current
        const canvas = await html2canvas(element)
        const data = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [canvas.width, canvas.height]
        })
        pdf.addImage(data, 'PNG', 0, 0, canvas.width, canvas.height)
        pdf.save('resume.pdf')
    }
  return (
    <>
      <div className='flex flex-col items-center'>
        <span className=' h-10 mb-4 flex items-center'>
          <Button onClick={handleDownload} className='flex items-center'>
            <DownloadIcon className='mr-2' />
            Download as PDF
          </Button>
        </span>

        <div className='shadow-lg h-full p-4 md:p-14 border-t-[20px] w-full max-w-4xl' ref={resumeRef}>
          <PersonalData resumeInfo={resumeInfo} />
          <Summary resumeInfo={resumeInfo} />
          <ProfessionalExp resumeInfo={resumeInfo} />
          <Educational resumeInfo={resumeInfo} />
          <SkillPreview resumeInfo={resumeInfo} />
        </div>
      </div>
    </>
  )
}

export default ResumePreview