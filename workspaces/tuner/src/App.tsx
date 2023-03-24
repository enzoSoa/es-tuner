import {useState} from 'react';
import WEBGL from "three/examples/jsm/capabilities/WebGL";

export function App() {
  const [webGlIsAvailable] = useState(WEBGL.isWebGLAvailable())
  return <p>WebGL is: {webGlIsAvailable? "available" : "unavailable"}</p>;
}
