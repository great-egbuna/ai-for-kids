"use client";

import { curriculumData } from "@/components/ui/CurriculumCard";
import { useEffect, useState } from "react";

// Parent Component

export const bootcampData = [
  {
    id: 1,
    title: "Intro to AI", // Added missing title
    content:
      "What is AI? Examples in daily life. Play with ChatGPT or AI games",
  },
  {
    id: 2,
    title: "Prompt Engineering",
    content: "Practice writing prompts for art, stories, and games",
  },
  {
    id: 3,
    title: "AI Art Tools",
    content:
      "Use tools like DALL·E or Canva AI to make posters and digital art",
  },
  {
    id: 4,
    title: "AI Video Creation",
    content: "Create short videos using Pika Labs, RunwayML, or Animoto",
  },
  {
    id: 5,
    title: "AI Voice + Avatars",
    content: "Develop talking avatars with Synthesia or HeyGen",
  },
  {
    id: 6,
    title: "AI Coding Basics",
    content: "Learn AI-powered logic using Scratch or block-based Python",
  },
  {
    id: 7,
    title: "Build an AI Project",
    content: "Group project: Create a chatbot or game with AI assets",
  },
  {
    id: 8,
    title: "AI Ethics & Safety",
    content: "Discuss responsible AI use and digital citizenship",
  },
  {
    id: 9,
    title: "Edit & Polish",
    content: "Add voiceovers, design thumbnails, and refine presentations",
  },
  {
    id: 10,
    title: "Presentation Day",
    content: "Showcase final AI video and coding projects",
  },
  {
    id: 11,
    title: "Bonus Workshop I",
    content: "Music generation and sound design with AI tools",
  },
  {
    id: 12,
    title: "Bonus Workshop II",
    content: "Create viral content: AI memes and social media posts",
  },
];

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
    <section className="mt-16 ">
      <h2 className="text-pink-500 text-2xl font-bold mb-8 text-center">
        Curriculum Roadmap
      </h2>
      <div className="">
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
  const [activeTab, setActiveTab] = useState("Bootcamp Lessons");

  return (
    <div className="glowing-card p-6 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-cyan-400/30 hover:border-cyan-400/50 transition-all shadow-lg max-w-[800px] mx-auto">
      {/* Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {/* <button
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
        )} */}

        <button
          onClick={() => setActiveTab("Bootcamp Lessons")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex-1 ${
            activeTab === "Bootcamp Lessons"
              ? "bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-lg shadow-pink-500/30"
              : "bg-[#1e293b] text-pink-300 hover:bg-pink-500/10 hover:shadow-md hover:shadow-pink-500/20"
          }`}
        >
          Bootcamp Lessons
        </button>

        <button
          onClick={() => setActiveTab("oneonone")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex-1 ${
            activeTab === "oneonone"
              ? "bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-lg shadow-pink-500/30"
              : "bg-[#1e293b] text-pink-300 hover:bg-pink-500/10 hover:shadow-md hover:shadow-pink-500/20"
          }`}
        >
          1-on-1 Sessions
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

        {activeTab === "Bootcamp Lessons" && (
          <div className="space-y-3">
            {bootcampData.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 justify-center text-cyan-200"
              >
                <span className="text-pink-400 font-mono min-w-[2ch] text-right">
                  {item.id}.
                </span>
                <span className="text-left">{item.title}</span>
              </div>
            ))}

            <div>
              <p className="text-cyan-200 font-bold">Cost</p>
              <p className="text-cyan-200">$350</p>
            </div>

            <div>
              <p className="text-cyan-200 font-bold">Start Date</p>
              <p className="text-cyan-200">June 1, 2025</p>
            </div>
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

            <div>
              <p className="text-cyan-200 font-bold">Cost</p>
              <p className="text-cyan-200">$65</p>
            </div>

            <div>
              <p className="text-cyan-200 font-bold">Start Date</p>
              <p className="text-cyan-200">June 1, 2025</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
