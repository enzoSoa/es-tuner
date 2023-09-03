import {Canvas} from "@react-three/fiber";
import {InstrumentSelectorWheel} from "./InstrumentSelector.wheel";
import {PerspectiveCamera, Vector3} from "three";
import {useEffect, useMemo, useRef, useState} from "react";

export function InstrumentSelectorRoute() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [xPos, setXPos] = useState(0);
  const instrumentsGap = 0.125;
  const camera = useMemo(() => {
    const initialCamera = new PerspectiveCamera(20, (ref.current?.height ?? 1) / (ref.current?.width ?? 1), .01, 40000000);
    initialCamera.position.set(0, 6, 0);
    initialCamera.lookAt(new Vector3(0, 0, 0));
    return initialCamera;
  },[]);

  useEffect(() => {
    if (ref.current)
      camera.aspect = ref.current.height / ref.current.width;
  }, [ref]);

  const instruments = [
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
  ]
  const moveCamera = (cameraNewPosX: number) => {};

  return <>
    <Canvas ref={ref} style={{width: '100%', height:'100%', cursor: 'grab'}} camera={camera}>
      <InstrumentSelectorWheel instruments={instruments} handleCameraChange={moveCamera} instrumentsGap={instrumentsGap}/>
    </Canvas>
  </>;
}