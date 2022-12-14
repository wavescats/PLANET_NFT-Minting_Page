import { useGLTF } from "@react-three/drei";
import { PrimitiveProps, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";

export type PlanetName =
  | "sun"
  | "mars"
  | "mercury"
  | "venus"
  | "earth"
  | "saturn"
  | "jupiter"
  | "uranus"
  | "neptune"
  | null;

interface PlanetProps extends Partial<PrimitiveProps> {
  name: PlanetName;
}

export const Planet = ({ name, ...PrimitiveProps }: PlanetProps) => {
  const planetRef = useRef<any>();

  const { scene: sun } = useGLTF("https://space.coinyou.io/3d-objects/sun.glb");
  const { scene: mars } = useGLTF(
    "https://space.coinyou.io/3d-objects/mars.glb"
  );
  const { scene: mercury } = useGLTF(
    "https://space.coinyou.io/3d-objects/mercury.glb"
  );
  const { scene: venus } = useGLTF(
    "https://space.coinyou.io/3d-objects/venus.glb"
  );
  const { scene: earth } = useGLTF(
    "https://space.coinyou.io/3d-objects/earth.glb"
  );
  const { scene: saturn } = useGLTF(
    "https://space.coinyou.io/3d-objects/saturn.glb"
  );
  const { scene: jupiter } = useGLTF(
    "https://space.coinyou.io/3d-objects/jupiter.glb"
  );
  const { scene: uranus } = useGLTF(
    "https://space.coinyou.io/3d-objects/uranus.glb"
  );
  const { scene: neptune } = useGLTF(
    "https://space.coinyou.io/3d-objects/neptune.glb"
  );

  const scene = useMemo(
    () =>
      name
        ? {
            sun,
            mars,
            mercury,
            venus,
            earth,
            saturn,
            jupiter,
            uranus,
            neptune,
          }[name]
        : null,
    [sun, mars, mercury, venus, earth, saturn, jupiter, uranus, neptune, name]
    // 바뀐값이 없으면 계속 재사용 하겠다는 의미
  );

  const copiedScene = useMemo(() => (scene ? scene.clone() : null), [scene]);
  // 3D 라이브러리 오류 👉 scene변수 (useMemo)를 재사용하면 오류가 나서 랜더링을 할때마다 clone해서 뿌려주는 방식

  useFrame(() => {
    // 매 프레임마다 실행
    if (planetRef.current) {
      // primitive를 참조
      planetRef.current.rotation.x = 3;
      planetRef.current.rotation.y += 0.005;
      planetRef.current.rotation.z += 0.005;
    }
  });

  return copiedScene !== null ? (
    <group key="planet" dispose={null}>
      <primitive
        ref={planetRef}
        object={copiedScene.children[copiedScene.children.length - 1]}
        {...PrimitiveProps}
      />
    </group>
  ) : null;
};
