import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">BizArena</h2>
          <p className="text-sm">
            A platform where ideas meet opportunity. Share, explore, and build the future of business.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Navigation</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/feed">Feed</Link></li>
            <li><Link href="/create">Post Idea</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold mb-3">Account</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/signin">Sign In</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <p className="text-sm mb-2">Email: support@bizarena.com</p>
          <div className="flex gap-4 mt-2">
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">LinkedIn</span>
            <span className="hover:text-white cursor-pointer">Instagram</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center text-sm py-4">
        © {new Date().getFullYear()} BizArena. All rights reserved.
      </div>
    </footer>
  );
}