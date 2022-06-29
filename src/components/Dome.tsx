import * as THREE from 'three';
import { useThree, useLoader } from 'react-three-fiber';

interface dataFormProps {
  onClick: (object: THREE.Vector2) => void;
}

const Dome = ({ onClick = () => {} }: dataFormProps) => {
  const texture = useLoader(THREE.TextureLoader, '/panorama.jpg');
  const { mouse } = useThree();

  return (
    <mesh
      onClick={() => {
        onClick(mouse);
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
};

export default Dome;
