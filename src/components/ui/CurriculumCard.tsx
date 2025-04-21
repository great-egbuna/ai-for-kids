"use client";

import { useState } from "react";

export const curriculumData = [
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

export const CurriculumCard = ({ lessons }: { lessons: any }) => {
  const [activeTab, setActiveTab] = useState("lesson1");

  return (
    <div className="glowing-card p-6 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-cyan-400/30 hover:border-cyan-400/50 transition-all shadow-lg">
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setActiveTab("lesson1")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "lesson1"
              ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
              : "bg-[#1e293b] text-cyan-200 hover:bg-cyan-400/10"
          }`}
        >
          Lesson 1
        </button>
        <button
          onClick={() => setActiveTab("lesson2")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "lesson2"
              ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
              : "bg-[#1e293b] text-cyan-200 hover:bg-cyan-400/10"
          }`}
        >
          Lesson 2
        </button>
        <button
          onClick={() => setActiveTab("bootcamp")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "bootcamp"
              ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
              : "bg-[#1e293b] text-pink-300 hover:bg-pink-500/10"
          }`}
        >
          Bootcamp
        </button>
        <button
          onClick={() => setActiveTab("oneonone")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "oneonone"
              ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
              : "bg-[#1e293b] text-pink-300 hover:bg-pink-500/10"
          }`}
        >
          1-on-1
        </button>
      </div>

      <div className="min-h-[200px]">
        {activeTab === "lesson1" && (
          <div className="space-y-3">
            <h3 className="text-cyan-400 font-bold text-lg">
              {lessons[0]?.id}. {lessons[0]?.title}
            </h3>
            <p className="text-cyan-200">{lessons[0]?.content}</p>
          </div>
        )}

        {activeTab === "lesson2" && (
          <div className="space-y-3">
            <h3 className="text-cyan-400 font-bold text-lg">
              {lessons[1]?.id}. {lessons[1]?.title}
            </h3>
            <p className="text-cyan-200">{lessons[1]?.content}</p>
          </div>
        )}

        {activeTab === "bootcamp" && (
          <div className="space-y-3">
            {curriculumData.map((item) => (
              <div key={item.id} className="text-cyan-200">
                <span className="text-pink-400">{item?.id}.</span> {item?.title}
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

// Create pairs of lessons
