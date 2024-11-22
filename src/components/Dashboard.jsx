import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FormCard from './commonComponents/FormCard'
import { BASE_URL } from '../../config.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { BLoader } from './commonComponents/BigLoader.jsx'
import {Toaster} from '@/components/ui/toaster'
import {useToast} from '@/hooks/use-toast'



const Dashboard = () => {
  const navigate=useNavigate()
  const {authToken}=useAuth()
  const [forms,setForms]=useState([])
  const[noForms,setNoForms]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const {toast}=useToast()

useEffect(()=>{
  const fetchForms=async()=>{
    try {
      setIsLoading(true)
      const response=await fetch(`${BASE_URL}/form`,{
        method:"GET",
        headers:{
          Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
        }
      })

      if(!response.ok){
        throw new Error("Error while fetching forms")
      }

      const result=await response.json()
      if(result.content.length===0){
        setNoForms(true)
      }
      else{
        setNoForms(false)
      }
      setForms(result.content)
    } catch (error) {
        console.log("error :",error)
    }
    finally{
      setIsLoading(false)
    }
  }
  fetchForms()
},[])
  const handleCreateForm=()=>{
    navigate('/form')
  }
  return (
    <>
    <div className='p-6 md:p-9'>
      <div className='flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6'>
        <h1 className='text-2xl font-bold'>My Forms</h1>
        <div className='flex-grow flex flex-col md:flex-row items-stretch space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto'>
          <div className='flex flex-grow'>
            <div className='relative flex-grow'>
              <Input 
                type="text" 
                placeholder="Search forms" 
                className='pr-10 w-full'
              />
              <Button 
                variant="ghost" 
                size="icon"
                className='absolute right-0 top-0 h-full'
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
          <Button className='w-full md:w-auto' onClick={()=>handleCreateForm()}>
            + Create New Form
          </Button>
        </div>
      </div>
      {isLoading ? <BLoader/> : 
      noForms ? (<div className="flex flex-col items-center justify-center space-y-4 border border-gray-200 rounded-lg p-6 bg-gray-50 text-center">
            <p className="text-gray-500 text-lg">No forms created yet.</p>
            <Button className='w-full md:w-auto' onClick={()=>handleCreateForm()}>
            + Create New Form
          </Button>
          </div>):(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <FormCard key={form._id} form={form} />
        ))}
      </div>
      )}
      
    </div>
    <Toaster/>
    </>
  )
}

export default Dashboard
