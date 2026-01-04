import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const slidesData = [
  {
    id: 1,
    title: "Blue Planet — Protect Our Oceans",
    description:
      "Join challenges that reduce plastic waste and keep our waterways clean.",
    image: "/BluePlanet.svg",
    link: "/challenges",
  },
  {
    id: 2,
    title: "Community Clean-up Day",
    description:
      "Volunteer for neighborhood clean-ups and make your community greener.",
    image: "/CleanUp.svg",
    link: "/challenges",
  },
  {
    id: 3,
    title: "Tree Planting Campaign",
    description:
      "Plant trees, earn eco-points and help restore local habitats.",
    image: "/TreePlanting.svg",
    link: "/challenges",
  },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAuto();
    window.addEventListener("keydown", handleKey);

    return () => {
      stopAuto();
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slidesData.length);
    }, 6000);
  };

  const stopAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
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

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <section
      className="relative overflow-hidden h-[60vh] md:h-[70vh] bg-black text-white"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      aria-label="Hero modern fade carousel"
    >
      {/* Slide Fade Layer */}
      <div className="absolute inset-0">
        {slidesData.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              index === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(0,0,0,0.65),
                    rgba(0,0,0,0.65)
                  ),
                  url(${slide.image})
                `,
              }}
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex items-center justify-center px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-xl">
            {slidesData[index].title}
          </h2>

          <p className="text-white/85 max-w-xl mx-auto text-sm md:text-lg mb-8">
            {slidesData[index].description}
          </p>

          <Link
            to={slidesData[index].link}
            className="inline-flex items-center gap-2
                       px-8 py-3 rounded-full
                       bg-green-600 hover:bg-green-500
                       transition shadow-lg"
          >
            View Challenge
          </Link>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/70 via-transparent to-black/80" />

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2
                   bg-white/20 hover:bg-white/30
                   backdrop-blur-md p-3 rounded-full shadow-lg z-30"
      >
        ❮
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2
                   bg-white/20 hover:bg-white/30
                   backdrop-blur-md p-3 rounded-full shadow-lg z-30"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slidesData.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === i ? "bg-green-500 scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/60">
        ↓ Scroll to explore
      </div>
    </section>
  );
}
