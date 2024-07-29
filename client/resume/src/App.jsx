
import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import { useUser } from '@clerk/clerk-react'
import Header from './modules/Header'
import { Toaster } from "@/components/ui/toaster"

function App() {
  const {user,isLoaded,isSignedIn}=useUser()

  if(!isSignedIn && isLoaded){
    return <Navigate to={'/auth/sign-in'}/>
  }

  return (
    <>
    <Header/>
    <Outlet/>
    <Toaster />

    </>
  )
}

export default App
