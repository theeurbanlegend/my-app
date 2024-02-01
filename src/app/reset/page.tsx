'use client'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ResetPage = () => {
    const [signupData,setSignupData]=useState<{
        password:string,
        confirmPassword:string
    }>({password:'', confirmPassword:''})
    const router=useRouter()
    const [visiblePass, setVisiblePass]=useState<boolean>(false)
    const handleChange=(e:any)=>{
        const {name, value}=e.target
        console.log(name, value)

        setSignupData((prev:any)=>({
          ...prev, [name]:value
        }))
    }
   
    const confirmPasswords=async(e:any)=>{
      e.preventDefault()
        const {password, confirmPassword}=signupData
        console.log(signupData)
       if(password!==confirmPassword) {
        return alert('Your passwords dont match!')
       }
       const {data, error}=await supabase.auth.updateUser({
        password:signupData.password
       })
       if(data) {
        router.push('/login')
       }
       if(error) console.log(error)

       
    }
    const [success, setSuccess]=useState<boolean>(false)
    const [isResetPassword, setIsResetPassword]=useState<boolean>(false)
    
  return (
    <form  className='flex flex-col gap-2 justify-center items-center'>
        <label htmlFor="password">Enter your New Password</label>
        <input className='text-black'  type={visiblePass?'text':'password'} name='password' value={signupData?.password}
        onChange={handleChange}
        
        />
        <div className='hover:underline cursor-pointer' onClick={()=>setVisiblePass(prev=>!prev)}><p>{visiblePass?'Hide':'Show'}</p></div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input className='text-black' type={visiblePass?'text':'password'} name='confirmPassword' value={signupData?.confirmPassword}
        onChange={handleChange}
        />
        <div><button className='px-4 py-2 bg-blue-500 rounded cursor-pointer' type='submit' onClick={confirmPasswords}>Confirm</button></div>  
    </form>
  )
}

export default ResetPage