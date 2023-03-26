import {Canvas} from "@react-three/fiber";
import {Instrument} from "./Instrument";
import {PerspectiveCamera, Vector3} from "three";
import {MouseEventHandler, TouchEventHandler, useEffect, useState} from "react";
import {Lights} from "./Lights";

export function Renderer() {
  const [aimedPosX, setAimedPosX] = useState(0);
  const [posX, setPosX] = useState(0);

  const camera = new PerspectiveCamera(80, window.innerHeight / window.innerWidth, .01, 40000000);
  camera.position.set(posX, 0, 1);
  camera.lookAt(new Vector3(posX, 0, 0));

  const instrumentsGap = 0.45;
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


    const handleMove = (screenX: number) => {
      const mouseXMove = initialMousePosition - screenX;
      const mousePercentage = mouseXMove / window.innerWidth * 2;

      const maxScroll = (instruments.length - 1) * instrumentsGap;
      const movement = mousePercentage * maxScroll + scrollLeft;

      setAimedPosX(Math.round(Math.min(Math.max(movement, 0), maxScroll) / instrumentsGap) * instrumentsGap);
    };

    const handleMouseMove = (event: MouseEvent) => handleMove(event.screenX);
    const handleTouchMove = (event: TouchEvent) => handleMove(event.touches[0].screenX);

    if (isScrolling) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [initialMousePosition, isScrolling, scrollLeft]);

  const startScrolling = (screenX: number) => {
    setIsScrolling(true);
    setInitialMousePosition(screenX);
    setScrollLeft(posX);
  }

  const handleMouseDown: MouseEventHandler = ({nativeEvent}) => startScrolling(nativeEvent.screenX);
  const handleTouchStart: TouchEventHandler = ({nativeEvent}) => startScrolling(nativeEvent.touches[0].screenX);

  const handleMouseUp = () => setIsScrolling(false);


  return <Canvas
    style={{height: '100vh', width: '100vw', cursor: 'grab', background: 'linear-gradient(140deg, #000519, #000000)'}}
    camera={camera}
    onMouseDown={handleMouseDown}
    onTouchStart={handleTouchStart}
    onMouseUp={handleMouseUp}
    onTouchEnd={handleTouchStart}
  >
    <ambientLight intensity={1} color={"#000519"}/>
    <Lights posX={posX}/>
    {instruments.map((instrument, index) => <Instrument key={`instrument-${index}`} name={'guitar'}
                                                        position={instrumentsGap * index}/>)}
  </Canvas>;
}