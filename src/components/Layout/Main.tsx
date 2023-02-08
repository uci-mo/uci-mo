import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTransition, animated } from "react-spring";

export default function Main({ children }: PropsWithChildren) {
  const mainRef = useRef<HTMLMediaElement>(null);
  const [mainHeight, setMainHeight] = useState<number | "auto">("auto");

  const updateMainHeight = useCallback(() => {
    setMainHeight(mainRef.current?.offsetHeight || "auto");
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateMainHeight);
    return () => window.removeEventListener("resize", updateMainHeight);
  }, []);

  const transitions = useTransition(children, {
    keys: null,
    from: { opacity: 0, transform: "translateX(150%) scale(5)" },
    enter: { opacity: 1, transform: "translateX(0) scale(1)" },
    leave: { opacity: 0, transform: "translateX(-150%) scale(1)" },
    config: {
      duration: 400,
    },
    onStart: updateMainHeight,
    onDestroyed: updateMainHeight,
  });

  return (
    <div
      style={{
        overflowY: "hidden",
        height: mainHeight,
        transition: "height 200ms",
      }}
    >
      {/* scrolling transition to prevous position when clicking Back */}
      {/* https://janessagarrow.com/blog/gatsby-framer-motion-page-transitions/#bonus */}
      <main
        ref={mainRef}
        style={{
          overflow: "hidden",
          display: "grid",
          gridTemplate: '"main"',
        }}
      >
        {transitions((style, passedChildren) => (
          <animated.div style={{ ...style, gridArea: "main" }}>
            {passedChildren}
          </animated.div>
        ))}
      </main>
    </div>
  );
}
