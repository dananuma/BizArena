"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/config/firebase.config";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [ideas, setIdeas] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalIdeas: 0,
    totalLikes: 0,
    totalComments: 0,
    engagement: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;

      setLoading(true);

      const email = session.user.email.toLowerCase();

      try {
        // 👤 PROFILE
        const userRef = doc(db, "users", email);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile(userSnap.data());
        }

        // 💡 IDEAS
        const q = query(
          collection(db, "ideas"),
          where("userId", "==", email)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setIdeas(data);

        // 📊 STATS CALCULATION
        let totalLikes = 0;
        let totalComments = 0;

        data.forEach((idea) => {
          totalLikes += Array.isArray(idea.likes)
            ? idea.likes.length
            : 0;

          totalComments += idea.commentsCount || 0;
        });

        setStats({
          totalIdeas: data.length,
          totalLikes,
          totalComments,
          engagement: totalLikes + totalComments,
        });

      } catch (err) {
        console.error("Dashboard error:", err);
      }

      setLoading(false);
    };

    fetchData();
  }, [session?.user?.email]);

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>Please login</p>;

  return (
    <main className="min-h-screen bg-background text-secondary">

      {/* HEADER */}
      <section className="bg-blue-600 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 relative">

          {/* UPDATE PROFILE LINK */}
          <a
            href="/dashboard/update"
            className="absolute top-4 right-4 border border-white px-4 py-2 rounded-lg text-sm hover:bg-white hover:text-blue-600 transition"
          >
            Update Profile
          </a>

          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome, {profile?.name || session.user.name}
          </h1>

          <p className="text-blue-100 mt-2">
            {profile?.bio || "No bio yet"}
          </p>

        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-4">

        <StatCard title="Total Ideas" value={stats.totalIdeas} />
        <StatCard title="Total Likes" value={stats.totalLikes} />
        <StatCard title="Comments" value={stats.totalComments} />
        <StatCard title="Engagement" value={stats.engagement} />

      </section>

      {/* IDEAS LIST */}
      <section className="max-w-6xl mx-auto px-4 pb-16">

        <h2 className="text-xl font-bold mb-4">
          Your Ideas
        </h2>

        {loading ? (
          <p>Loading ideas...</p>
        ) : ideas.length === 0 ? (
          <p className="text-gray-500">
            You haven’t posted any ideas yet.
          </p>
        ) : (
          <div className="grid gap-4">

            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white border rounded-xl p-5 shadow-sm"
              >

                <h3 className="font-semibold text-lg">
                  {idea.title}
                </h3>

                <p className="text-gray-600 mt-2 text-sm">
                  {idea.description}
                </p>
                {/* IDEA STATS */}
                <div className="flex gap-4 text-xs text-gray-500 mt-3">

                  <span>
                    ❤️{" "}
                    {Array.isArray(idea.likes)
                      ? idea.likes.length
                      : 0}
                  </span>

                  <span>
                    💬 {idea.commentsCount || 0}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

/* 📦 REUSABLE STAT CARD */
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">

      <h3 className="text-sm text-gray-500">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}