import { useAuth } from "../context/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react'
import { useNavigate,Link } from "react-router-dom"


const Navbar = () => {
  const navigate=useNavigate()
  const {authToken,logout}=useAuth()

  const handleLogout=()=>{
    logout()
    navigate("/login")
  }
  
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-200 text-sm py-4">
    <nav className="max-w-[85rem] w-full mx-auto px-3 sm:flex sm:items-center sm:justify-between py-3">
      <a className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" href="#" aria-label="Brand">Formify</a>
      <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
       {authToken ? (
        <div className="ml-3 relative flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative w-8 h-8 rounded-full">
              <User className="h-8 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to='/dashboard' className="w-full">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to='/login' onClick={handleLogout} className="w-full">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
       ):(
        <>
        <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/login">Login</Link>
        <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/signup">Signup</Link>
        </>
       )}
        
      </div>
    </nav>
  </header>
  )
}

export default Navbar