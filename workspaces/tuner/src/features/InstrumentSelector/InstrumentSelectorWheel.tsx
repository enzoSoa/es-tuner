import {InstrumentSelectorModel} from "./InstrumentSelectorModel";
import {Instrument} from "../../types/instrument";

type Props = {
  instruments: Instrument[];
  instrumentsGap: number;
}

export const InstrumentSelectorWheel = ({instruments, instrumentsGap}: Props) => {
  return <group>
    {instruments.map((instrument, index) => 
      <InstrumentSelectorModel key={index} name={instrument.modelName} instrumentNumber={index} instrumentsCount={instruments.length} instrumentsGap={instrumentsGap}/>
    )}
  </group>;
}