import {Canvas, Camera} from "@react-three/fiber";
import {Instrument} from "./Instrument";
import {PerspectiveCamera, Vector3} from "three";
import {useEffect, useState} from "react";

export function Renderer() {
  const [camera, setCamera] = useState<Camera | undefined>(undefined);

  useEffect(() => {
    const newCamera = new PerspectiveCamera(2, window.innerHeight / window.innerWidth, 1, 40000000);
    newCamera.lookAt(new Vector3(0, 0, 0));
    newCamera.position.set(0, 0, 50);

    setCamera(newCamera);
  },[]);
  
  const instrumentsList = ['guitar', 'guitar', 'guitar', 'guitar', 'guitar']

  return <Canvas style={{height: '100vh', width: '100vw'}} camera={camera}>
    <ambientLight intensity={1}/>
    {instrumentsList.map((instrument, index) => <Instrument key={`instrument-${index}`} name={'guitar'} position={0.5 * index}/>)}
  </Canvas>;
}