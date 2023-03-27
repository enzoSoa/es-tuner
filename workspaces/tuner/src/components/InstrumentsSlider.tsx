import {useFrame, useThree} from "@react-three/fiber";
import {Instrument} from "./Instrument";
import {useEffect, useState} from "react";
import {Lights} from "./Lights";

interface Props {
  instruments: string[];
}

export function InstrumentsSlider({instruments}: Props) {
  const {camera} = useThree();
  const [aimedCameraPosition, setAimedCameraPosition] = useState(0);
  const [posX, setPosX] = useState(camera.position.x);

  const instrumentsGap = 0.5;
  useFrame(() => {
    if (camera.position.x !== aimedCameraPosition) {
      camera.position.x += (aimedCameraPosition - camera.position.x) * 0.05;
      setPosX(camera.position.x);
    }
  });

  useEffect(() => {
    let cameraInitialPosition = 0;
    let cursorInitialPosition = 0;

    const handleMouseMovement = (event: MouseEvent) => move(event.clientX);
    const handleTouchMovement = (event: TouchEvent) => move(event.touches[0].clientX);
    const move = (number: number) => {
      const delta = number - cursorInitialPosition;
      const screenPercentage = delta / window.innerWidth;
      const cameraDelta = screenPercentage * 2;

      const movement = cameraInitialPosition + cameraDelta;

      console.log(movement);
      // setAimedCameraPosition(movement);
      cameraInitialPosition = movement;
      cursorInitialPosition = number;
    };

    const handleMouseDown = (event: MouseEvent) => {
      console.log('down');
      startMovement(event.clientX);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMovement);
      window.removeEventListener('mousedown', handleMouseDown);
    };
    const handleTouchStart = (event: TouchEvent) => {
      startMovement(event.touches[0].clientX);
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchmove', handleTouchMovement);
      window.removeEventListener('touchstart', handleTouchStart);
    };
    const startMovement = (number: number) => {
      cameraInitialPosition = posX;
      cursorInitialPosition = number;
    };

    const handleMouseUp = () => {
      console.log('up');
      window.addEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMovement);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    const handleTouchEnd = () => {
      window.addEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMovement);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMovement);
      window.removeEventListener('mouseup', handleMouseUp);

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMovement);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  });


  return <group>
    <Lights posX={posX}/>
    {instruments.map(
      (instrument, index) => <Instrument key={index} name={instrument} position={index * instrumentsGap}/>
    )}
  </group>;
}