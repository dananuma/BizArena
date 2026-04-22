import { auth } from "@/auth";
import PostClient from "./post";
import { redirect } from "next/navigation";

export default async function Post (){
    const session = await auth()

    if (!session) {
        redirect("/signin")
    }
    
    return (
        <main>
            <PostClient session={session}/>
        </main>
    )
}