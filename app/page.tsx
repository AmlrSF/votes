"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <section
        id="home"
        className="mb-28 max-w-[50rem] min-h-[90vh] text-center sm:mb-0 scroll-mt-[100rem]"
      >
        <div className="flex items-center justify-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=368&h=368&q=100"
                alt="Ricardo portrait"
                width="192"
                height="192"
                quality="95"
                priority={true}
                className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
              />
            </motion.div>

            <motion.span
              className="absolute bottom-0 right-0 text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 125,
                delay: 0.1,
                duration: 0.7,
              }}
            >
              👋
            </motion.span>
          </div>
        </div>

        <motion.h1
          className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-normal">
            <span className="font-bold underline"> TeachersHub</span> is a
            Next.js platform where students can rate and comment on university
            professors. Users can upvote, downvote, and engage with professors
            profiles based on their teaching expertise
          </span>
          .
        </motion.h1>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
          }}
        >
          <Link
            href="/Votes"
            className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          >
            Start Voting
          </Link>
          
          
        </motion.div>
      </section>
    </main>
  );
}
