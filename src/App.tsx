import { Suspense, useState } from 'react';
import { Canvas } from 'react-three-fiber';

import Controls from './components/Controls';
import Dome from './components/Dome';
import Sphere from './components/Sphere';

import './index.css';

const App = () => {
  const [values, setValues] = useState<number[][]>([]);

  const createSphere = (vector2: { x: number; y: number }) => {
    if (values) {
      setValues((oldArray) => [...oldArray, [0.5, vector2.y, vector2.x]]);
    } else {
      setValues([[0.5, vector2.y, vector2.x]]);
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Controls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.2}
      />
      <Suspense fallback={null}>
        <Dome onClick={createSphere} />
      </Suspense>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {values.map((position) => (
        <Sphere key={Math.random()} position={position} />
      ))}
    </Canvas>
  );
};
export default App;
