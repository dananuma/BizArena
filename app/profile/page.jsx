import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { MdLogout } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa";


export default async function Profile() {
    const session = await auth()
    if (!session) {
        redirect("/signin")
    }
    return (
        <main>
            <h1 className="text-center my-10 md:text-5xl text-3xl font-bold text-gray-800">My Account</h1>
            <section className="min-h-dvh grid lg:grid-cols-2 gap-8 lg:w-3/4 mx-auto shadow-md rounded-md p-4 mb-10">
                <blockquote className="flex flex-col items-center gap-5">
                    <img src={session?.user?.image} alt={session?.user?.name} className="w-40 h-40 rounded-full" />
                    <h1 className="text-xl">{session?.user?.name}</h1>
                    <h2 className="text-lg font-light">{session?.user?.email}</h2>
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}
                    >
                        <button type="submit" className="flex items-center gap-1 text-xl bg-red-600 text-white px-10 py-2.5 rounded-md hover:bg-red-500 transition-all duration-200 cursor-pointer"><MdLogout />Sign Out</button>

                    </form>
                </blockquote>

                <blockquote className="flex flex-col items-center gap-5">
                    <h2 className="text-xl font-semibold text-gray-800">Update your profile</h2>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <input type="text" placeholder="Enter a new name..." className="w-full outline-none border border-gray-300 px-3 py-2 rounded-md" />
                        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 w-full roun ded-md hover:bg-purple-500 transition-all duration-200">Update<FaRegPaperPlane /></button>
                    </div>
                </blockquote>
            </section>
        </main>
    )
}