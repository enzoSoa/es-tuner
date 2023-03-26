import {Canvas} from "@react-three/fiber";
import {Instrument} from "./Instrument";
import {PerspectiveCamera, Vector3} from "three";
import {MouseEventHandler, useEffect, useState} from "react";

export function Renderer() {
  const [aimedPosX, setAimedPosX] = useState(0);
  const [posX, setPosX] = useState(0);

  const camera = new PerspectiveCamera(2, window.innerHeight / window.innerWidth, 1, 40000000);
  camera.position.set(posX, 0, 50);
  camera.lookAt(new Vector3(posX, 0, 0));

  const instrumentsGap = 0.5;
  const instruments = ['guitar', 'guitar', 'guitar', 'guitar', 'guitar']

  const [isScrolling, setIsScrolling] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (posX === aimedPosX) return;
    else if (posX >= aimedPosX - 0.001 && posX <= aimedPosX + 0.001) setPosX(aimedPosX);
    else setPosX((aimedPosX - posX) * 0.0003 + posX);
  }, [aimedPosX,posX]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseXMove = initialMousePosition - event.screenX;
      const mousePercentage = mouseXMove / window.innerWidth * 2;

      const maxScroll = (instruments.length - 1) * instrumentsGap;
      const movement = mousePercentage * maxScroll + scrollLeft;

      setAimedPosX(Math.round(Math.min(Math.max(movement, 0), maxScroll) * 2) / 2);
    };

    if (isScrolling) {
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [initialMousePosition, isScrolling, scrollLeft]);

  const handleMouseDown: MouseEventHandler = (event) => {
    setIsScrolling(true);
    setInitialMousePosition(event.nativeEvent.screenX);
    setScrollLeft(posX);
  };
  const handleMouseUp = () => setIsScrolling(false);


  return <Canvas
    style={{height: '100vh', width: '100vw', cursor: 'grab'}}
    camera={camera}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
  >
    <ambientLight intensity={1}/>
    {instruments.map((instrument, index) => <Instrument key={`instrument-${index}`} name={'guitar'}
                                                        position={instrumentsGap * index}/>)}
  </Canvas>;
}