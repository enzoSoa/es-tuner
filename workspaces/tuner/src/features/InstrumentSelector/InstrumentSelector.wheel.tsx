import {InstrumentSelectorModel} from "./InstrumentSelector.model";
import {Instrument} from "../../types/instrument";

interface Props {
  instruments: Instrument[];
  handleCameraChange: (cameraNewPosX: number) => void;
  instrumentsGap: number;
}

export function InstrumentSelectorWheel({instruments, handleCameraChange, instrumentsGap}: Props) {
  return <group>
    {instruments.map((instrument, index) => 
      <InstrumentSelectorModel key={index} name={instrument.modelName} instrumentNumber={index} instrumentsCount={instruments.length} instrumentsGap={instrumentsGap}/>
    )}
  </group>;
}