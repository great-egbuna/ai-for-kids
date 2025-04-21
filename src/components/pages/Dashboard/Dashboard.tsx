"use client";

import { authService } from "@/app/services/auth.service";
import { useUserStore } from "@/app/store/useUserStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { setAuthenticatedUser, setIsLoggedIn } = useUserStore(
    (state) => state
  );

  const pathname = usePathname();
  const isCMS = pathname?.includes("/cms");

  const handleLogout = async () => {
    await authService.signOut();
    setAuthenticatedUser(null);
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1e293b] text-white font-inter p-4 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 bg-[size:20px_20px] opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00ffff10 1px, transparent 1px),
            linear-gradient(to bottom, #00ffff10 1px, transparent 1px)
          `,
        }}
      />

      <nav className="relative flex gap-0 mb-8 border-b border-cyan-400/30">
        <div
          className="absolute bottom-0 h-[2px] bg-cyan-400 transition-all duration-300"
          style={{
            width: isCMS ? "112px" : "132px",
            left: isCMS ? "0" : "140px",
          }}
        />

        <Link
          href="/dashboard/cms"
          className={`px-6 py-3 text-lg font-bold ${
            isCMS
              ? "text-cyan-400 bg-[#0f172a] border-t border-x border-cyan-400/50"
              : "text-pink-500 hover:text-cyan-400 hover:bg-cyan-400/10"
          } relative transition-all`}
        >
          <span className="drop-shadow-[0_0_4px_rgba(0,255,255,0.6)]">
            ⚡ CMS
          </span>
        </Link>

        <Link
          href="/dashboard/"
          className={`px-6 py-3 text-lg font-bold ${
            !isCMS
              ? "text-cyan-400 bg-[#0f172a] border-t border-x border-cyan-400/50"
              : "text-pink-500 hover:text-cyan-400 hover:bg-cyan-400/10"
          } relative transition-all`}
        >
          <span className="drop-shadow-[0_0_4px_rgba(0,255,255,0.6)]">
            📧 Email List
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className={`px-6 py-3 text-lg font-bold ${
            isCMS
              ? "text-cyan-400 bg-[#0f172a] border-t border-x border-cyan-400/50"
              : "text-pink-500 hover:text-cyan-400 hover:bg-cyan-400/10"
          } relative transition-all`}
        >
          <span className="drop-shadow-[0_0_4px_rgba(0,255,255,0.6)]">
            🚪 LogOut
          </span>
        </button>
      </nav>

      <div className="relative max-w-6xl mx-auto">{children}</div>
    </div>
  );
}
