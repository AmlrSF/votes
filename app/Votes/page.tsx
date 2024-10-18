import React from "react";

const Votes = () => {
  return (
    <section className=" container ">
      <div className="flex justify-between w-full items-center border-b pb-5 border-gray-900">
        <div className="text-left">
          <h1 className="font-bold text-3xl">Votes</h1>
          <p className="text-sm ">
            Upvote your favorite teacher and help highlight the best educators
            in the community!s
          </p>
        </div>
        <div
          className="group bg-gray-900 text-white px-7 py-3
         flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
        >
          new
        </div>
      </div>
      <div className="min-h-[50vh]">
        
      </div>
    </section>
  );
};

export default Votes;
