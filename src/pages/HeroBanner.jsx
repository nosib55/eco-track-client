import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const slidesData = [
  {
    id: 1,
    title: "Blue Planet — Protect Our Oceans",
    description: "Join challenges that reduce plastic waste and keep our waterways clean.",
    image: "/BluePlanet.svg",
    link: "/challenges",
  },
  {
    id: 2,
    title: "Community Clean-up Day",
    description: "Volunteer for neighborhood clean-ups and make your community greener.",
    image: "/CleanUp.svg",
    link: "/challenges",
  },
  {
    id: 3,
    title: "Tree Planting Campaign",
    description: "Plant trees, earn eco-points and help restore local habitats.",
    image: "/TreePlanting.svg",
    link: "/challenges",
  },
];

export default function HeroBannerModernFade() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slidesData.length);
    }, 5500);
  };

  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const prev = () => {
    stopAuto();
    setIndex((i) => (i - 1 + slidesData.length) % slidesData.length);
    startAuto();
  };

  const next = () => {
    stopAuto();
    setIndex((i) => (i + 1) % slidesData.length);
    startAuto();
  };

  return (
    <section
      className="relative overflow-hidden h-[460px] md:h-[620px] bg-black text-white"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      aria-label="Hero modern fade carousel"
    >
      {/* Slide Fade Layer */}
      <div className="absolute inset-0">
        {slidesData.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(.4,0,.2,1)] ${
              index === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.55)), url(${slide.image})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex items-center justify-center px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-xl transition-opacity duration-500">
            {slidesData[index].title}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm md:text-lg mb-6 transition-opacity duration-700">
            {slidesData[index].description}
          </p>

          <Link
            to={slidesData[index].link}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 transition shadow-lg"
          >
            View Challenge
          </Link>
        </div>
      </div>

      {/* Gradient Top + Bottom */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full shadow-lg z-30"
      >
        ❮
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full shadow-lg z-30"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slidesData.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === i ? "bg-green-500 scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}