"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ExpandableCardDemo } from "@/app/content/expandable-card-demo";
import Cake from "@/components/ui/cake";
import Card from "@/components/ui/card";
import "animate.css";
import styled, { keyframes } from "styled-components";

// Animasi berkedip pada teks
const lightsAnimation = keyframes`
  0% { color: hsl(210, 70%, 80%); text-shadow: 0 0 1em hsla(210,100%,50%,0.2),0 0 0.125em hsla(210,100%,60%,0.3),-1em -0.125em 0.5em hsla(40,100%,60%,0),1em 0.125em 0.5em hsla(200,100%,60%,0);}
  25% { color: hsl(210, 90%, 90%); text-shadow: 0 0 1em hsla(210,100%,50%,0.5),0 0 0.125em hsla(210,100%,60%,0.5),-0.5em -0.125em 0.25em hsla(40,100%,60%,0.2),0.5em 0.125em 0.25em hsla(200,100%,60%,0.4);}
  50% { color: hsl(210,100%,95%); text-shadow: 0 0 1em hsla(210,100%,50%,0.5),0 0 0.125em hsla(210,100%,90%,0.5),-0.25em -0.125em 0.125em hsla(40,100%,60%,0.2),0.25em 0.125em 0.125em hsla(200,100%,60%,0.4);}
  75% { color: hsl(210,90%,90%); text-shadow: 0 0 1em hsla(210,100%,50%,0.5),0 0 0.125em hsla(210,100%,60%,0.5),0.5em -0.125em 0.25em hsla(40,100%,60%,0.2),-0.5em 0.125em 0.25em hsla(200,100%,60%,0.4);}
  100% { color: hsl(210,70%,80%); text-shadow: 0 0 1em hsla(210,100%,50%,0.2),0 0 0.125em hsla(210,100%,60%,0.3),1em -0.125em 0.5em hsla(40,100%,60%,0),-1em 0.125em 0.5em hsla(200,100%,60%,0);}
`;

// Styling teks Happy Birthday
const StyledHeading = styled.h1`
  font-size: 35px;
  font-weight: 600;
  font-family: "Fredoka", sans-serif;
  animation: ${lightsAnimation} 5s linear infinite;
  text-align: center;
  margin: 0.25rem 0;

  span {
    &.highlight { color: #F5F7F8; }
    &.favorite { color: #4a90e2; }
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

// Wrapper responsive untuk ExpandableCard
const ResponsiveExpandableWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 640px) {
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.25rem;
  }
`;

// Wrapper scrollable untuk versi mobile
const MobileScrollableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: 100vh; /* Membatasi tinggi layar untuk scroll */
  padding-bottom: 2rem;

  @media (min-width: 641px) {
    overflow: visible; /* Desktop tidak perlu scroll */
    max-height: unset;
  }
`;

export default function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision>
      <MobileScrollableWrapper>
        {/* Animasi teks Happy Birthday */}
        <div className="animate__animated animate__jackInTheBox text-center mb-6 sm:mb-4">
          <StyledHeading>
            <span className="favorite">Happy Birthday</span>
          </StyledHeading>
          <StyledHeading>
            <span className="highlight">Veyyrenn!!!</span>
          </StyledHeading>
        </div>

        {/* Expandable Card responsive */}
        <ResponsiveExpandableWrapper>
          <ExpandableCardDemo />
        </ResponsiveExpandableWrapper>

        {/* Cake */}
        <div className="z-10 mt-20 sm:mt-4 sm:absolute sm:top-10 sm:left-1/2 sm:-translate-x-1/2">
          <Cake />
        </div>

        {/* Card */}
        <div className="mt-8 sm:mt-[300px] md:mt-[300px] z-0 w-full flex justify-center">
          <Card />
        </div>
      </MobileScrollableWrapper>
    </BackgroundBeamsWithCollision>
  );
}