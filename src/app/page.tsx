'use client'
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    getSession()
  },[])
  const router=useRouter()
  //to logout
  const logout=async ()=>{
    await supabase
    .auth.signOut()
    .then((data)=>{
      console.log('lOGGED OUT!', data)

      router.refresh()
    })
    .catch(error=>{
      console.log(error)
    })
    
  }
  //to get session details
  const getSession=async()=>{
    const {data:{session}}=await supabase.auth.getSession()
  }
  //to refresh session details
  const refreshSession=async()=>{
    const {data:{session}}=await supabase.auth.refreshSession()
  }
  
  
  return (
   <div>
    <button className='px-3 py-2 bg-blue-500 text-white cursor-pointer' onClick={logout}>Sign out</button>
   </div>
  );
}
