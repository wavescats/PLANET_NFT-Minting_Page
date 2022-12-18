import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import React, { CanvasHTMLAttributes, useContext } from "react";
import { SpaceContext } from "../../contexts";
import { SpaceStar } from "../SpaceStar";

// SSR 지원을 안하는 경우는 SSR 비활성화 시켜주기
const Planet = dynamic(() => import("../Planet").then(mod => mod.Planet), {
  ssr: false,
});

export const Space = (props: CanvasHTMLAttributes<any>) => {
  const { planet, showPlanet } = useContext(SpaceContext);

  return (
    <Canvas onCreated={state => state.gl.setClearColor("#111")} {...props}>
      <SpaceStar />
      <Planet name={planet} position={[0, 1.5, 0]} />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[100, 100, 1]}
        distence={200}
        intensity={3}
        angle={1}
      />
    </Canvas>
  );
};
