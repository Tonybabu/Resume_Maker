import { SignIn, SignedIn } from '@clerk/clerk-react'
import React from 'react'

function Signin() {
  return (
    <div className='flex justify-center my-10 items-center'>
        <SignIn/>
    </div>
  )
}

export default Signin