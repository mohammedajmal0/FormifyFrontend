import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { FE_URL } from '../../../config'

const FormCard = ({ form }) => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleCopyLink = (e) => {
    e.stopPropagation()
    const link = `${FE_URL}/form/${form.id}`
    navigator.clipboard.writeText(link)
    toast({
      title: "Link copied",
      description: "Form link has been copied to clipboard",
    })
  }

  const handleManage = (e) => {
    e.stopPropagation()
    navigate(`/manage/${form.id}`)
  }

  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/manage/${form.id}`)}
    >
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold">{form.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{form.description}</p>
        </div>
        
        <div className="space-y-0.5">
          <p className="text-gray-600 text-sm">{form.questionCount} Questions</p>
          <p className="text-gray-600 text-sm">{form.submissionCount} Submissions</p>
          <p className="text-gray-600 text-sm">
            Created {formatDistanceToNow(form.createdAt, { addSuffix: true })}
          </p>
        </div>

        <hr className="my-3" />

        {/* <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            className="flex items-center justify-center text-xs px-3 py-1.5 border-black hover:bg-gray-100"
            onClick={handleCopyLink}
          >
            <Link2 className="w-3 h-3 mr-1" />
            Copy Form Link
          </Button>
          <Button
            className="flex items-center justify-center text-xs px-3 py-1.5 border-black hover:bg-gray-100"
            onClick={handleManage}
          >
            Manage
          </Button>
        </div> */}
        <div className="flex mt-4">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center text-xs px-3 py-1.5 border-r border-black hover:bg-gray-100"
            onClick={handleCopyLink}
          >
            <Link2 className="w-3 h-3 mr-1" />
            Copy Form Link
          </Button>
          <Button
            className="flex-1 flex items-center justify-center text-xs px-3 py-1.5 bg-black text-white hover:bg-gray-800"
            onClick={handleManage}
          >
            Manage
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default FormCard