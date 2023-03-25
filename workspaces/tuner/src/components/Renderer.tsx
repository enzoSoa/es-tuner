import {BufferGeometry, Line, LineBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from "three";
import {useEffect, useRef} from "react";

export function Renderer() {
  const rendererRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderer = new WebGLRenderer({canvas: rendererRef.current as HTMLCanvasElement});
    renderer.setSize(window.innerWidth, window.innerHeight);
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new Scene();

    // line
    const material = new LineBasicMaterial({color: 0x0000ff});

    const points = [new Vector3(-10, 0, 0), new Vector3(0, 10, 0), new Vector3(10, 0, 0)];
    const geometry = new BufferGeometry().setFromPoints(points);

    const line = new Line(geometry, material);
    scene.add(line);
    renderer.render(scene, camera);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return <canvas ref={rendererRef}/>;
}