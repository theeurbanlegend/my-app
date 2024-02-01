import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useVotes=()=>{
    const [votes, setVotes]= useState<any[]>([])

    const getVotes= async()=>{
        const {data,status, error}= await supabase
        .from('votes')
        .select('*')

        if(data){
            setVotes(data)
        }
        if(error) console.log(error)
    }


    return {
        votes,getVotes,setVotes
    }
}