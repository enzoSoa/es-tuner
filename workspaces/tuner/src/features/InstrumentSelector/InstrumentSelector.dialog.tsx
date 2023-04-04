import {Instrument} from "../../types/instrument";
import {Text} from "../../ui";
import {useEffect, useMemo, useRef, useState} from "react";
import {dialogStyle, folded} from "./InstrumentSelector.style";

interface Props {
  instruments: Instrument[];
  cameraPosX: number;
  instrumentsGap: number;
}

export function InstrumentSelectorDialog({instruments, cameraPosX, instrumentsGap} : Props) {
  const [index, roundedIndex] = useMemo(() => {
    const index = cameraPosX * (1 / instrumentsGap);
    const roundedIndex = Math.round(index);
    return [index, roundedIndex];
  }, [cameraPosX, instrumentsGap]);
  const instrument = useMemo(() => instruments[roundedIndex], [instruments, cameraPosX]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const [shadowPosition, setShadowPosition] = useState([0, 0]);
  const classes = [dialogStyle(shadowPosition[0], shadowPosition[1]), Math.abs(index - roundedIndex) > 0.25 && folded];

  useEffect(() => {
    const calculateDelta = (cursorPosition: number, center: number, screenLimit: number, radius: number) => {
      const cursorPercent = cursorPosition / screenLimit;
      const deltaPercent = center - cursorPercent;
      return deltaPercent * radius;
    }
    const handleMouseMove = (event: MouseEvent) => {
      if (!dialogRef.current) return;

      const radius = 100;
      const x = calculateDelta(event.clientX, .75, window.innerWidth, radius);
      const y = calculateDelta(event.clientY, .5, window.innerHeight, radius);

      setShadowPosition([x, y])
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [dialogRef]);

  return <section ref={dialogRef} css={classes}>
    <Text type="h2">{instrument.name}</Text>
    <Text>{instrument.attribute}</Text>
  </section>;
}