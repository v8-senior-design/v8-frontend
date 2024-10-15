import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Compare } from "@/components/ui/compare";

import cityAfter from "./assets/imgs/cityAfter.png";
import cityBefore from "./assets/imgs/cityBefore.png";

export default function Home() {
  return (
    <>
      <main
        className="flex flex-col justify-center items-center"
        style={{ backgroundColor: "#FDFDFD" }}
      >
        <BackgroundBeamsWithCollision className="mb-15">
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            What&apos;s cooler than cutting emissions? <br></br>
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-green-500 via-lime-500 to-yellow-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">Powering a greener future with V8.</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 py-4">
                <span className="">Powering a greener future with V8.</span>
              </div>
            </div>
          </h2>
        </BackgroundBeamsWithCollision>
        <Link href="/public/login">
          <Button className="absolute top-5 right-5">Login</Button>
        </Link>
        <TextGenerateEffect
          className="lg:mx-20 sm:mx-10 text-center"
          duration={0.1}
          filter={true}
          words="“V8 helps you track and reduce your carbon footprint by logging daily activities and habits. It empowers you to make eco-friendly choices for a sustainable future. With real-time insights and simple recommendations, V8 makes lowering your environmental impact easy.”"
        />
        <div className="flex flex-col md:flex-row items-center mt-20">
          <div className="w-full md:w-1/3 p-4 text-center">
            <TextGenerateEffect
              className="lg:mx-20 sm:mx-10 text-center"
              duration={0.5}
              filter={true}
              words="A city full of life—clean air, green parks, and a future everyone can protect and enjoy together with care."
            />
          </div>
          <Compare
            firstImage={cityBefore.src}
            secondImage={cityAfter.src}
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[250px] w-[200px] md:h-[500px] md:w-[500px] mt-5"
            slideMode="hover"
          />
          <div className="w-full md:w-1/3 p-4 text-center">
            <TextGenerateEffect
              className="lg:mx-20 sm:mx-10 text-center"
              duration={0.5}
              filter={true}
              words="A city choked by pollution—nature fading away, and a future that feels hopeless. With V8, you can take action today."
            />
          </div>
        </div>
      </main>
      <footer
        className="text-white py-6 mt-10"
        style={{ backgroundColor: "#101827" }}
      >
        <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center text-center md:text-left">
          {/* Left Section - Logo or Name */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">V8</h2>
          </div>

          {/* Middle Section - Links */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; V8 2024</p>
          </div>

          {/* Right Section - Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 2a4.48 4.48 0 00-4.47 4.49c0 .35.04.7.11 1.03A12.94 12.94 0 013 4.03s-4 9 5 13.25c-1.93.53-4.12.2-6.1-1.23C8 22 14 20 16 14.75A12.34 12.34 0 0023 3z"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 2h4v4h-4v4h4v4h-4v4h-4v-4H8v4H4v-4H0v-4h4V6H0V2h4V0h4v4h4V0h4v4z"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.945 4.055A10.9 10.9 0 0112 12a10.9 10.9 0 01-8.945-7.945C.683 7.487.684 16.513 12 22c10.316-5.487 10.317-14.513 8.945-17.945z"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
