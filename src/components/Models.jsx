import { useGSAP } from "@gsap/react";
import React, { useState } from "react";
import ModelVies from "./ModelVies";
import { yellowImg } from "../utils";
import { useRef, useEffect } from "react";
import { View } from "@react-three/drei";

import { models, sizes } from "../constants";
import * as THREE from "three";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { animateWithGsapTimeline } from "../utils/animation";

const Model = () => {
  const [size, setsize] = useState("small");

  const [model, setModel] =useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  });

  //cammera control

  const cameraControlsSmall = useRef();
  const cameraControlsLarge = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [smallRotation, setsmallRotation] = useState(0);
  const [largeRotation, setlargeRotation] = useState(0);

  const tl = gsap.timeline();
  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", {
      y: 0,
      opacity: 1,
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take A closer look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div
            className="w-full h-[75vh] md:h-[90vh]
            overflow-hidden relative"
          >
            <ModelVies
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlsSmall}
              setRotationSize={setsmallRotation}
              item={model}
              size={size}
            />

            <ModelVies
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlsLarge}
              setRotationSize={setlargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex items-center justify-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-4xl p mx-2 cursor-pointer"
                    style={{
                      backgroundColor: item.color[0],
                    }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setsize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
