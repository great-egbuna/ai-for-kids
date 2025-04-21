"use client";

import { curriculumData } from "@/components/ui/CurriculumCard";
import { useEffect, useState } from "react";

// Parent Component
export const CurriculumSection = () => {
  const [lessonPairs, setLessonPairs] = useState<any[]>([]);

  useEffect(() => {
    // Create pairs of lessons
    const pairs = [];
    for (let i = 0; i < curriculumData.length; i += 2) {
      const pair = {
        lesson1: curriculumData[i],
        lesson2: curriculumData[i + 1] || null,
      };
      pairs.push(pair);
    }
    setLessonPairs(pairs);
  }, []);

  return (
    <section className="mt-16 px-4 md:px-20">
      <h2 className="text-pink-500 text-2xl font-bold mb-8 text-center">
        Curriculum Roadmap
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonPairs.map((pair, index) => (
          <CurriculumCard
            key={index}
            lesson1={pair.lesson1}
            lesson2={pair.lesson2}
          />
        ))}
      </div>
    </section>
  );
};

// Updated CurriculumCard Component
const CurriculumCard = ({ lesson1, lesson2 }: any) => {
  const [activeTab, setActiveTab] = useState("lesson1");

  return (
    <div className="glowing-card p-6 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-cyan-400/30 hover:border-cyan-400/50 transition-all shadow-lg">
      {/* Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setActiveTab("lesson1")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === "lesson1"
              ? "bg-gradient-to-r from-cyan-400 to-pink-500 text-white shadow-lg shadow-cyan-400/30"
              : "bg-[#1e293b] text-cyan-300 hover:bg-cyan-400/10 hover:shadow-md hover:shadow-cyan-400/20"
          }`}
        >
          Lesson {lesson1.id}
        </button>

        {lesson2 && (
          <button
            onClick={() => setActiveTab("lesson2")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === "lesson2"
                ? "bg-gradient-to-r from-cyan-400 to-pink-500 text-white shadow-lg shadow-cyan-400/30"
                : "bg-[#1e293b] text-cyan-300 hover:bg-cyan-400/10 hover:shadow-md hover:shadow-cyan-400/20"
            }`}
          >
            Lesson {lesson2.id}
          </button>
        )}

        <button
          onClick={() => setActiveTab("bootcamp")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === "bootcamp"
              ? "bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-lg shadow-pink-500/30"
              : "bg-[#1e293b] text-pink-300 hover:bg-pink-500/10 hover:shadow-md hover:shadow-pink-500/20"
          }`}
        >
          Bootcamp
        </button>

        <button
          onClick={() => setActiveTab("oneonone")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === "oneonone"
              ? "bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-lg shadow-pink-500/30"
              : "bg-[#1e293b] text-pink-300 hover:bg-pink-500/10 hover:shadow-md hover:shadow-pink-500/20"
          }`}
        >
          1-on-1
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[200px]">
        {activeTab.startsWith("lesson") && (
          <div className="space-y-3">
            <h3 className="text-cyan-400 font-bold text-lg">
              {activeTab === "lesson1" ? lesson1.title : lesson2.title}
            </h3>
            <p className="text-cyan-200">
              {activeTab === "lesson1" ? lesson1.content : lesson2.content}
            </p>

            <div>
              <p className="text-cyan-200 font-bold">Cost</p>
              <p className="text-cyan-200">$200</p>
            </div>

            <div>
              <p className="text-cyan-200 font-bold">Start Date</p>
              <p className="text-cyan-200">May 1, 2025</p>
            </div>
          </div>
        )}

        {activeTab === "bootcamp" && (
          <div className="space-y-3">
            {curriculumData.map((item) => (
              <div key={item.id} className="text-cyan-200">
                <span className="text-pink-400">{item.id}.</span> {item.title}
              </div>
            ))}
          </div>
        )}

        {activeTab === "oneonone" && (
          <div className="space-y-4 text-cyan-200">
            <p>
              Personalized lessons for kids ages 10–18 to learn AI, coding, and
              digital creativity at their own pace.
            </p>
            <p>
              Whether they're into video creation, chatbots, or AI art, we
              tailor each session to match their interests and skill level.
            </p>
            <div className="text-pink-400 font-semibold">
              Fun. Flexible. Future-ready.
              <br />
              No experience needed—just curiosity!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
