import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const {user,isLoaded,isSignedIn}=useUser()
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
        <img src="/logo.svg" alt="logo" width={100} height={100} />
        {
            isSignedIn? 
            <div className='flex gap-2 items-center'> 
                <Link to={'/dashboard'}><Button variant="outline">DashBoard</Button></Link>
                <Link to={'/'}><Button variant="outline">Home</Button></Link>
                <UserButton/>
            </div>:
        <Link to={'/auth/sign-in'}>
            <Button>Get Started</Button>
        </Link>}
    </div>
  )
}

export default Header