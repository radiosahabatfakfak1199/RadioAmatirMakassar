import { useCallback, useEffect, useRef, useState } from 'react';

export function useAudioPlayer(src: string | null) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = audioRef.current;
    setPlaying(false);
    setFailed(false);
    if (!element) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleError = () => {
      setPlaying(false);
      setFailed(true);
    };

    element.addEventListener('play', handlePlay);
    element.addEventListener('pause', handlePause);
    element.addEventListener('error', handleError);
    return () => {
      element.pause();
      element.removeEventListener('play', handlePlay);
      element.removeEventListener('pause', handlePause);
      element.removeEventListener('error', handleError);
    };
  }, [src]);

  const toggle = useCallback(() => {
    const element = audioRef.current;
    if (!element) return;
    if (!element.paused) {
      element.pause();
      return;
    }
    setFailed(false);
    element.play().catch(() => {
      setPlaying(false);
      setFailed(true);
    });
  }, []);

  return { audioRef, playing, failed, toggle };
}
