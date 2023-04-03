import {Instrument} from "../../types/instrument";
import {Text} from "../../ui";
import {useMemo} from "react";
import {dialogStyle} from "./InstrumentSelector.style";

interface Props {
  instruments: Instrument[];
  cameraPosX: number;
}

export function InstrumentSelectorDialog({instruments, cameraPosX} : Props) {
  const classes = [dialogStyle];
  const instrument = useMemo(() => instruments[Math.round(cameraPosX*2)], [instruments, cameraPosX]);

  return <section css={classes}>
    <Text type="h2">{instrument.name}</Text>
    <Text>{instrument.attribute}</Text>
  </section>;
}