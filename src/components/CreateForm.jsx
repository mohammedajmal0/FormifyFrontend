import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog"
import { PlusCircle, ChevronDown, X, ArrowLeft, Copy, Check } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"

const CreateForm = () => {
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [questions, setQuestions] = useState([])
  const navigate=useNavigate()
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isGoBackDialogOpen, setIsGoBackDialogOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [shareLink,setShareLink]=useState('')
  const { toast } = useToast()
  const questionTypes = [
    'Multiple Choice',
    'Multiple Option',
    'URL',
    'Text',
    'Email'
  ]

  useEffect(() => {
    // Add a default multiple option question if there are no questions
    if (questions.length === 0) {
      addQuestion('Multiple Option')
    }
  }, [])

  const addQuestion = (type) => {
    setQuestions([...questions, { 
      type, 
      content: '',
      description: '',
      options: type === 'Multiple Choice' || type === 'Multiple Option' ? ['Option 1', 'Option 2'] : []
    }])
  }

  const addOption = (questionIndex) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.push('')
    setQuestions(newQuestions)
  }

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions]
    newQuestions[index][field] = value
    setQuestions(newQuestions)
  }

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options[optionIndex] = value
    setQuestions(newQuestions)
  }

  

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.splice(optionIndex, 1)
    setQuestions(newQuestions)
  }

  const handleGoBackClick = () => {
    setIsGoBackDialogOpen(true)
  }

  const handleGoBack = () => {
    navigate("/dashboard")
  }

  const handleSaveAndGoBack = () => {
    if (validateForm()) {
      // Here you would typically save the form data to your backend
      console.log('Form saved:', { formTitle, formDescription, questions })
      navigate("/dashboard")
    }
  }

  const validateForm = () => {
    if (!formTitle.trim()) {
      toast({
        title: "Form title is required",
        description: "Please enter a title for your form.",
        variant: "destructive",
      })
      return false
    }
    if (!formDescription.trim()) {
      toast({
        title: "Form description is required",
        description: "Please enter a description for your form.",
        variant: "destructive",
      })
      return false
    }
    if (questions.length === 0) {
      toast({
        title: "At least one question is required",
        description: "Please add at least one question to your form.",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleSave = () => {
    if (validateForm()) {
      // Here you would typically save the form data to your backend
      console.log('Form saved:', { formTitle, formDescription, questions })
      setIsShareModalOpen(true)
    }
  }


  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setIsCopied(true)
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this link with others.",
    })
    setTimeout(() => setIsCopied(false), 2000)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleGoBackClick} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-6">Create New Form</h1>
        <Tabs defaultValue="edit-form" className="mb-6">
          <TabsList>
            <TabsTrigger value="edit-form">Edit Form</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="edit-form">
            <div className="space-y-6">
              <div>
                <Label htmlFor="formTitle">Form Title</Label>
                <Input
                  id="formTitle"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Enter form title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="formDescription">Form Description</Label>
                <Textarea
                  id="formDescription"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter form description"
                  className="mt-1"
                />
              </div>
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="p-4 border rounded-md space-y-4 bg-white">
                  <h3 className="font-semibold">Question {questionIndex + 1}: {question.type}</h3>
                  <div>
                    <Label htmlFor={`question-${questionIndex}`}>Question</Label>
                    <Input
                      id={`question-${questionIndex}`}
                      value={question.content}
                      onChange={(e) => updateQuestion(questionIndex, 'content', e.target.value)}
                      placeholder="Enter your question"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`description-${questionIndex}`}>Description (Optional)</Label>
                    <Input
                      id={`description-${questionIndex}`}
                      value={question.description}
                      onChange={(e) => updateQuestion(questionIndex, 'description', e.target.value)}
                      placeholder="Enter question description"
                      className="mt-1"
                    />
                  </div>
                  {(question.type === 'Multiple Choice' || question.type === 'Multiple Option') && (
                    <div className="space-y-2">
                      <Label>Options</Label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <Input
                            value={option}
                            onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOption(questionIndex, optionIndex)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(questionIndex)}
                      >
                        Add Option
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Question
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {questionTypes.map((type) => (
                    <DropdownMenuItem key={type} onSelect={() => addQuestion(type)}>
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex justify-center mt-6">
                <Button onClick={handleSave} className="w-full sm:w-auto">Save Form</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="responses">
            <div className="p-4 bg-white rounded-md">
              <h2 className="text-xl font-semibold mb-4">Responses</h2>
              <p>No responses yet. Responses will appear here once your form is published and people start submitting answers.</p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="p-4 bg-white rounded-md">
              <h2 className="text-xl font-semibold mb-4">Form Settings</h2>
              <p>Form settings and configuration options will be available here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Form</DialogTitle>
            <DialogDescription>
              Your form has been saved. You can share it using the link below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input value={shareLink} readOnly />
            <Button onClick={copyLink} variant="outline">
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You can access and share this form again from your dashboard.
          </p>
        </DialogContent>
      </Dialog>
      <Dialog open={isGoBackDialogOpen} onOpenChange={setIsGoBackDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to go back? Your changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button variant="secondary" onClick={handleSaveAndGoBack}>
              Save and Go Back
            </Button>
            <Button variant="destructive" onClick={handleGoBack}>
              Go Back Without Saving
            </Button>
            <Button variant="outline" onClick={() => setIsGoBackDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateForm