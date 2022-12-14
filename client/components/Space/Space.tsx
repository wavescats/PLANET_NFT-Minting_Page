// import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import React, { CanvasHTMLAttributes } from "react";

// SSR 지원을 안하는 경우는 SSR 비활성화 시켜주기
const Stars = dynamic(
  () => import("@react-three/drei").then(mod => mod.Stars),
  {
    ssr: false,
  }
);

const Planet = dynamic(() => import("../Planet").then(mod => mod.Planet), {
  ssr: false,
});

export const Space = (props: CanvasHTMLAttributes<any>) => {
  return (
    <Canvas onCreated={state => state.gl.setClearColor("#111")} {...props}>
      <Stars />
      <Planet name="earth" position={[0, 1.5, 0]} />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[100, 100, 60]}
        distence={200}
        intensity={10}
        angle={1}
      />
    </Canvas>
  );
};
