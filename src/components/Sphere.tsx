import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

// function Sphere(props: JSX.IntrinsicElements['mesh']) {
function Sphere(props: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={(event) => setActive(!active)}
      // onClick={(event) => setColor(props.color)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereBufferGeometry args={[0.05, 30, 30]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
export default Sphere;
