import { PageProps } from "gatsby";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTransition, animated, easings, useScroll } from "react-spring";

export const pageTransitionDuration = 700;

export default function Main({ children }: PropsWithChildren) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainHeight, setMainHeight] = useState<number | "auto">("auto");

  const updateMainHeight = useCallback(() => {
    const mainHeight = mainRef.current?.offsetHeight;
    setMainHeight(mainHeight || "auto");
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateMainHeight);
    return () => window.removeEventListener("resize", updateMainHeight);
  }, []);

  const transitions = useTransition([children], {
    from: (item, i) => {
      // console.log("from", item, i);
      return {
        opacity: 0,
        transform: "translate(50%, 0) scale(1.5)",
      };
    },
    enter: {
      opacity: 1,
      transform: "translate(0%, 0) scale(1)",
    },
    leave: {
      opacity: 0,
      transform: "translate(-50%, 0) scale(0.5)",
    },
    config: {
      duration: pageTransitionDuration,
    },
    onStart: updateMainHeight,
    onDestroyed: updateMainHeight,
    easing: easings.easeInOutBounce,
  });

  return (
    <div style={{ flexGrow: 1 }}>
      <div
        style={{
          overflowY: "hidden",
          height: mainHeight,
          transition: `height ${pageTransitionDuration}ms`,
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
    </div>
  );
}
