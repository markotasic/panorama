import * as THREE from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';
import './index.css';
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useLoader,
} from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Sphere from './components/Sphere';

extend({ OrbitControls });

function Controls(props: any) {
  const { camera, gl } = useThree();
  const ref = useRef<OrbitControlsImpl>(null);

  useFrame((state) => {
    if (!ref.current) return;
    return ref.current.update();
  });

  return (
    <OrbitControls
      ref={ref}
      target={[0, 0, 0]}
      {...props}
      args={[camera, gl.domElement]}
    />
  );
}

function Dome() {
  const texture = useLoader(THREE.TextureLoader, '/panorama.jpg');
  return (
    <mesh>
      <sphereBufferGeometry attach='geometry' args={[500, 60, 40]} />
      <meshBasicMaterial
        attach='material'
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

const App = () => {
  const [positionY, setPositionY] = useState<number>(0);
  const [positionX, setPositionX] = useState<number>(0);
  const [color, setColor] = useState<string>();

  const vector = new THREE.Vector3(1.5, 0, 0);
  console.log(vector);

  return (
    <>
      <input
        type='color'
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <Canvas
        camera={{ position: [0, 0, 0.1] }}
        onClick={(e: any) => {
          console.log(e);
          setPositionY(e.screenY);
          setPositionX(e.screenX);
        }}
      >
        <Controls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.2}
        />
        <Suspense fallback={null}>
          <Dome />
        </Suspense>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Sphere position={vector} color={color} />
        <Sphere position={[1.2, 0, 0]} />
      </Canvas>
    </>
  );
};
export default App;
