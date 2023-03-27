import {Object3D, PointLight, RectAreaLight, SpotLight} from "three";

interface Props{
  posX: number;
}

export function Lights({posX}: Props) {
  const leftSpotLight = new SpotLight("#E1D3FF",0.9,3,0.16,1,0.5);
  leftSpotLight.position.set(posX - 0.95, 1.4, 1.6);

  const rightSpotLight = new SpotLight("#82A8FF",1.5,0,0.15,0.5,0.5);
  rightSpotLight.position.set(posX + 0.49, 0.55, 0.7);

  const pointLight = new PointLight("#CAC7FF",500,2, 6);
  pointLight.position.set(posX + 0.04, 0.5, -0.7);

  const areaLight = new RectAreaLight("#F2B0FF",1, 1, 1);
  areaLight.position.set(posX, 0.08, -2);
  areaLight.lookAt(posX,0,0);

  const topTarget = new Object3D();
  topTarget.position.set(posX, 0, 0);
  leftSpotLight.target = topTarget;

  const bottomTarget = new Object3D();
  bottomTarget.position.set(posX, -0.2, 0);
  rightSpotLight.target = bottomTarget;

  return <>
    <primitive object={leftSpotLight}/>
    <primitive object={rightSpotLight}/>
    <primitive object={pointLight}/>
    <primitive object={areaLight}/>
    <primitive object={topTarget}/>
    <primitive object={bottomTarget}/>
  </>;
}