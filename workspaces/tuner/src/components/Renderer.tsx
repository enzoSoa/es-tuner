import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera, Vector3} from "three";
import {InstrumentsSlider} from "./InstrumentsSlider";

export function Renderer() {
  const camera = new PerspectiveCamera(80, window.innerHeight / window.innerWidth, .01, 40000000);
  camera.position.set(0, 0, 1);
  camera.lookAt(new Vector3(0, 0, 0));

  const instruments = ['guitar', 'guitar', 'guitar', 'guitar', 'guitar']
  const moveCamera = (newPos: number) => {
    camera.position.set(newPos, 0, 1);
    camera.lookAt(new Vector3(newPos, 0, 0));
  };

  return <Canvas style={{height: '100vh', width: '100vw', cursor: 'grab', background: 'linear-gradient(140deg, #000519, #000000)'}} camera={camera}>
    <ambientLight intensity={1} color={"#000519"}/>
    <InstrumentsSlider instruments={instruments} handleCameraChange={moveCamera}/>
  </Canvas>;
}