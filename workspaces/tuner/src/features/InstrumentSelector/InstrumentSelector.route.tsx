import {Canvas} from "@react-three/fiber";
import {InstrumentSelectorSlider} from "./InstrumentSelector.slider";
import {PerspectiveCamera, Vector3} from "three";
import {useEffect, useRef} from "react";

export function InstrumentSelectorRoute() {
  const ref = useRef<HTMLCanvasElement>(null);
  const camera = new PerspectiveCamera(80, (ref.current?.height ?? 1) / (ref.current?.width ?? 1), .01, 40000000);
  camera.position.set(0, 0, 0.7);
  camera.lookAt(new Vector3(0, 0, 0));

  useEffect(() => {
    if (ref.current)
      camera.aspect = ref.current.height / ref.current.width;
  }, [ref]);

  const instruments = [
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
  ]
  const moveCamera = (newPos: number) => {
    camera.position.x = newPos;
    camera.lookAt(new Vector3(newPos, 0, 0));
  };

  return <Canvas ref={ref} style={{width: '100%', height:'100%', cursor: 'grab'}} camera={camera}>
    <InstrumentSelectorSlider instruments={instruments} handleCameraChange={moveCamera}/>
  </Canvas>;
}