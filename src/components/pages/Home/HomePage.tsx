"use client";
import { generalService } from "@/app/services/admin.service";
import { CurriculumSection } from "./CurriculumList";
import "./HomePage.css";
import { EmailListForm } from "./WaitList";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const waitlistRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [content, setContent] = useState({ heroTitle: "", aboutContent: "" });
  const [loading, setLoading] = useState(false);
  const handleScroll = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const loadContent = async () => {
      const data: any = await generalService.getSiteContent();
      setContent(data);
    };
    loadContent();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1e293b] text-white font-inter  pb-[78px]"
      style={{ textShadow: "0 0 2px #00ffff" }}
    >
      <header className="text-center py-6">
        <nav className="flex justify-center gap-6 text-pink-500 font-bold text-sm md:text-base">
          <a
            href="#curriculum"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("curriculum")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-cyan-400 transition"
          >
            Curriculum
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-cyan-400 transition"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScroll(contactRef as any);
            }}
            className="hover:text-cyan-400 transition"
          >
            Contact
          </a>
        </nav>
      </header>

      <main className="text-center px-4 md:px-12">
        <h1
          className="text-5xl md:text-7xl font-extrabold text-cyan-400 tracking-wide mt-10"
          style={{ textShadow: "0 0 4px #00ffff" }}
        >
          {content?.heroTitle ||
            `
          AI 4 KIDS
            `}
        </h1>
        <p
          className="mt-4 text-pink-500 text-lg md:text-2xl font-semibold"
          style={{ textShadow: "0 0 2px #ff00ff" }}
        >
          Teaching AI to Kids in a Fun and Engaging Way
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => handleScroll(waitlistRef as any)}
            className="glow-button border border-cyan-400 text-cyan-400 px-6 py-2 rounded-md hover:bg-cyan-400 hover:text-black transition"
          >
            Join Waitlist
          </button>
          <button
            onClick={() => handleScroll(contactRef as any)}
            className="glow-button border border-cyan-400 text-cyan-400 px-6 py-2 rounded-md hover:bg-cyan-400 hover:text-black transition"
          >
            Contact
          </button>
        </div>

        <div id="curriculum">
          <CurriculumSection />
        </div>

        <section id="about" className="mt-16  md:px-20 text-center">
          <h2
            className="text-pink-500 text-xl md:text-2xl font-bold mb-4"
            style={{ textShadow: "0 0 2px #ff00ff" }}
          >
            About AI Coding for Kids
          </h2>
          <p className="text-cyan-200 md:max-w-2xl mx-auto text-justify leading-[30px]">
            {content?.aboutContent ||
              `
            
             Welcome to AI Coding for Kids—where young creators ages 10–18 learn
            how to harness the power of artificial intelligence through fun,
            hands-on lessons. Whether your child joins our interactive group
            bootcamp or signs up for personalized 1-on-1 sessions, they’ll
            explore AI tools like video generators, chatbots, and coding
            platforms in a way that’s engaging, creative, and
            confidence-boosting. Our 8-week bootcamp is perfect for kids who
            love collaborating, building cool projects, and learning alongside
            new friends. For those who prefer to go at their own pace, our
            private sessions offer tailored guidance based on their
            interests—from AI art and avatars to building their own apps. No
            experience needed—just imagination and curiosity. Let’s build the
            future, one kid at a time.`}
          </p>
        </section>

        <section ref={waitlistRef} id="waitlist" className="mt-16">
          <h2
            className="text-pink-500 text-xl md:text-2xl font-bold mb-4 text-center"
            style={{ textShadow: "0 0 2px #ff00ff" }}
          >
            Join Our Waitlist
          </h2>
          <EmailListForm />
        </section>

        <section
          ref={contactRef}
          id="contact"
          className="mt-16  md:px-20 text-center"
        >
          <div className="max-w-4xl mx-auto py-6 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-cyan-400/30 shadow-lg shadow-cyan-400/20 ">
            <h2
              className="text-pink-500 text-xl md:text-2xl font-bold mb-8"
              style={{ textShadow: "0 0 2px #ff00ff" }}
            >
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-cyan-200">
              <div>
                <h3 className="text-pink-400 mb-4">Email</h3>
                <a
                  href="mailto:hello@ai4kids.com"
                  className="hover:text-cyan-400 transition-colors"
                >
                  techchisa@gmail.com
                </a>
              </div>
              <div>
                <h3 className="text-pink-400 mb-4">Phone</h3>
                <a
                  href="tel:+1234567890"
                  className="hover:text-cyan-400 transition-colors"
                >
                  +1 (919) 749-0023
                </a>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-pink-400 mb-4">Social Media</h3>
                <div className="flex justify-center gap-6">
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
