import {useFrame, useThree} from "@react-three/fiber";
import {InstrumentSelectorModel} from "./InstrumentSelector.model";
import {useEffect, useState} from "react";
import {InstrumentSelectorLights} from "./InstrumentSelector.lights";
import {Instrument} from "../../types/instrument";

interface Props {
  instruments: Instrument[];
  handleCameraChange: (cameraNewPosX: number) => void;
  instrumentsGap: number;
}

export function InstrumentSelectorSlider({instruments, handleCameraChange, instrumentsGap}: Props) {
  const [aimedCameraPositionX, setAimedCameraPositionX] = useState(0);
  const [cursor, setCursor] = useState(0);
  const {camera} = useThree();

  const instrumentsByScroll = 4;

  useFrame(() => {
    if (cursor !== aimedCameraPositionX) {
      if (Math.abs(cursor - aimedCameraPositionX) < 0.001) setCursor(aimedCameraPositionX);
      setCursor(cursor + (aimedCameraPositionX - cursor) / 25);
    }

    if (camera.position.x !== cursor) {
      if (Math.abs(camera.position.x - cursor) < 0.001) handleCameraChange(cursor);
      handleCameraChange(camera.position.x + (cursor - camera.position.x) / 10);
    }
  });

  useEffect(() => {
    let cameraInitialPosition = camera.position.x;
    let cursorInitialPosition = 0;

    const handleMouseMovement = (event: MouseEvent) => move(event.clientX);
    const handleTouchMovement = (event: TouchEvent) => move(event.touches[0].clientX);
    const move = (number: number) => {
      const sliderWidth = (instruments.length-1) * instrumentsGap;

      const delta = number - cursorInitialPosition;
      const windowPourcentage = delta / window.innerWidth;
      const cameraDelta = instrumentsByScroll * windowPourcentage;
      const movement = cameraInitialPosition - cameraDelta;

      const newCameraPosition = Math.floor(movement / instrumentsGap) * instrumentsGap;
      setAimedCameraPositionX(Math.max(Math.min(newCameraPosition, sliderWidth), 0));
    };

    const handleMouseDown = (event: MouseEvent) => {
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
      cameraInitialPosition = camera.position.x;
      cursorInitialPosition = number;
    };

    const handleMouseUp = () => {
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
  }, []);


  return <group>
    <InstrumentSelectorLights posX={cursor}/>
    {instruments.map(
      (instrument, index) => <InstrumentSelectorModel key={index} name={instrument.modelName} position={index * instrumentsGap}/>
    )}
  </group>;
}