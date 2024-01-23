import { supabaseAdmin } from "@/lib/supabase";
import Image from "next/image";

export default function Home() {
  const addNew=async()=>{
    const {data, error}= await supabaseAdmin
    .from('views')
    .insert({
      name:'new Name'
    })
    if(data) console.log(data)
    if(error) console.log(error)
  }
//addNew()
  return (
   <div>Home</div>
  );
}
