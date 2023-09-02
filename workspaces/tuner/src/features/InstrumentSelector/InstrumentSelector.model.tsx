import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {useLoader} from "@react-three/fiber";
import {useMemo} from "react";
import { degreeToRadiant, getAngleCoordinates } from "../../utils";

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
    const angle = degreeToRadiant(360 / instrumentsCount * instrumentNumber);
    const {x, y} = getAngleCoordinates(radius, angle);

    group.position.set(x, y, 0);
    group.rotation.set(degreeToRadiant(-90), angle, 0);

    return group;
  }, [scene, instrumentNumber, instrumentsCount, instrumentsGap]);

  return <primitive object={mesh}/>;
}