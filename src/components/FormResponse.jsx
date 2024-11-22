import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import { BASE_URL } from '../../config.jsx'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Share2, PlusCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const FormResponse = () => {

  const [formNotFound, setFormNotFound] = useState(false)
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [questions, setQuestions] = useState([])
  const [responses, setResponses] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { formId } = useParams()
  useEffect(()=>{
    const fetchForm=async()=>{
      
      try {
        const response=await fetch(`${BASE_URL}/form/use/${formId}`,{
          method:"GET",
          headers:{
            "Content-Type": "application/json"
          }
        })
        if(!response.ok){
          throw new Error("unable to fetch form")
        }
        const result=await response.json()
        if(!result.content.title && !result.content.description && result.content.questions.length==0){
          setFormNotFound(true)
        }
        else{
          setFormNotFound(false)
        }
        console.log(result.content);
        setFormTitle(result.content.title || "")
        setFormDescription(result.content.description || "")
        setQuestions(result.content.questions || [])
      } catch (error) {
        console.log("error : ",error)
      }

    }
    fetchForm()
  },[formId])
  const handleInputChange = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value })) // dynamic key , i.e questionId
  }

  const handleClearForm = () => {
    setResponses({})
  }

  const handleSubmitAgain=()=>{
    setResponses({})
    setSubmitSuccess(false)
  }
  
  const handleShareForm = () => {
   
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert("Form link copied to clipboard!"))
      .catch(err => console.error('Failed to copy: ', err))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formattedResponses = {
      formId:formId,
      title: formTitle,
      description: formDescription,
      responses: questions.map(question => ({
        question: question.question,
        answer: responses[question._id] || ''
      }))
    }
      const response = await fetch(`${BASE_URL}/form/response/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formattedResponses)
      })
      if (!response.ok) {
        throw new Error("Failed to submit form")
      }
      setSubmitSuccess(true)
    } catch (error) {
      console.log("Error submitting form: ", error)
      setSubmitSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  
  }

  if (formNotFound) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The requested form could not be found. Please check the URL and try again.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (submitSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              Form Submitted Successfully
            </CardTitle>
            <CardDescription>Thank you for your response!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSubmitAgain} className="w-full">
              Submit Form Again
            </Button>
            <Button onClick={handleShareForm} className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Share Form with Friends
            </Button>
            <Link to="/signup" className="w-full py-2">
              <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Want to create your form? Sign up
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{formTitle}</CardTitle>
          <CardDescription>{formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium">Total Questions: {questions.length}</p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Card key={question._id} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Question {index + 1}</CardTitle>
              <CardDescription>{question.question}</CardDescription>
            </CardHeader>
            <CardContent>
              {question.type === 'URL' && (
                <Input
                  id={question._id}
                  type="url"
                  value={responses[question._id] || ''}
                  onChange={(e) => handleInputChange(question._id, e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter URL"
                />
              )}
              {question.type === 'Text' && (
                <Input
                  id={question._id}
                  type="text"
                  value={responses[question._id] || ''}
                  onChange={(e) => handleInputChange(question._id, e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter text"
                />
              )}
              {question.type === 'Email' && (
                <Input
                  id={question._id}
                  type="email"
                  value={responses[question._id] || ''}
                  onChange={(e) => handleInputChange(question._id, e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter email"
                />
              )}
              {question.type === 'Multiple Choice' && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <Checkbox
                        id={`${question._id}-${optionIndex}`}
                        checked={(responses[question._id] || []).includes(option)}
                        onCheckedChange={(checked) => {
                          const currentResponses = responses[question._id] || []
                          if (checked) {
                            handleInputChange(question._id, [...currentResponses, option])
                          } else {
                            handleInputChange(question._id, currentResponses.filter(item => item !== option))
                          }
                        }}
                      />
                      <Label htmlFor={`${question._id}-${optionIndex}`} className="ml-2">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
              {question.type === 'Multiple Option' && (
                <RadioGroup
                  onValueChange={(value) => handleInputChange(question._id, value)}
                  value={responses[question._id] || ''}
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question._id}-${optionIndex}`} />
                      <Label htmlFor={`${question._id}-${optionIndex}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>
        ))}
        <div className="flex space-x-2 justify-start mb-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClearForm} 
            size="sm"
          >
            Clear Form
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            size="sm"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
      <footer className="text-center mt-8 text-sm text-gray-500">
        Created by <a href="https://github.com/mohammedajmal0" className="text-blue-500 hover:underline">Ajmal</a> | formify
      </footer>
    </div>
  )
}

export default FormResponse