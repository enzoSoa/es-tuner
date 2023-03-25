import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

interface Props{
  name: string;
  position: number;
}

export function Instrument({name, position}: Props) {
  const instrumentModel = useLoader(GLTFLoader, `${name}.glb`);
  console.log(instrumentModel.scene);
  instrumentModel.scene.position.set(position,0,0);

  return <primitive object={instrumentModel.scene}/>;
}