import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useViews=()=>{
    const [views, setViews]= useState<any[]>([])

    const getViews= async()=>{
        const {data,status, error}= await supabase
        .from('views')
        .select('*, votes(*)')

        if(data){
            setViews(data)
        }
        if(error) console.log(error)
    }
    const newVote=async(view_id:number, remove?:boolean)=>{
        const {data:{session}, error:sessionError}=await supabase.auth.getSession()
        if(!session) return alert(' You are not authenticated!')
        const {user:{id}}=session
        if(remove){
            const {data, error}=await supabase.from('votes')
            .delete()
            .eq('view_id', view_id)
            .eq('user_id', id)
    
            return
        }
        const {data, error:addError}=await supabase
        .from('votes')
        .insert({
            view_id,
            user_id:id
        })
        .select()
        .single()
        if(addError) console.log(addError)
    }
    return {
        views,getViews,setViews, newVote
    }
}