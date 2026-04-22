
import Link from "next/link";


export default function Home() {
  return (
    <main className="bg-background text-secondary">

      {/* HERO */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Turn Business Ideas Into Real Opportunities
          </h1>

          <p className="mt-6 text-blue-100 text-lg max-w-2xl mx-auto">
            BizArena is a community where entrepreneurs share ideas, get feedback, and build the next big thing together.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/feed" >
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold cursor-pointer">
              Explore Ideas
            </button>
            </Link>

            <Link href="/post">
            <button className="border border-white px-6 py-3 rounded-lg cursor-pointer">
              Post an Idea
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-10 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          Trusted by creators, founders & innovators building real businesses
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12">
            Why BizArena?
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Share Ideas</h3>
              <p className="text-gray-600">
                Post your business ideas and let the community refine them.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Get Feedback</h3>
              <p className="text-gray-600">
                Receive comments and insights from real thinkers and builders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Build Together</h3>
              <p className="text-gray-600">
                Connect with people who want to turn ideas into reality.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-3xl mx-auto text-center px-4">

          <h2 className="text-3xl font-bold">
            Ready to share your first idea?
          </h2>

          <p className="mt-4 text-gray-300">
            Join BizArena and start building with others today.
          </p>

          <button className="mt-8 bg-blue-600 px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>

        </div>
      </section>

    </main>
  );
}