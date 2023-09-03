import {InstrumentSelector, Header} from "./features";
import { GrabHandler } from "./utils";

export function App() {
  return <GrabHandler>
    <Header/>
    <InstrumentSelector/>
  </GrabHandler>;
}
