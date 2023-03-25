import {Canvas, Camera} from "@react-three/fiber";
import {Instrument} from "./Instrument";
import {PerspectiveCamera, Vector3} from "three";
import {useEffect, useState} from "react";

export function Renderer() {
  const [camera, setCamera] = useState<Camera | undefined>(undefined);

  useEffect(() => {
    const newCamera = new PerspectiveCamera(60, window.innerHeight / window.innerWidth, 0.01, 4000);
    newCamera.lookAt(new Vector3(0, 0, 0));
    newCamera.position.set(0, 0, 2);

    setCamera(newCamera);
  },[])

  return <Canvas style={{height: '100vh', width: '100vw'}} camera={camera}>
    <ambientLight intensity={1}/>
    <Instrument name={'guitar'} position={0}/>
  </Canvas>;
}