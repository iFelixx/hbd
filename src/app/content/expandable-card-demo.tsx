"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/components/hooks/use-outside-click";

interface FontStyles {
  titleFont: {
    family: string;
    size: string;
    weight: string;
    color: string;
  };

  descriptionFont: {
    family: string;
    size: string;
    weight: string;
    color: string;
  };

  contentFont: {
    family: string;
    size: string;
    weight: string;
    color: string;
  };

  buttonFont: {
    family: string;
    size: string;
    weight: string;
  };
}

const defaultFontStyles: FontStyles = {
  titleFont: {
    family: "Fredoka",
    size: "18px",
    weight: "600",
    color: "#bf2ef0",
  },

  descriptionFont: {
    family: "Fredoka",
    size: "17px",
    weight: "500",
    color: "#c4b7ee",
  },

  contentFont: {
    family: "Fredoka",
    size: "16px",
    weight: "500",
    color: "#c4b7ee",
  },
  
  buttonFont: {
    family: "Fredoka",
    size: "17px",
    weight: "500",
  },
};

const buttonStyles = {
  backgroundColor: "#bf2ef0",
  textColor: "#c1fcf5",
  hoverBackgroundColor: "#c1fcf5",
  hoverTextColor: "#bf2ef0",
};

interface ExpandableCardDemoProps {
  fontStyles?: FontStyles;
  onModalStateChange?: (isOpen: boolean) => void;
}

export function ExpandableCardDemo({ fontStyles = defaultFontStyles, onModalStateChange }: ExpandableCardDemoProps) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
        onModalStateChange?.(false);
      }
    }

    if (active && typeof active === "object") {
      onModalStateChange?.(true);
      if (modalRef.current && window.innerWidth < 768) {
        modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      onModalStateChange?.(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onModalStateChange]);

  const handleCloseModal = () => {
    setActive(null);
    onModalStateChange?.(false);
  };

  useOutsideClick(ref, handleCloseModal);

  const getTitleStyle = () => ({
    fontFamily: fontStyles.titleFont.family,
    fontSize: fontStyles.titleFont.size,
    fontWeight: fontStyles.titleFont.weight,
    color:fontStyles.titleFont.color
  });

  const getDescriptionStyle = () => ({
    fontFamily: fontStyles.descriptionFont.family,
    fontSize: fontStyles.descriptionFont.size,
    fontWeight: fontStyles.descriptionFont.weight,
    color:fontStyles.descriptionFont.color
  });

  const getContentStyle = () => ({
    fontFamily: fontStyles.contentFont.family,
    fontSize: fontStyles.contentFont.size,
    fontWeight: fontStyles.contentFont.weight,
    color:fontStyles.contentFont.color
  });

  const getButtonStyle = (isHover: boolean) => ({
    fontFamily: fontStyles.buttonFont.family,
    fontSize: fontStyles.buttonFont.size,
    fontWeight: fontStyles.buttonFont.weight,
    backgroundColor: isHover ? buttonStyles.hoverBackgroundColor : buttonStyles.backgroundColor,
    color: isHover ? buttonStyles.hoverTextColor : buttonStyles.textColor,
  });

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
              className="flex absolute top-4 right-15 items-center justify-center rounded-full h-12 w-12 shadow-lg z-[200]"
              style={{ backgroundColor: "#bf2ef0" }}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={modalRef}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-56 sm:h-80 md:h-96 object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex flex-col md:flex-row justify-between items-start p-4 gap-4">
                  <div className="w-full md:w-auto">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      style={getTitleStyle()}
                      className="text-neutral-800 dark:text-neutral-200 text-center md:text-left mb-2"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      style={getDescriptionStyle()}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    target="_blank"
                    style={getButtonStyle(false)}
                    className="px-4 py-3 rounded-full w-full md:w-auto text-center"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={getContentStyle()}
                    className="text-neutral-600 dark:text-neutral-400 h-40 md:h-[150px] pb-10 flex flex-col items-start gap-4 overflow-y-auto [mask:linear-gradient(to_bottom,white,white,transparent)]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => {setActive(card); onModalStateChange?.(true);}}
            className="p-4 flex flex-col sm:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col sm:flex-row items-center sm:items-start">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 sm:h-20 sm:w-20 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="text-center sm:text-left">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  style={getTitleStyle()}
                  className="text-neutral-800 dark:text-neutral-200 mb-1"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  style={getDescriptionStyle()}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              style={getButtonStyle(false)}
              className="px-4 py-2 rounded-full mt-2 sm:mt-0 w-[170px] sm:w-auto"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = buttonStyles.hoverBackgroundColor;
                e.currentTarget.style.color = buttonStyles.hoverTextColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor;
                e.currentTarget.style.color = buttonStyles.textColor;
              }}
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-[#c1fcf5]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Ucapan Spesial",
    title: "Happy Birthday 🎉",
    src: "/images/pic.jpg",
    ctaText: "Open",
    content: () => {
      return (
        <p>
          Hallow hallowww, karena hari ini adalah hari spesial lo gw mo bilang
          HAPPY BIRTHDAY VEREN AGCLEORIVA PUTRI!!! CIE CIE UDAH TAMBAH TUA NIHHH.
          
          <br />
          <br />
          Semoga semua doa dan harapan terbaik menyertai kehidupan lu yakk!!
          Terus juga semoga panjang umur, sehat selalu, dan penuh kebahagiaan.

          <br />
          <br />
          Oh ya gw juga mo bilang, gw berharap dengan bertambah dewasa nya seekor veren,
          lu semakin bisa terus menghargai diri lu, nggak ragu buat mengejar hal-hal 
          yang bikin lu bahagia yakkk, dan yang paling penting jangan pernah menyerah yakk
          kalo cape inget istirahat okayyy!!
          <br />
          <br />

          Sekali lagi gw ucapin 

          <br />
          <br />
          🎂 Selamat ulang tahun, semoga semua impian lu segera terwujud 🎂
        </p>
      );
    },
  },  
];