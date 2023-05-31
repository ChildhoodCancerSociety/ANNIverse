import { useEffect, useRef, useState } from "react";

export function useIsIntersecting<TElement extends HTMLElement>() {
  // to prevents runtime crash in IE, let's mark it true right away
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const ref = useRef<TElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(!!entry?.isIntersecting)
    );
    observer.observe(ref.current);
    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, []);
  return [isIntersecting, ref] as const;
}
