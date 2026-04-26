import React from "react";
import BannerImage from "../BannerImg.jpg";

function Banner() {
  return (
    <div className="relative mt-[60px] w-full h-[70vh] md:h-[60vh] lg:h-[70vh] shadow-md">
      {/* Banner Image */}
      <img
        src={BannerImage}
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Gradient Overlay & Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent flex flex-col justify-end p-10 text-white">
        <h1 className="text-4xl font-bold">Interstellar</h1>
        <p className="mt-2 text-xl max-w-md tracking-wide text-white/80">
          Mankind's next step will be our greatest.
        </p>
      </div>
    </div>
  );
}

export default Banner;
