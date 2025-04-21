"use client";

import {
  generalService,
  WaitlistSubscriber,
} from "@/app/services/admin.service";
import CyberpunkLoader from "@/components/ui/CyberLoading";
import { truncate } from "fs";
import { useEffect, useState } from "react";

export default function EmailList() {
  // ... existing logic

  const [subscribers, setSubscribers] = useState<WaitlistSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className=" p-4 md:p-8 bg-black/50 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.3),inset_0_0_10px_rgba(0,255,255,0.3)]">
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
          {" "}
          {/* Added scroll container */}
          <table className="w-full bg-black/50 backdrop-blur-sm min-w-[500px] md:min-w-full">
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
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-cyan-400/20 hover:bg-cyan-400/10 transition-all group"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
