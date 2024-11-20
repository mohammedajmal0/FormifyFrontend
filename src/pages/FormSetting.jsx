import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { BASE_URL } from '../../config.jsx'
import { BLoader } from '../components/commonComponents/BigLoader.jsx'

const FormSetting = ({formId}) => {
    const [isPublic, setIsPublic] = useState(false)
    const { toast } = useToast()
    const navigate = useNavigate()
    const {authToken}=useAuth()
    const[isLoading,setIsLoading]=useState(false)

    const handlePublicToggle = (checked) => {
        setIsPublic(checked)
        // Here you would typically update this setting in your backend
        console.log(`Form ${formId} public setting changed to: ${checked}`)
      }

      const handleDeleteForm = async () => {
        try {
          // Replace this with your actual API call
            setIsLoading(true)
          const response = await fetch(`${BASE_URL}/form/${formId}`, {
            method: 'DELETE',
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            }
          })
    
          if (!response.ok) {
            throw new Error('Failed to delete form')
          }
    
          await toast({
            title: "Form deleted",
            description: "Your form has been successfully deleted.",
          })
          setTimeout(()=>{navigate('/dashboard')},2000)
           
        } catch (error) {
          console.error('Error deleting form:', error)
          toast({
            title: "Error",
            description: "Failed to delete the form. Please try again.",
            variant: "destructive",
          })
        }
        finally{
            setIsLoading(true)
        }
      }
  return (
      <div className="p-4 bg-white rounded-md space-y-6">
        {isLoading ? <BLoader/> : <></>}
    <h2 className="text-xl font-semibold mb-4">Form Settings</h2>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="public-form">Public Form</Label>
        <p className="text-sm text-gray-500">Allow anyone with the link to view and submit the form</p>
      </div>
      <Switch
        id="public-form"
        checked={isPublic}
        onCheckedChange={handlePublicToggle}
      />
    </div>

    <div className="pt-6 border-t">
      <h3 className="text-lg font-medium">Danger Zone</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">Deleting this form will permanently remove all associated data and responses.</p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Form</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your form and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteForm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
  )
}

export default FormSetting