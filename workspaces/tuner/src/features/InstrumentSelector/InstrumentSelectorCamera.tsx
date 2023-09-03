import { useContext, useEffect } from "react";
import { GrabHandlerContext } from "../../utils";

type Props = {
  instrumentsGap: number;
  instrumentsCount: number;
}

export const InstrumentSelectorCamera = ({instrumentsGap, instrumentsCount}: Props) => {
  const {setOnGrabMovementHandler} = useContext(GrabHandlerContext);

  useEffect(() => {
    setOnGrabMovementHandler(() => (xMovement: number) => {
      console.log(xMovement);
    });

    return () => setOnGrabMovementHandler(() => {});
  }, [setOnGrabMovementHandler]);

  return null;
};