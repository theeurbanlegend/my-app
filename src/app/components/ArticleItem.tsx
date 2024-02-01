import React, { useEffect } from 'react'
import { ArrowUp } from './Icons/Up';
import { ArrowDown } from './Icons/Down';
import { useVotes } from '@/hooks/useVotes';
import { useViews } from '@/hooks/useSupabase';

export type View={
    id:number;
    created_at?:string;
    description?:string;   
    votes?:any[];   
}
const ViewItem = ({view:{
    description,
    id,
    votes
}}:{view:View}) => {
    const {newVote}=useViews()
    
    useEffect(()=>{
        
    },[])
  return (
    <div className=' flex justify-between border px-4 py-3 cursor-pointer hover:bg-gray-900'>
       <h2> {description}</h2>
       <div className='grid text-center'>
        <span onClick={()=>newVote(id)}><ArrowUp/></span>
        <span>{votes?.length} votes</span>
        <span onClick={()=>newVote(id, true)}><ArrowDown/></span>
       </div>
        </div>
  )
}

export default ViewItem