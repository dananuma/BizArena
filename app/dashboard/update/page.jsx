"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

export default function UpdateProfile() {
  const { data: session, status } = useSession();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  // 🔄 LOAD PROFILE
  useEffect(() => {
    const load = async () => {
      if (!session?.user?.email) return;

      const ref = doc(
        db,
        "users",
        session.user.email.toLowerCase()
      );

      const snap = await getDoc(ref);

      if (snap.exists()) {
        setName(snap.data().name || "");
        setBio(snap.data().bio || "");
      }
    };

    load();
  }, [session?.user?.email]);

  // 💾 UPDATE PROFILE
  const handleUpdate = async () => {
    if (!session?.user?.email) return;

    setLoading(true);

    try {
      const ref = doc(
        db,
        "users",
        session.user.email.toLowerCase()
      );

      await setDoc(
        ref,
        {
          name,
          bio,
          email: session.user.email.toLowerCase(),
          updatedAt: new Date(),
        },
        { merge: true }
      );

      // 🔥 TRIGGER GLOBAL UPDATE EVENT
      localStorage.setItem(
        "profile-updated",
        Date.now().toString()
      );

      setToast("Profile updated successfully ✨");
      setTimeout(() => setToast(""), 3000);

    } catch (err) {
      console.error(err);
      setToast("Update failed ❌");
      setTimeout(() => setToast(""), 3000);
    }

    setLoading(false);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please login</p>;

  return (
    <main className="p-6 max-w-md mx-auto relative">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <h1 className="text-xl font-bold mb-6">
        Update Profile
      </h1>

      <div className="space-y-4">

        <input
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <textarea
          className="border p-2 w-full rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

      </div>

    </main>
  );
}