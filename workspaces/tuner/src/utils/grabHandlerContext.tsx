import { ReactNode, RefObject, createContext, useEffect, useRef, useState } from "react";

type GrabHandlerContextType = {
  setGrabTarget: (target: RefObject<any> | null) => void;
  setOnGrabMovementHandler: (handler: (xMovement: number) => void) => void;
};

export const GrabHandlerContext = createContext<GrabHandlerContextType>({
  setGrabTarget: () => {},
  setOnGrabMovementHandler: () => {},
});

type Props = {
  children: ReactNode;
}

export const GrabHandler = ({children}: Props) => {
  const [grabTarget, setGrabTarget] = useState<RefObject<any> | null>(null);
  const [onGrabMovementHandler, setOnGrabMovementHandler] = useState<(xMovement: number) => void>(() => {});
  const [grabX, setGrabX] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setGrabX(event.clientX);
      grabTarget?.current?.removeEventListener('mousedown', handleMouseDown);
      grabTarget?.current?.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
      setGrabX(null);
      grabTarget?.current?.removeEventListener('mouseup', handleMouseUp);
      grabTarget?.current?.addEventListener('mousedown', handleMouseDown);
    };

    if (grabTarget?.current) {
      handleMouseUp()
    }
  }, [grabTarget]);

  useEffect(() => {
    const handleMouseMovement = (event: MouseEvent) => onGrabMovementHandler?.(event.clientX - (grabX ?? 0));

    if (grabX) {
      window.addEventListener('mousemove', handleMouseMovement);
    } else {
      window.removeEventListener('mousemove', handleMouseMovement);
    }
    return () => window.removeEventListener('mousemove', handleMouseMovement);
  }, [grabX,onGrabMovementHandler]);

  return <GrabHandlerContext.Provider value={{setGrabTarget, setOnGrabMovementHandler}}>
    {children}
  </GrabHandlerContext.Provider>;
}