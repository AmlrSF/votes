"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";
// Define the TeacherProps type based on the Mongoose schema
interface TeacherProps {
  firstName: string;
  lastName: string;
  etablismment: string;
  image?: string; // Optional
  tags: string[];
  upvotes: number;
  shares: number;
  comments: {
    user: string; // User ID or name, adjust according to your needs
    commentText: string;
    createdAt: Date;
  }[];
}

export default function Teacher({
  firstName,
  lastName,
  etablismment,
  image,
  tags,
  upvotes,
  shares,
  comments,
}: TeacherProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section
        className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg 
      overflow-hidden relative  hover:bg-gray-200 transition"
      >
        <div className="  p-4 flex flex-col justify-between items-center gap-2">
          <h3 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h3>
          <p className="mt-1 leading-relaxed text-gray-700 dark:text-white/70">
            {etablismment}
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

            <div className="flex justify-center items-center bg-[#cecece] rounded-xl">
              <div className="h-[35px] green2  w-[35px] hover:bg-[#1ddc6f3d]
                rounded-xl cursor-pointer flex justify-center  items-center">
                <MdArrowUpward
               
                className=" text-xl " />
                <span className="">{upvotes}</span>
              </div>
              <div className="h-[35px] red hover:bg-[#d52b203d] w-[35px]   rounded-xl cursor-pointer flex justify-center items-center">
                <MdArrowDownward color="text-gray-500" className=" text-xl" />
              </div>
            </div>

            <div className="h-[35px] hover:bg-[#0dcfdc3d] w-[35px]   bg-[#cecece]
             rounded-xl cursor-pointer flex green justify-center items-center">
              <FaRegCommentDots className=" text-xl" />
            </div>

            <div className="h-[35px]  hover:bg-[#ff7a2b3d] w-[35px]  bg-[#cecece] rounded-xl cursor-pointer flex justify-center items-center">
              <RiShareLine className=" text-xl" />
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
}
