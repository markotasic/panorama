import * as THREE from 'three';
import { useRef, useState } from 'react';

function Sphere({ position }: any | THREE.Vector3) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  return (
    <mesh
      position={position}
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereBufferGeometry args={[0.02, 30, 30]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}
export default Sphere;
