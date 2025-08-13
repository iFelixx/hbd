"use client";

import React from "react";
import styled from "styled-components";
import { Righteous } from "next/font/google";
import { useRouter } from "next/navigation";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
});

const Button: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/content");
  };

  return (
    <StyledWrapper className={righteous.className}>
      <button className="btn" onClick={handleClick}>
        <div>START THE JOURNEY</div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          height="25px"
          width="25px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2}
            stroke="white"
            d="M11.6801 14.62L14.2401 12.06L11.6801 9.5"
          />
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2}
            stroke="white"
            d="M4 12.0601H14.17"
          />
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2}
            stroke="white"
            d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20"
          />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    --color-gradient: linear-gradient(90deg, #6366f1, #a855f7);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    border: none;
    background-color: transparent;
    padding: 0;
  }

  .btn div {
    letter-spacing: 2px;
    font-weight: bold;
    background: var(--color-gradient);
    border-radius: 2rem;
    color: white;
    padding: 1rem;
  }

  .btn::before {
    content: "";
    z-index: -1;
    background: var(--color-gradient);
    border: 2px solid white;
    border-radius: 2rem;
    width: 110%;
    height: 100%;
    position: absolute;
    transform: rotate(10deg);
    transition: 0.5s;
    opacity: 0.2;
  }

  .btn:hover {
    cursor: pointer;
    filter: brightness(1.2);
    transform: scale(1.1);
  }

  .btn:hover::before {
    transform: rotate(0deg);
    opacity: 1;
  }

  .btn svg {
    transform: translateX(-200%) scaleX(0);
    transition: transform 0.5s ease, opacity 0.5s ease;
    opacity: 0;
  }

  .btn:hover svg {
    transform: translateX(0%) scaleX(1);
    opacity: 1;
  }

  .btn:active {
    filter: brightness(1.4);
  }
`;

export default Button;