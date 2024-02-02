'use client'
import { useViews } from "@/hooks/useSupabase";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ArticleItem from "./components/ArticleItem";

export default function Home() {
  const {views,getViews, setViews}=useViews()
  useEffect(()=>{
    getViews()
  },[getViews])
  
  const subscribedChannel= supabase
  .channel('views-follow-up')
.on('postgres_changes',{
  event:'*',
  schema:'public',
  table:'votes'
},(payload:any)=>{
  getViews()
}
).subscribe()
  
  return (
    <div className="container mx-auto">
      <ul className="grid gap-4">
        {views&& views.map((view:any, key:number)=>{
          return <ArticleItem key={key} view={view} />
        }) }
      </ul>
    </div>
  )
}
