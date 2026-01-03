import { useEffect, useRef, useState } from "react";

export default function useLoadingTime() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTime, setLoadingTime] = useState<number>(0);

  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      // Start measuring
      startTimeRef.current = Date.now();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoadingTime(0);

      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setLoadingTime(Date.now() - startTimeRef.current);
        }
      }, 100);
    } else {
      // Stop measuring
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      startTimeRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loading]);

  return {
    loading,
    setLoading,
    loadingTime, // milliseconds
  };
}
