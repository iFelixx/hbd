import React, { useState, useEffect, useRef } from "react";
import { Fredoka } from "next/font/google";

// Import Fredoka via next/font
const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface FontStyles {
  titleFont: { size: string; weight: string; color: string };
  artistFont: { size: string; weight: string; color: string };
  iconFont: { size: string; weight: string; color: string };
  volFont: { color: string };
  vol2Font: { size: string; weight: string; color: string };
}

const defaultFontStyles: FontStyles = {
  titleFont: { size: "18px", weight: "600", color: "#8576ff" },
  artistFont: { size: "17px", weight: "500", color: "#c4b7ee" },
  iconFont: { size: "14px", weight: "500", color: "#c4b7ee" }, // sedikit kecil di mobile
  volFont: { color: "#c4b7ee" },
  vol2Font: { size: "14px", weight: "500", color: "#c4b7ee" }, // lebih kecil di mobile
};

interface CardProps {
  fontStyles?: FontStyles;
}

const Card = ({ fontStyles = defaultFontStyles }: CardProps) => {
  const [isLoved, setIsLoved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/ghour.mp3");
      audioRef.current.volume = 0.5;
      audioRef.current.loop = false;
      audioRef.current.preload = "auto";
      audioRef.current.load();
    }

    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(Math.floor(audio!.currentTime));
    const updateDuration = () => setDuration(Math.floor(audio!.duration));

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handlePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.error("User interaction required to play audio", err);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto"> {/* max-w lebih kecil */}
      <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
        
        {/* Info Lagu */}
        <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row items-center sm:items-start">
          <div className="flex-shrink-0 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] overflow-hidden rounded-lg">
            <img
              src="images/Music2.jpg"
              alt="Music Icon"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h3
              style={{
                fontFamily: fredoka.style.fontFamily,
                fontSize: "16px", // mobile lebih kecil
                fontWeight: fontStyles.titleFont.weight,
                color: fontStyles.titleFont.color,
              }}
              className="mb-1"
            >
              Golden Hour
            </h3>
            <p
              style={{
                fontFamily: fredoka.style.fontFamily,
                fontSize: "14px", // mobile lebih kecil
                fontWeight: fontStyles.artistFont.weight,
                color: fontStyles.artistFont.color,
              }}
            >
              JVKE
            </p>
          </div>
        </div>

        {/* Kontrol */}
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto mt-3 sm:mt-0">
          <div className="flex items-center gap-3">
            <svg
              onClick={() => setIsLoved(!isLoved)}
              className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
              fill={isLoved ? "#f94848" : "none"}
              stroke={isLoved ? "#f94848" : "#f94848"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <svg
              onClick={handlePlayPause}
              className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
              fill="none"
              stroke={isPlaying ? "#f94848" : "#f94848"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isPlaying ? (
                <>
                  <rect x="5" y="3" width="4" height="18" />
                  <rect x="15" y="3" width="4" height="18" />
                </>
              ) : (
                <polygon points="5,3 19,12 5,21" />
              )}
            </svg>
          </div>

          {/* Volume */}
          <div className="w-full sm:w-[180px] flex items-center gap-2">
            <svg
              className="h-6 w-6 sm:h-8 sm:w-8"
              fill="none"
              stroke={fontStyles.volFont.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            </svg>
            <div className="w-full">
              <div className="relative h-1 bg-neutral-200 rounded overflow-hidden dark:bg-neutral-800">
                <div className="absolute left-0 top-0 h-full bg-[#8576ff] w-1/2" />
              </div>
            </div>
            <span
              style={{
                fontFamily: fredoka.style.fontFamily,
                fontSize: "12px", // mobile kecil
                fontWeight: fontStyles.vol2Font.weight,
                color: fontStyles.vol2Font.color,
              }}
              className="shrink-0"
            >
              50%
            </span>
          </div>

          {/* Waktu */}
          <div className="flex justify-between w-full sm:w-[180px] text-xs sm:text-sm">
            <span
              style={{
                fontFamily: fredoka.style.fontFamily,
                fontSize: fontStyles.iconFont.size,
                fontWeight: fontStyles.iconFont.weight,
                color: fontStyles.iconFont.color,
              }}
            >
              {formatTime(currentTime)}
            </span>
            <span
              style={{
                fontFamily: fredoka.style.fontFamily,
                fontSize: fontStyles.iconFont.size,
                fontWeight: fontStyles.iconFont.weight,
                color: fontStyles.iconFont.color,
              }}
            >
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;