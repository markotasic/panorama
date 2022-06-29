import { useRef } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

extend({ OrbitControls });

const Controls = (props: any) => {
  const { camera, gl } = useThree();
  const ref = useRef<OrbitControlsImpl>(null);

  useFrame(() => {
    if (!ref.current) return;
    return ref.current.update();
  });

  return (
    <OrbitControls
      {...props}
      ref={ref}
      target={[0, 0, 0]}
      args={[camera, gl.domElement]}
    />
  );
};

export default Controls;
