import { useContext, useEffect, useState } from "react";
import { GrabHandlerContext, degreeToRadiant, getCoordinatesFromAngle, getCloserAngle, getAngleFromCoordinates } from "../../utils";
import { useFrame } from "@react-three/fiber";

type Props = {
  instrumentsGap: number;
  instrumentsCount: number;
}

export const InstrumentSelectorCamera = ({instrumentsGap, instrumentsCount}: Props) => {
  const [aimedInstrument, setAimedInstrument] = useState(0);
  const {setOnGrabMovementHandler} = useContext(GrabHandlerContext);

  useFrame(({camera}) => {
    const currentCameraAngle = getAngleFromCoordinates(camera.position.x, camera.position.y);
    const aimedCameraAngle = degreeToRadiant(360 / instrumentsCount * aimedInstrument);

    const newCameraAngle = getCloserAngle(currentCameraAngle, aimedCameraAngle);
    const {x, y} = getCoordinatesFromAngle(instrumentsCount * (instrumentsGap + 1 / instrumentsCount) , newCameraAngle)

    console.log(currentCameraAngle,newCameraAngle);
    camera.position.set(x, y, 0);
    camera.lookAt(0, 0, 0);
    if (newCameraAngle !== 0) camera.rotateZ(degreeToRadiant(-90)) 
    else if (newCameraAngle < 0) camera.rotateZ(degreeToRadiant(90))
  })

  useEffect(() => {
    setOnGrabMovementHandler(() => (xMovement: number) => {
      console.log(xMovement);
    });

    return () => setOnGrabMovementHandler(() => {});
  }, [setOnGrabMovementHandler]);
  
  useEffect(() => {
    const changeAimedInstrument = (direction: number) => 
      setAimedInstrument(
        current => {
          const newIndex = current + direction;  
          if (newIndex < 0)
            return instrumentsCount - 1;
          else if (newIndex >= instrumentsCount)
            return 0;
          return newIndex
        }
      );

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          changeAimedInstrument(-1);
          break;
        case 'ArrowRight':
          changeAimedInstrument(1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [aimedInstrument]);

  return null;
};