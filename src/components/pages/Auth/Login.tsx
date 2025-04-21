"use client";
import { authService } from "@/app/services/auth.service";
import { CyberpunkWavyText } from "@/components/ui/CyberPunkText";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function Login() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!validateEmail(email)) {
        alert("Please enter a valid email address");
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters");
      }

      await authService.signIn({ email, password });
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1e293b] text-white font-inter p-4 flex items-center justify-center"
      style={{ textShadow: "0 0 2px #00ffff" }}
    >
      <div className="w-full max-w-md px-4 py-8">
        <div className="bg-gradient-to-br from-[#0f172a]/50 to-[#1e293b]/50 rounded-xl p-8 border border-cyan-400/30 shadow-lg shadow-cyan-400/20">
          <h1
            className="text-4xl font-bold text-cyan-400 text-center mb-8"
            style={{ textShadow: "0 0 4px #00ffff" }}
          >
            Sign In
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-900/50 border border-red-400 rounded-lg text-red-300 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label
                className="block text-pink-500 text-sm font-bold mb-2"
                style={{ textShadow: "0 0 2px #ff00ff" }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f172a]/50 border border-cyan-400 rounded-lg py-3 px-4 text-cyan-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                placeholder="Enter your email"
                style={{ boxShadow: "0 0 4px #00ffff40" }}
                required
              />
            </div>

            <div>
              <label
                className="block text-pink-500 text-sm font-bold mb-2"
                style={{ textShadow: "0 0 2px #ff00ff" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f172a]/50 border border-cyan-400 rounded-lg py-3 px-4 text-cyan-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                placeholder="Enter your password"
                style={{ boxShadow: "0 0 4px #00ffff40" }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`glow-button w-full border border-cyan-400 text-cyan-400 py-3 rounded-lg transition-all font-bold
                ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-cyan-400 hover:text-black"
                }
              `}
              style={{ textShadow: "0 0 2px #00ffff" }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <CyberpunkWavyText />
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
