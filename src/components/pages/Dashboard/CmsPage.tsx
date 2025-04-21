"use client";

import { generalService } from "@/app/services/admin.service";
import { CyberpunkWavyText } from "@/components/ui/CyberPunkText";
import { useEffect, useState } from "react";

export default function CMSFormPage() {
  const [content, setContent] = useState({ heroTitle: "", aboutContent: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const data: any = await generalService.getSiteContent();
      setContent(data);
    };
    loadContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    await generalService.updateSiteContent(content);
    setLoading(false);
  };
  return (
    <div className="border-2 border-cyan-400 p-8 bg-black/50 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.3),inset_0_0_10px_rgba(0,255,255,0.3)]">
      <h2 className="text-3xl font-bold mb-8">
        <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
          CONTENT
        </span>
        <span className="text-pink-500 ml-3 drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">
          CONTROL
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-pink-500 uppercase tracking-widest text-sm mb-2 drop-shadow-[0_0_4px_rgba(255,0,255,0.8)]">
            HERO TITLE
          </label>
          <input
            type="text"
            className="w-full bg-black/50 border-2 border-cyan-400 p-3 text-cyan-300 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all"
            value={content?.heroTitle || "  "}
            onChange={(e) =>
              setContent({ ...content, heroTitle: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-pink-500 uppercase tracking-widest text-sm mb-2 drop-shadow-[0_0_4px_rgba(255,0,255,0.8)]">
            ABOUT CONTENT
          </label>
          <textarea
            className="w-full bg-black/50 border-2 border-cyan-400 p-3 text-cyan-300 font-mono h-64 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all"
            value={content?.aboutContent || " "}
            onChange={(e) =>
              setContent({ ...content, aboutContent: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 text-black hover:from-pink-500 hover:to-cyan-400 transition-all clip-path-[polygon(10%_0,100%_0,90%_100%,0_100%)] hover:scale-[1.02]"
        >
          {loading ? <CyberpunkWavyText /> : "[ SAVE CHANGES ]"}
        </button>
      </form>
    </div>
  );
}
