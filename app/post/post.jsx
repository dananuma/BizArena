"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateIdeaPage() {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return alert("Login required");

    await addDoc(collection(db, "ideas"), {
      title,
      description,
      userId: session.user.email,

      likes: [],
      commentsCount: 0,

      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDescription("");
  };

  return (
    <main className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Idea title"
          className="border p-2 w-full"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your idea"
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Idea
        </button>

      </form>
    </main>
  );
}