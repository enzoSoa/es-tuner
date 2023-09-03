import {Canvas} from "@react-three/fiber";
import {InstrumentSelectorWheel} from "./InstrumentSelectorWheel";
import {PerspectiveCamera, Vector3} from "three";
import {useContext, useEffect, useMemo, useRef} from "react";
import { InstrumentSelectorCamera } from "./InstrumentSelectorCamera";
import { GrabHandlerContext, getAngleCoordinates } from "../../utils";

export const InstrumentSelector = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const {setGrabTarget} = useContext(GrabHandlerContext);
  const instrumentsGap = 0.125;
  const instruments = [
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"},
    {name: 'classical guitar', attribute: "6 strings", modelName: "guitar"}
  ]
  const camera = useMemo(() => {
    const initialCamera = new PerspectiveCamera(20, (ref.current?.height ?? 1) / (ref.current?.width ?? 1), .01, 40000000);
    const {x, y} = getAngleCoordinates(instruments.length * (instrumentsGap + 3 / instruments.length) , 0)

    initialCamera.position.set(x, y, 0);
    initialCamera.lookAt(new Vector3(0, 0, 0));
    return initialCamera;
  },[]);
  
  useEffect(() => {
    setGrabTarget(ref)
    return () => setGrabTarget(null)
  }, []);

  useEffect(() => {
    if (ref.current)
      camera.aspect = ref.current.height / ref.current.width;
  }, [ref]);

  return <>
    <Canvas ref={ref} style={{width: '100%', height:'100%'}} camera={camera}>
      <InstrumentSelectorWheel instruments={instruments} instrumentsGap={instrumentsGap}/>
      <InstrumentSelectorCamera instrumentsCount={instruments.length} instrumentsGap={instrumentsGap}/>
    </Canvas>
  </>;
}