import { auth } from "@/auth";
import FeedClient from "./feed";
import { redirect } from "next/navigation";

export default async function Feed (){
    const session = await auth()

    if (!session) {
        redirect("/signin")
    }
    
    return (
        <main>
            <FeedClient session={session}/>
        </main>
    )
}