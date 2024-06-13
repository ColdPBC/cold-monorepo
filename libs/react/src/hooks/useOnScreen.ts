import { RefObject, useEffect, useState } from 'react';

export const useOnScreen = (ref: RefObject<HTMLDivElement>, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { rootMargin });

    if (ref.current) {
      observer.observe(ref.current);
    }

    const current = ref.current;

    return () => {
      if (current) observer.disconnect();
    };
  }, []);

  return isIntersecting;
};
