import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FormCard from './commonComponents/FormCard'

const mockForms = [
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  {
    id: 1,
    title: "Untitled Form",
    description: "Add Description",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    questionCount: 4,
    submissionCount: 0,
  },
  // Add more mock data as needed
]


const Dashboard = () => {
  const navigate=useNavigate()
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockForms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Dashboard
