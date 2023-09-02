import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {useLoader} from "@react-three/fiber";
import {useMemo} from "react";

interface Props{
  name: string;
  instrumentNumber: number;
  instrumentsCount: number;
  instrumentsGap: number;
}

export function InstrumentSelectorModel({name, instrumentNumber, instrumentsCount, instrumentsGap}: Props) {
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
    const radius = instrumentsCount * instrumentsGap;
    const angle = (360 / instrumentsCount * instrumentNumber) * (Math.PI/180);
    const [x, y] = [radius * Math.sin(angle), radius * Math.cos(angle)]

    console.log(x,y)

    group.position.set(x, y, 0);
    group.rotation.set(-1.5708, angle, 0);
    return group;
  }, [scene, instrumentNumber, instrumentsCount, instrumentsGap]);

  return <primitive object={mesh}/>;
}