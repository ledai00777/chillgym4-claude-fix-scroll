import { useEffect, useRef, useState } from 'react';

const DUMBBELL_ASSET = '/assets/image.png';
const MINIMUM_DISPLAY_MS = 450;
const FILL_DURATION_MS = 900;
const HOLD_DURATION_MS = 240;
const FADE_DURATION_MS = 600;

function waitForImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let fillTimer: ReturnType<typeof setTimeout> | undefined;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let isMounted = true;
    let loadListener: (() => void) | undefined;

    const pageReady = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          loadListener = () => resolve();
          window.addEventListener('load', loadListener, { once: true });
        });
    const minimumDisplay = new Promise<void>((resolve) => {
      setTimeout(resolve, MINIMUM_DISPLAY_MS);
    });

    Promise.all([pageReady, minimumDisplay, waitForImage(DUMBBELL_ASSET)]).then(() => {
      if (!isMounted) return;
      setProgress(100);

      fillTimer = setTimeout(() => {
        if (!isMounted) return;
        setIsFading(true);
        fadeTimer = setTimeout(() => {
          if (isMounted) onCompleteRef.current();
        }, FADE_DURATION_MS);
      }, FILL_DURATION_MS + HOLD_DURATION_MS);
    });

    return () => {
      isMounted = false;
      if (loadListener) window.removeEventListener('load', loadListener);
      if (fillTimer) clearTimeout(fillTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div className={`loading-screen ${isFading ? 'is-fading' : ''}`} aria-hidden="true">
      <div className="loading-dumbbell" role="presentation">
        <img className="loading-dumbbell-base" src={DUMBBELL_ASSET} alt="" />
        <div className="loading-dumbbell-progress" style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}>
          <img src={DUMBBELL_ASSET} alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
