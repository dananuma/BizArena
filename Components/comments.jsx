"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebase.config";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";

export default function Comments({ ideaId }) {
  const { data: session } = useSession();

  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  // ⚡ REAL-TIME COMMENTS
  useEffect(() => {
    const q = query(
      collection(db, "ideas", ideaId, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setComments(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, [ideaId]);

  // ➕ ADD COMMENT
  const addComment = async () => {
    if (!session) return alert("Login required");
    if (!text.trim()) return;

    await addDoc(
      collection(db, "ideas", ideaId, "comments"),
      {
        text,
        userId: session.user.email,
        username: session.user.name,
        createdAt: serverTimestamp(),
      }
    );

    // update count
    await updateDoc(doc(db, "ideas", ideaId), {
      commentsCount: increment(1),
    });

    setText("");
  };

  return (
    <div className="mt-4 border-t pt-4">

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write comment..."
          className="border p-2 flex-1"
        />

        <button
          onClick={addComment}
          className="bg-blue-600 text-white px-3"
        >
          Send
        </button>
      </div>

      {/* LIST */}
      <div className="mt-3 space-y-2">

        {comments.map((c) => (
          <div key={c.id} className="text-sm">

            <p className="font-medium">
              {c.username}
            </p>

            <p className="text-gray-600">
              {c.text}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}