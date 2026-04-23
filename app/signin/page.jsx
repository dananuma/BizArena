import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation";


export default async function Signin() {

    const session = await auth()
    // console.log(session);

    if (session) {
        redirect("/")
    }
    
    return (
        <main className="min-h-dvh flex items-center bg-gray-700 justify-center p-3">
            <section className="p-4 rounded-md shadow-md max-md:w-full md:w-1/2 flex flex-col items-center gap-5">
                <h1 className="text-3xl font-semibold mb-5 max-md:text-center">Sign in to your Account</h1>
                <form className="flex flex-col gap-3 md:w-1/2 max-md:w-full">
                    <input type="text" placeholder="example@gmail.com" className="w-full outline-none border border-gray-600 rounded-md px-4 py-2" />
                    <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:-translate-y-1 transition-all duration-200">Sign In</button>
                </form>

                <div className="w-full flex items-center gap-2 justify-center">
                    <div className="border-t w-full border-gray-400"></div>
                    <p>or</p>
                    <div className="border-t w-full border-gray-400"></div>
                </div>

                <div className="w-full flex items-center justify-center gap-5">
                    <form
                        action={async () => {
                            "use server"
                            await signIn("google")
                        }}
                    >      
                        <button type="submit" className="border p-5 text-3xl rounded-md border-gray-400 cursor-pointer"><FcGoogle /></button>
                    </form>
                    <form
                        action={async () => {
                            "use server"
                            await signIn("github")
                            // 
                        }}
                    >      
                        <button type="submit" className="border p-5 text-3xl rounded-md border-gray-400 cursor-pointer"><FaGithub /></button>
                    </form>
                    <button className="border p-5 text-3xl rounded-md border-gray-400 cursor-pointer"><FaApple /></button>
                </div>
            </section>
        </main>
    )
}