import * as THREE from 'three';
import { Suspense, useRef, useState } from 'react';
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

function Dome(props: any) {
  const texture = useLoader(THREE.TextureLoader, '/panorama.jpg');

  return (
    <mesh
      onClick={({ intersections }) => {
        const { point } = intersections[0];

        props.onClick(point);
      }}
    >
      <sphereBufferGeometry attach='geometry' args={[700, 70, 40]} />
      <meshBasicMaterial
        attach='material'
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

const App = () => {
  const [values, setValues] = useState<any>([]);

  const createSphere = (vector3: any) => {
    console.log('vector3', vector3);
    if (values) {
      setValues((oldArray: any) => [
        ...oldArray,
        [vector3.z, vector3.y, vector3.x],
      ]);
    } else {
      setValues([[vector3.z, vector3.y, vector3.x]]);
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Controls />
      <Suspense fallback={null}>
        <Dome onClick={createSphere} />
      </Suspense>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {values.map((position: []) => (
        <Sphere key={Math.random()} position={position} />
      ))}
    </Canvas>
  );
};
export default App;
