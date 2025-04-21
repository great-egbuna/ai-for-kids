"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { CyberpunkToast } from "@/components/ui/CustomToast";
import { CyberpunkWavyText } from "@/components/ui/CyberPunkText";

export const EmailListForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    callNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "subscribers"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
      setFormData({ firstName: "", lastName: "", callNumber: "", email: "" });
      setMsg("Thank You");
    } catch (err) {
      setMsg("Failed to subscribe. Please try again.");

      setError("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-cyan-400 text-center animate-pulse">
        <p className="text-xl font-bold">Thanks for joining!</p>
        <p className="mt-2">You're now part of the future 🤖</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-cyan-400/30 shadow-lg shadow-cyan-400/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-pink-400 text-sm font-medium block mb-2 text-left">
              First Name
            </label>
            <input
              type="text"
              required
              placeholder="Neo"
              className="w-full px-4 py-2 bg-[#1e293b] border border-cyan-400/30 rounded-md text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-pink-400 text-sm font-medium block mb-2 text-left">
              Last Name
            </label>
            <input
              type="text"
              required
              placeholder="Anderson"
              className="w-full px-4 py-2 bg-[#1e293b] border border-cyan-400/30 rounded-md text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="text-pink-400 text-sm font-medium block mb-2 text-left">
            Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="+234 800 000 0000"
            className="w-full px-4 py-2 bg-[#1e293b] border border-cyan-400/30 rounded-md text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            value={formData.callNumber}
            onChange={(e) =>
              setFormData({ ...formData, callNumber: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-pink-400 text-sm font-medium block mb-2 text-left">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="neo@matrix.com"
            className="w-full px-4 py-2 bg-[#1e293b] border border-cyan-400/30 rounded-md text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-bold rounded-md hover:from-cyan-300 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/40 animate-glow cursor-pointer"
        >
          {loading ? <CyberpunkWavyText /> : "JOIN THE FUTURE"}
        </button>
        {error && (
          <p className="text-red-400 text-sm text-center mt-4">{error}</p>
        )}
      </form>

      {msg && (
        <CyberpunkToast
          message={msg}
          duration={4000}
          onClose={() => setMsg(null)}
        />
      )}
    </div>
  );
};
