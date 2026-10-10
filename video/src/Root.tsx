import {Composition} from 'remotion';
import cuts from '../public/cuts.json';
import {FPS, H, OUTRO_FRAMES, W} from './brand';
import {Pitch} from './Pitch';

const keptSeconds = (cuts.keep as number[][]).reduce((t, [a, b]) => t + (b - a), 0);

export const Root = () => (
  <Composition
    id="Pitch"
    component={Pitch}
    width={W}
    height={H}
    fps={FPS}
    durationInFrames={Math.round(keptSeconds * FPS) + OUTRO_FRAMES}
  />
);
