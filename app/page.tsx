import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Compare } from "@/components/ui/compare";

import cityAfter from "./assets/imgs/cityAfter.png";
import cityBefore from "./assets/imgs/cityBefore.png";
import Footer from "@/components/ui/footer";

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
      <Footer />
    </>
  );
}
