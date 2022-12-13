import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { CanvasHTMLAttributes } from "react";

export const Space = (props: CanvasHTMLAttributes<any>) => {
  return (
    <Canvas onCreated={state => state.gl.setClearColor("#111")} {...props}>
      <Stars />
    </Canvas>
  );
};
