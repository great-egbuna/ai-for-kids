"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { CyberpunkToast } from "@/components/ui/CustomToast";
import { CyberpunkWavyText } from "@/components/ui/CyberPunkText";
import Link from "next/link";
import { button } from "framer-motion/client";

export const EmailListForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    callNumber: "",
    email: "",
    childAge: "",
    notes: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"book" | "question">("book");

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.callNumber &&
      formData.email &&
      formData.childAge
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    formData.type = activeTab;
    try {
      await addDoc(collection(db, "subscribers"), {
        ...formData,
        createdAt: new Date().toISOString(),
        type: activeTab,
      });
      setSubmitted(true);
      setMsg("Thank You");
      if (activeTab === "question") {
        setFormData({
          firstName: "",
          lastName: "",
          callNumber: "",
          email: "",
          childAge: "",
          notes: "",
        });
      }
    } catch (err) {
      setMsg("Failed to submit. Please try again.");
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab("book")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex-1 ${
            activeTab === "book"
              ? "bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-lg shadow-pink-500/30"
              : "bg-[#1e293b] text-pink-300 hover:bg-pink-500/10 hover:shadow-md hover:shadow-pink-500/20"
          }`}
        >
          Book Now
        </button>
        <button
          onClick={() => setActiveTab("question")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex-1 ${
            activeTab === "question"
              ? "bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-lg shadow-pink-500/30"
              : "bg-[#1e293b] text-pink-300 hover:bg-pink-500/10 hover:shadow-md hover:shadow-pink-500/20"
          }`}
        >
          Ask A Question
        </button>
      </div>

      <div className="md:max-w-md md:mx-auto p-6 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-cyan-400/30 shadow-lg shadow-cyan-400/20 mb-6">
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
              placeholder="+1 303 800 0000"
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

          <div>
            <label className="text-pink-400 text-sm font-medium block mb-2 text-left">
              {activeTab === "book" ? "Child's Age" : "Child's Age"}
            </label>
            <input
              type="number"
              min="5"
              max="18"
              required={activeTab === "book"}
              placeholder={
                activeTab === "book" ? "Enter child's age" : "Enter Child's age"
              }
              className="w-full px-4 py-2 bg-[#1e293b] border border-cyan-400/30 rounded-md text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              value={formData.childAge}
              onChange={(e) =>
                setFormData({ ...formData, childAge: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-pink-400 text-sm font-medium block mb-2 text-left">
              {activeTab === "book" ? "Notes" : "Your Question"}
            </label>
            <textarea
              placeholder={
                activeTab === "book"
                  ? "What lessons would your child like to learn?"
                  : "Type your question here..."
              }
              className="w-full px-4 py-2 h-32 bg-[#1e293b] border border-cyan-400/30 rounded-md text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading || (activeTab === "book" && !isFormValid())}
              className="w-full py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-bold rounded-md hover:from-cyan-300 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/40 animate-glow cursor-pointer"
            >
              {loading ? (
                <CyberpunkWavyText />
              ) : activeTab === "book" ? (
                "Enter"
              ) : (
                "Ask Question"
              )}
            </button>

            {activeTab === "book" && (
              <button
                disabled={!submitted}
                className={`w-full py-3 font-bold rounded-md transition-all duration-300 shadow-lg ${
                  submitted
                    ? "bg-gradient-to-r from-pink-500 to-cyan-400 text-black hover:from-pink-400 hover:to-cyan-300 shadow-pink-500/30 hover:shadow-xl hover:shadow-cyan-400/40 animate-glow cursor-pointer"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-75"
                }`}
              >
                <Link
                  href={
                    submitted
                      ? "https://buy.stripe.com/fZe16p4np3FGg0w6oo"
                      : "#"
                  }
                  className="block w-full h-full"
                >
                  Confirm Booking
                </Link>
              </button>
            )}
          </div>

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
    </div>
  );
};
