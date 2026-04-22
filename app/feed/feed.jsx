"use client";

import { useEffect, useState } from "react";
import { db } from "@/config/firebase.config";
import { collection, query, orderBy, onSnapshot, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Comments from "@/components/comments"

export default function FeedPage() {
  const { data: session } = useSession();

  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "ideas"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, async (snap) => {
      const data = await Promise.all(
        snap.docs.map(async (d) => {
          const idea = d.data();

          const userSnap = await getDoc(
            doc(db, "users", idea.userId)
          );

          return {
            id: d.id,
            ...idea,
            user: userSnap.exists() ? userSnap.data() : null,
          };
        })
      );

      setIdeas(data);
    });

    return () => unsub();
  }, []);

  // ❤️ LIKE
  const toggleLike = async (idea) => {
    if (!session?.user?.email) return;

    const ref = doc(db, "ideas", idea.id);
    const userId = session.user.email;

    const hasLiked = Array.isArray(idea.likes)
      ? idea.likes.includes(userId)
      : false;

    await updateDoc(ref, {
      likes: hasLiked
        ? arrayRemove(userId)
        : arrayUnion(userId),
    });
  };

  return (
    <main className="p-6 space-y-6">

      {ideas.map((idea) => {
        const likes = Array.isArray(idea.likes)
          ? idea.likes
          : [];

        const hasLiked = likes.includes(session?.user?.email);

        return (
          <div key={idea.id} className="border p-4 rounded-lg">

            {/* USER */}
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                {idea.user?.name?.[0] || "U"}
              </div>

              <div>
                <p className="font-medium">
                  {idea.user?.name || "User"}
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <h2 className="font-bold mt-3">{idea.title}</h2>
            <p className="text-gray-600">{idea.description}</p>

            {/* ACTIONS */}
            <div className="flex gap-6 mt-4 text-sm">

              <button onClick={() => toggleLike(idea)}>
                {hasLiked ? "❤️" : "🤍"} {likes.length}
              </button>

              <span>💬 {idea.commentsCount || 0}</span>

            </div>

            {/* COMMENTS */}
            <Comments ideaId={idea.id} />

          </div>
        );
      })}

    </main>
  );
}