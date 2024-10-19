"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";
import Image from "next/image";
import noUser from "@/public/noUser.png";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

// Define the TeacherProps type based on the Mongoose schema
interface TeacherProps {
  firstName: string;
  lastName: string;
  etablissement: string;
  image?: string; // Optional
  tags: string[];
  upvotes: string[]; // Changed to an array of user IDs
  shares: number;
  comments: {
    user: string; // User ID or name, adjust according to your needs
    commentText: string;
    createdAt: Date;
  }[];
  _id: string;
}

export default function Teacher({
  firstName,
  lastName,
  etablissement,
  image,
  tags,
  upvotes: initialUpvotes,
  shares,
  comments,
  _id,
}: TeacherProps) {
  const [upvotes, setUpvotes] = useState<string[]>(initialUpvotes);
  const { userId, isSignedIn } = useAuth(); // Use Clerk's useAuth

  const handleUpvote = async () => {
    if (!isSignedIn) return toast.error("You need to log in first to access this feature"); // Ensure the user is signed in

    // Check if the user has already upvoted
    if (upvotes.includes(userId)) {
      // If they have, remove the upvote
      setUpvotes(upvotes.filter((id) => id !== userId));
    } else {
      // If not, add the userId to the upvotes array
      setUpvotes([...upvotes, userId]);
    }

    try {
      const response = await fetch(`/api/teachers/${_id}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Pass the Clerk user ID
      });

      const data = await response.json();

      if (!data.success) {
        // Optionally handle errors here
        console.error("Upvote action failed:", data);
      }
    } catch (error) {
      console.error("Error during upvote:", error);
    }
  };

  const handleDownvote = async () => {
    if (!isSignedIn) return toast.error("You need to log in first to access this feature"); // Ensure the user is signed in

    // Check if the user has already upvoted
    if (upvotes.includes(userId)) {
      // If they have upvoted, remove their upvote
      setUpvotes(upvotes.filter((id) => id !== userId));
    }

    // Here, you can add additional logic if needed for a different downvote API call

    try {
      const response = await fetch(`/api/teachers/${_id}/downvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Pass the Clerk user ID
      });

      const data = await response.json();

      if (!data.success) {
        // Optionally handle errors here
        console.error("Downvote action failed:", data);
      }
    } catch (error) {
      console.error("Error during downvote:", error);
    }
  };

  return (
    <motion.div>
      <section className="bg-gray-100 flex flex-col items-center border border-black/5 rounded-lg overflow-hidden hover:bg-gray-200 transition w-full sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <img
          src={image || noUser.src} // Use placeholder image if none is provided
          alt={`${firstName} ${lastName}'s photo`}
          className="rounded-full transition group-hover:scale-[1.04] mt-5 h-[100px] w-[100px] object-cover group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 group-even:right-[initial] group-even:-left-40"
        />

        <div className="p-4 text-center flex flex-col h-full sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-semibold">{`${firstName} ${lastName}`}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {etablissement}
          </p>
          <ul className="flex flex-wrap mt-4 items-center justify-center gap-2">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex w-full justify-between icons items-center mt-5">
            <div className="flex justify-center items-center  dark: rounded-xl">
              <div
                className="h-[35px] green2 w-[50px] hover:bg-[#1ddc6f3d] rounded-xl cursor-pointer flex justify-center items-center"
                onClick={handleUpvote}
              >
                <MdArrowUpward className="text-xl font-bold" />
                 {upvotes.length > 0 ?  <span>{upvotes.length}</span> :<></>} {/* Display count of user IDs */}
              </div>
              <div
                onClick={handleDownvote}
                className="h-[35px] red hover:bg-[#d52b203d] w-[35px] rounded-xl cursor-pointer flex justify-center items-center"
              >
                <MdArrowDownward color="text-gray-500" className="text-xl" />
              </div>
            </div>

            <div className="h-[35px] hover:bg-[#0dcfdc3d] w-[35px]  dark: rounded-xl cursor-pointer flex justify-center items-center">
              <FaRegCommentDots className="text-xl" />
            </div>

            <div className="h-[35px] hover:bg-[#ff7a2b3d] orange w-[35px]  dark: rounded-xl cursor-pointer flex justify-center items-center">
              <RiShareLine className="text-xl" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
