import {Canvas} from "@react-three/fiber";
import {InstrumentSelectorSlider} from "./InstrumentSelector.slider";
import {PerspectiveCamera, Vector3} from "three";
import {useEffect, useMemo, useRef, useState} from "react";
import {InstrumentSelectorDialog} from "./InstrumentSelector.dialog";

export function InstrumentSelectorRoute() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [xPos, setXPos] = useState(0);
  const camera = useMemo(() => {
    const initialCamera = new PerspectiveCamera(80, (ref.current?.height ?? 1) / (ref.current?.width ?? 1), .01, 40000000);
    initialCamera.position.set(0, 0, 0.7);
    initialCamera.lookAt(new Vector3(0, 0, 0));
    return initialCamera;
  },[]);
  const instrumentsGap = 0.5;

  useEffect(() => {
    if (ref.current)
      camera.aspect = ref.current.height / ref.current.width;
  }, [ref]);

  const instruments = [
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'electrical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'bass', attribute: "4 strings", modelName: "guitar"},
    {name: 'ukulele', attribute: "4 strings", modelName: "guitar"},
    {name: 'irish bouzouki', attribute: "8 strings", modelName: "guitar"},
  ]
  const moveCamera = (cameraNewPosX: number) => {
    camera.position.set(cameraNewPosX, 0, 0.7);
    camera.lookAt(new Vector3(cameraNewPosX, 0, 0));
    setXPos(cameraNewPosX)
  };

  return <>
    <Canvas ref={ref} style={{width: '100%', height:'100%', cursor: 'grab'}} camera={camera}>
      <InstrumentSelectorSlider instruments={instruments} handleCameraChange={moveCamera} instrumentsGap={instrumentsGap}/>
    </Canvas>
    <InstrumentSelectorDialog instruments={instruments} cameraPosX={xPos} instrumentsGap={instrumentsGap}/>
  </>;
}