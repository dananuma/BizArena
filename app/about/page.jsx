
export default function AboutPage() {
  return (
    <main className="bg-background text-secondary">

      {/* HERO */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            About BizArena
          </h1>

          <p className="mt-4 text-blue-100 text-lg">
            A space where business ideas are shared, refined, and turned into real opportunities.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Why BizArena exists
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Too many great business ideas die in people’s minds because they never get feedback, structure, or exposure.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            BizArena was built to change that — giving anyone the ability to share an idea and get real feedback from a community of thinkers, builders, and entrepreneurs.
          </p>

          <p className="text-gray-600 leading-relaxed">
            It is not just a social platform. It is a thinking ground for future businesses.
          </p>

        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-2xl font-bold text-center mb-12">
            What we stand for
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="p-6 bg-background rounded-xl">
              <h3 className="font-semibold mb-2">Clarity</h3>
              <p className="text-gray-600 text-sm">
                Every idea should be easy to understand and improve.
              </p>
            </div>

            <div className="p-6 bg-background rounded-xl">
              <h3 className="font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600 text-sm">
                Great ideas get better when people build on them together.
              </p>
            </div>

            <div className="p-6 bg-background rounded-xl">
              <h3 className="font-semibold mb-2">Execution</h3>
              <p className="text-gray-600 text-sm">
                Ideas only matter when they become real products and services.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-3xl mx-auto text-center px-4">

          <h2 className="text-3xl font-bold">
            Have an idea worth sharing?
          </h2>

          <p className="mt-4 text-gray-300">
            Join BizArena and start building with others today.
          </p>

          <button className="mt-8 bg-blue-600 px-6 py-3 rounded-lg font-semibold">
            Post Your Idea
          </button>

        </div>
      </section>

    </main>
  );
}