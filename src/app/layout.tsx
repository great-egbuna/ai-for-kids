import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/useAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 4 KIDS",
  description: `Welcome to AI Coding for Kids—where young creators ages 10–18 learn
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
            future, one kid at a time.`,

  openGraph: {
    title: "AI 4 KIDS",
    description: `Welcome to AI Coding for Kids—where young creators ages 10–18 learn
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
            future, one kid at a time.`,
    images: [
      {
        url: "/seo.jpg", // path relative to /public
        width: 1200,
        height: 630,
        alt: "AI 4 KIDS",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
