import Header from '@/modules/Header'
import React from 'react'
import LangingPage from "../LangingPage"
import { useUser } from '@clerk/clerk-react'
function Home() {
  const {user}=useUser()
  console.log(user)
  return (
    <div>
        <Header/>
        <LangingPage client={user.fullName}/>
    </div>
  )
}

export default Home