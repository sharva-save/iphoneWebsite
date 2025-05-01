import { Html } from "@react-three/drei";
import React from "react";

const Loader = () => {
  return (
    <Html center>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full border-4 border-white flex justify-center items-center text-white text-sm">
          Loading...
        </div>
      </div>
    </Html>
  );
};

export default Loader;
