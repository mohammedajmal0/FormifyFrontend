import React, { useState,useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Eye, Trash2, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BASE_URL } from '../../config.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const FormResponses = ({formId}) => {

    const [submissions,setSubmissions]=useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSubmission, setSelectedSubmission] = useState(null)
    const {authToken}=useAuth();

    
    useEffect(()=>{
        const fetchResponses=async()=>{
            try {
                const response=await fetch(`${BASE_URL}/form/getResponses/${formId}`,{
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    }
                })
                if(!response.ok){
                    throw new Error("unable to get responses")
                }
                const result=await response.json()
                console.log(result.content);
                setSubmissions(result.content)
            } catch (error) {
                console.log("Error : ", error)
            }
            
        }
        fetchResponses()
    },[formId])

    const handleDelete = async (submissionId) => {
        try {
          const response = await fetch(`${BASE_URL}/form/deleteResponse/${submissionId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            }
          })
          if (!response.ok) {
            throw new Error("unable to delete response")
          }
          setSubmissions(submissions.filter(submission => submission._id !== submissionId))
        } catch (error) {
          console.log("Error deleting submission:", error)
        }
      }
    
      const openModal = (submission) => {
        setSelectedSubmission(submission)
        setIsModalOpen(true)
      }
  return (
    <div className="p-4 bg-white rounded-md">
    <h2 className="text-xl font-semibold mb-4">Responses</h2>
    {submissions.length === 0 ? (
      <p>No responses yet. Responses will appear here once your form is published and people start submitting answers.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                    onClick={() => openModal(submission)}
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View Submission
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800 flex items-center"
                    onClick={() => handleDelete(submission._id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
          <DialogDescription>
            Submitted {selectedSubmission && formatDistanceToNow(new Date(selectedSubmission.createdAt), { addSuffix: true })}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          {selectedSubmission && selectedSubmission.responses.map((response, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-sm">{response.question}</h3>
              <p className="text-sm mt-1">{Array.isArray(response.answer) ? response.answer.join(', ') : response.answer}</p>
            </div>
          ))}
        </ScrollArea>
        <Button className="mt-4" onClick={() => setIsModalOpen(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  </div>
  )
}

export default FormResponses