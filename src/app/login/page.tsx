'use client'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Loginpage = () => {
    const [signupData,setSignupData]=useState<{
        email:string
    }>({email:''})

    const handleChange=()=>{
        console.log('changed!')
    }
    const [success, setSuccess]=useState<boolean>(false)
    const router=useRouter()
    const login=async()=>{
        try {
            
        const { data:dataUser, error } = await supabase.auth.signInWithOtp({
            email: signupData?.email,
            options:{
                shouldCreateUser:true
            }
        })
        if(dataUser){
            
            setSuccess(true)
            //router.refresh()
        }
        } catch (error) {
            console.group(error)
        }
    }
  return (
    <form action={'/auth/login'} className='flex flex-col gap-2 justify-center items-center'>
       <div className='grid'>
        <h1 className='text-center'>Welcome back</h1>
        <label htmlFor="email">Email</label>
        <input 
        type="text"
         name='email'
         className='text-black'
          value={signupData?.email}
          onChange={(e)=>setSignupData({...signupData,email:e.target.value})}
           />
       </div>
       <div className='grid'>
        <label htmlFor="email">password</label>
        {/* for signin in with password instances */}
        {/* <input 
        type="password"
         name='email'
         className='text-black'
          value={signupData?.password}
          onChange={(e)=>setSignupData({...signupData,password:e.target.value})}
           /> */}
       </div>
       {success && <div className='my-4 bg-green-100 p-2 text-green-500'>An email has been sent to {signupData?.email}</div>}
       <div><button onClick={login} type='submit' className='bg-blue-500 p-2 rounded-md'>Login</button></div>
    </form>
  )
}

export default Loginpage