'use client'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Loginpage = () => {
    const [signupData,setSignupData]=useState<{
        email:string,
        password:string
    }>({email:'', password:''})

    const handleChange=()=>{
        console.log('changed!')
    }
    const [success, setSuccess]=useState<boolean>(false)
    const [isResetPassword, setIsResetPassword]=useState<boolean>(false)
    const router=useRouter()
    const sendResetPassword=async(e: any)=>{
        e.preventDefault()
        try{
            const {data:resetData, error}=await supabase.auth.resetPasswordForEmail(signupData.email, {
                redirectTo:`${window.location.href}reset`
            })
            console.log(resetData)
            setSuccess(true)
        }
        catch(err){
            console.log(err)
        }
    }
    const login=async(e: any)=>{
        e.preventDefault()
        try {            
        const { data:dataUser, error } = await supabase.auth.signInWithPassword({
            email: signupData?.email,
            password:signupData?.password
        })
        // const { data:dataUser, error } = await supabase.auth.signInWithOtp({
        //     email: signupData?.email,
        //     options:{
        //         shouldCreateUser:true
        //     }
        // })
        if(dataUser){
            console.log(dataUser)
            router.refresh()
        }
        } catch (error) {
            console.group(error)
        }
    }
  return (
    <div>
        {isResetPassword?
        ( 
        <form className='flex flex-col gap-2 justify-center items-center'>
        <div className='grid'>
         <h1 className='text-center'>Reset Your Password</h1>
         <label htmlFor="email">Email</label>
         <input 
         type="text"
          name='email'
          className='text-black'
           value={signupData?.email}
           onChange={(e)=>setSignupData({...signupData,email:e.target.value})}
            />
        </div>
        <div><p onClick={()=>setIsResetPassword(!isResetPassword)}className='text-white'>Back to login</p></div>
        {success && <div className='my-4 bg-green-100 p-2 text-green-500'>A reset email has been sent to {signupData?.email}</div>}
        <div><button onClick={sendResetPassword} type='submit' className='bg-blue-500 p-2 rounded-md'>Reset</button></div>
     </form>):(
         <form action={'/auth/login'} onSubmit={login} className='flex flex-col gap-2 justify-center items-center'>
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
          <label htmlFor="email">Password</label>
          {/* for signin in with password instances */}
          <input 
          type="password"
           name='email'
           className='text-black'
            value={signupData?.password}
            onChange={(e)=>setSignupData({...signupData,password:e.target.value})}
             />
         </div>
         {success && <div className='my-4 bg-green-100 p-2 text-green-500'>An email has been sent to {signupData?.email}</div>}
         
         <div><p onClick={()=>setIsResetPassword(!isResetPassword)} className='text-white hover:underline'>Reset Password</p></div>
         <div><button type='submit' className='bg-blue-500 p-2 rounded-md'>Login</button></div>
      </form>
     )
        }
    </div>
   
  )
}

export default Loginpage