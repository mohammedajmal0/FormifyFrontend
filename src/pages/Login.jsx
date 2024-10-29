import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../config'
import Loader from '../components/commonComponents/Loader'

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errors, setErrors] = useState({})
  const [isLoading,setIsLoading]=useState(false)
  const {authToken,login}=useAuth()
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      setIsLoading(true)
      const response=await fetch(`${BASE_URL}/auth/login`,{
        method:'post',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email, password})
      })

      if(!response.ok){
        throw new Error(`Response status : ${response.status}`)
      }
      const result=await response.json()
      const token = result?.content?.accessToken;
      setPassword('')
      setEmail('');
      login(token)
      navigate('/dashboard')
    } catch (error) {
      console.log("Error ", error)
    }
    finally{
      setIsLoading(false)
    }
  }
  if(authToken){
    navigate('/dashboard')
  }
  return (
    <div className='p-4 bg-gray-100 flex items-center min-h-screen justify-center'>
      <Card className='w-full max-w-md' >
        <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
              id="email"
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <Alert variant="destructive"><AlertDescription>{errors.email}</AlertDescription></Alert>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
              id='password'
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              {errors.password && <Alert variant="destructive"><AlertDescription>{errors.password}</AlertDescription></Alert>}
            </div>
            <Button className='w-full'>{isLoading ? (<div className="flex gap-3">login <Loader /></div>) : 'login'}</Button>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
        <p className="text-sm text-gray-600">
            Dont have an account yet?{' '}
            <a href="/signup" className="text-primary hover:underline">
              Signup
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login