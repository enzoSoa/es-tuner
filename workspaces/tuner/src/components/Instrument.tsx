import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {useLoader} from "@react-three/fiber";
import {useMemo} from "react";

interface Props{
  name: string;
  position: number;
}

export function Instrument({name, position}: Props) {
  const {scene} = useLoader(
    GLTFLoader,
    `https://models.estuner.fr/${name}.glb`,
    loader => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/decoder/');
      loader.setDRACOLoader(dracoLoader);
    }
  )

  const mesh = useMemo(() => {
    const group = scene.clone();
    group.position.set(position, 0, 0);
    return group;
  }, [scene, position]);

  return <primitive object={mesh}/>;
}