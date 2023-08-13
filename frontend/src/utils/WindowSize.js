import { useEffect, useState } from "react";

export const WindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    let isMounted = true;

    const updateSize = () => {
      if (isMounted) {
        setSize([window.innerWidth, window.innerHeight]);
      }
    };

    window.addEventListener("resize", updateSize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return {
    width: size[0],
    height: size[1],
  };
};
