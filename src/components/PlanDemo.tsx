import { useState } from 'react';
import plan3d from '../assets/demo/Plano.webp';
import plan2d from '../assets/demo/Plano2.webp';

export default function PlanDemo() {
  const [mode, setMode] = useState<'3d' | '2d'>('3d');
  return (
    <div className="demo-media demo-plan">
      <div className="demo-plan-stage">
        <img className={`demo-plan-layer${mode === '3d' ? ' demo-plan-layer--active' : ''}`} src={plan3d} alt="Plano 3D del departamento" loading="lazy" />
        <img className={`demo-plan-layer${mode === '2d' ? ' demo-plan-layer--active' : ''}`} src={plan2d} alt="Plano 2D del departamento" loading="lazy" />
      </div>
      <div className="demo-switch" role="group" aria-label="Tipo de plano">
        <button type="button" aria-pressed={mode === '3d'} onClick={() => setMode('3d')}>3D</button>
        <button type="button" aria-pressed={mode === '2d'} onClick={() => setMode('2d')}>2D</button>
      </div>
    </div>
  );
}