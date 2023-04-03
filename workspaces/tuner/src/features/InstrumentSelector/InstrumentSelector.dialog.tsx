import {Instrument} from "../../types/instrument";
import {Text} from "../../ui";
import {useMemo} from "react";
import {dialogStyle, foldable, folded} from "./InstrumentSelector.style";

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
  const classes = [dialogStyle, foldable, Math.abs(index - roundedIndex) > 0.25 && folded];

  return <section css={classes}>
    <Text type="h2">{instrument.name}</Text>
    <Text>{instrument.attribute}</Text>
  </section>;
}