import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../config'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/commonComponents/Loader'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading,setIsLoading]=useState(false)
  const { authToken,login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      setIsLoading(true)
      const response=await fetch(`${BASE_URL}/auth/register`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({name, email, password})
      })
      if(!response.ok){
        throw new Error(`Response status : ${response.status}`)
      }
      const result = await response.json();
      const token = result?.content?.accessToken;
      setName('')
      setPassword('')
      setEmail('');
      login(token)
      navigate('/dashboard')
      
    } catch (error) {
      console.log("Error",error)
    }
    finally{
      setIsLoading(false)
    }

  }

  useEffect(()=>{
    if(authToken){
      navigate('/dashboard')
    }
  },[authToken])
  
  return (
    <>
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <Card className="w-full max-w-md">
      <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
          <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <Alert variant="destructive"><AlertDescription>{errors.name}</AlertDescription></Alert>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <Alert variant="destructive"><AlertDescription>{errors.email}</AlertDescription></Alert>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <Alert variant="destructive"><AlertDescription>{errors.password}</AlertDescription></Alert>}
            </div>
            <Button type="submit" className="w-full">{isLoading ? (<div className="flex gap-3">Sign up <Loader /></div>) : 'Sign up'}</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}

export default Signup