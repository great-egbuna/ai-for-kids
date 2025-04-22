"use client";

import {
  generalService,
  WaitlistSubscriber,
} from "@/app/services/admin.service";
import CyberpunkLoader from "@/components/ui/CyberLoading";
import { useEffect, useState } from "react";

export default function EmailList() {
  const [subscribers, setSubscribers] = useState<WaitlistSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  useEffect(() => {
    const loadSubscribers = async () => {
      const data: any = await generalService.getWaitlistSubscribers();
      setSubscribers(data);
      setLoading(false);
    };
    loadSubscribers();
  }, []);

  if (loading) return <CyberpunkLoader />;

  return (
    <div className="p-4 md:p-8 bg-black/50 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.3),inset_0_0_10px_rgba(0,255,255,0.3)]">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
        <span className="text-pink-500 drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">
          SUBSCRIBER
        </span>
        <span className="text-cyan-400 ml-2 md:ml-3 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
          DATABASE
        </span>
      </h2>

      <div className="border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.4)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto pb-2">
          <table className="w-full bg-black/50 backdrop-blur-sm min-w-[600px] md:min-w-full">
            <thead>
              <tr>
                <th className="p-2 md:p-4 text-sm md:text-base text-left border-b-2 border-pink-500 relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-cyan-400 after:to-transparent">
                  <span className="text-pink-500 drop-shadow-[0_0_4px_rgba(255,0,255,0.8)]">
                    FIRST
                  </span>
                </th>
                <th className="p-2 md:p-4 text-sm md:text-base text-left border-b-2 border-pink-500 relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-cyan-400 after:to-transparent">
                  <span className="text-pink-500 drop-shadow-[0_0_4px_rgba(255,0,255,0.8)]">
                    LAST
                  </span>
                </th>
                <th className="p-2 md:p-4 text-sm md:text-base text-left border-b-2 border-pink-500 relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-cyan-400 after:to-transparent">
                  <span className="text-pink-500 drop-shadow-[0_0_4px_rgba(255,0,255,0.8)]">
                    EMAIL
                  </span>
                </th>
                <th className="p-2 md:p-4 text-sm md:text-base text-left border-b-2 border-pink-500 relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-cyan-400 after:to-transparent">
                  <span className="text-pink-500 drop-shadow-[0_0_4px_rgba(255,0,255,0.8)]">
                    TYPE
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-cyan-400/20 hover:bg-cyan-400/10 transition-all group cursor-pointer"
                  onClick={() =>
                    setSelectedNote(sub.notes || "No notes available.")
                  }
                >
                  <td className="p-2 md:p-4 text-sm md:text-base text-cyan-300 group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all">
                    {sub.firstName}
                  </td>
                  <td className="p-2 md:p-4 text-sm md:text-base text-cyan-300 group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all">
                    {sub.lastName}
                  </td>
                  <td className="p-2 md:p-4 text-sm md:text-base text-cyan-300 group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all truncate">
                    {sub.email}
                  </td>
                  <td className="p-2 md:p-4 text-sm md:text-base text-cyan-300 group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all">
                    {(sub?.type as any) || "General"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedNote !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black text-cyan-200 border border-cyan-500 p-6 rounded-xl max-w-md w-full mx-4 shadow-[0_0_20px_rgba(0,255,255,0.5)]">
            <h3 className="text-lg font-bold mb-4 text-pink-400 drop-shadow-[0_0_6px_rgba(255,0,255,0.7)]">
              Subscriber Notes
            </h3>
            <p className="whitespace-pre-wrap">{selectedNote}</p>
            <button
              onClick={() => setSelectedNote(null)}
              className="mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
