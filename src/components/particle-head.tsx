"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/addons";
import * as THREE from "three";

interface MousePosition {
  x: number;
  y: number;
}

interface SceneProps {
  mouseRef: React.RefObject<MousePosition>;
}

const ParticleHead: React.FC = () => {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });

  // const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
  //   const windowHalfX = window.innerWidth / 2;
  //   const windowHalfY = window.innerHeight / 2;
  //   mouseRef.current = {
  //     x: (event.clientX - windowHalfX) / 2,
  //     y: (event.clientY - windowHalfY) / 2,
  //   };
  // };

  useEffect(() => {
    const handleMouseMoveEff = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseRef.current = {
        x: ((event.clientX - windowHalfX) / 2) * -1,
        y: ((event.clientY - windowHalfY) / 2) * -1,
      };
      // Do something with coordinates
    };
    const body = document.querySelector("body");

    setTimeout(() => {
      const windowHalfX = window.innerWidth / 5;
      const windowHalfY = (window.innerHeight / 5) * -1;
      mouseRef.current = {
        x: windowHalfX,
        y: windowHalfY,
      };
    }, 2000);

    body?.addEventListener("mousemove", handleMouseMoveEff);
    console.log({ body });
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveEff);
    };
  }, []);
  // if (typeof window == "undefined") {
  //   return <div><div></div></div>;
  // }

  

  return (
    <div
      // style={{ width: "100", height: "100vh" }}
      className="w-[300px] h-[322px] lg:w-[740px] lg:h-[826px] mx-auto"
      // onMouseMove={handleMouseMove}
    >
      {
        <Canvas
          camera={{
            fov: 35,
            // aspect: isClient ? window.innerWidth / window?.innerHeight : 0,
            near: 1,
            far: 2000,
            position: [0, 0, 300],
          }}
        >
          <Scene mouseRef={mouseRef} />
        </Canvas>
      }
    </div>
  );
};

const Scene: React.FC<SceneProps> = ({ mouseRef }) => {
  const { camera } = useThree();
  const particlesRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const loader = new OBJLoader();
    const geometry = new THREE.BufferGeometry();

    loader.load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/40480/head.obj",
      (object: THREE.Group) => {
        const vertices: number[] = [];
        const scale = 8;

        object.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            // Get position attribute from the mesh's geometry
            const positions = child.geometry.getAttribute("position");

            // Iterate through the position buffer and apply scale
            for (let i = 0; i < positions.count; i++) {
              vertices.push(
                positions.getX(i) * scale,
                positions.getY(i) * scale,
                positions.getZ(i) * scale
              );
            }
          }
        });

        // Create new buffer geometry with scaled vertices
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vertices, 3)
        );

        if (particlesRef.current) {
          particlesRef.current.geometry.dispose(); // Clean up old geometry
          particlesRef.current.geometry = geometry;
        }
      },
      (xhr: ProgressEvent<EventTarget>) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error: any) => {
        console.error("An error occurred loading the model:", error);
      }
    );

    return () => {
      geometry.dispose();
    };
  }, []);

  useFrame(() => {
    if (camera && mouseRef.current) {
      camera.position.x +=
        (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y +=
        (-mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <points ref={particlesRef}>
      <pointsMaterial color={0xffffff} size={1.5} />
    </points>
  );
};

export default ParticleHead;
