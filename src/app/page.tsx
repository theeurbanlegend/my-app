
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter()
  const logout=async ()=>{
    await supabase
    .auth.signOut()
    .then(()=>{
      console.log('lOGGED OUT!')

      router.refresh()
    })
    .catch(error=>{
      console.log(error)
    })
    
  }
  
  return (
   <div>
    <button className='px-3 py-2 bg-blue-500 text-white cursor-pointer' onClick={logout}>Sign out</button>
   </div>
  );
}
