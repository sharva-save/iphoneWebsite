import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCausel from "./VideoCausel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc-700"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-end">
          <h1 id="title" className="section-heading">
            Get the hightlights.
          </h1>
          <div className="flex flex-wrap item-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>

            <p className="link">
              Watch the Event
              <img src={rightImg} alt="watch" className="ml-2" />
            </p>
          </div>
        </div>
      </div>
      <div>
        <VideoCausel />
      </div>
    </section>
  );
};

export default Highlights;
