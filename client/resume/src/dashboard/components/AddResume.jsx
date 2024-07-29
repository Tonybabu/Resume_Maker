import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"

import {v4 as uuidv4} from 'uuid'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import {userResume} from '../../../service/GlobalApi'
import { useNavigate } from 'react-router-dom'
  
function AddResume() {
    const [openDialog,setOpenDialog]=useState(false)
    const [resumeTitle,setResumeTitle]=useState(null)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const {user}=useUser()
    const onCreate=()=>{
        setLoading(true)
        const uuid=uuidv4()
        const data={
            data:{
                title:resumeTitle,
                resumeId:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName
            }
        }
        userResume.CreateNewResume(data)
        .then((response) => {
          console.log('Resume created successfully:', response.data);
          navigate(`/dashboard/resume/${uuid}/edit`)
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error creating resume:', error);
          setLoading(false);
        });
    }      
  return (
    <div>
        <div onClick={()=>setOpenDialog(true)} className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'>
            <PlusSquare/>
        </div>
        <Dialog open={openDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
          <DialogDescription>
            <div>Add a title for your new resume</div>
            <Input className='my-2' placeholder="Ex. Full Stack Resume" onChange={(e) => setResumeTitle(e.target.value)} />
          </DialogDescription>
          <div className='flex justify-end gap-5'>
            <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button disabled={!resumeTitle || loading} onClick={() => onCreate()}>
              {loading ? <Loader2 className='animate-spin' /> : 'Create'}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    </div>
  )
}

export default AddResume