import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { animated, useTransition } from 'react-spring';
import {
  mainContent,
  mainHtml,
  mainInnerWrap,
  mainOuterWrap
} from './MainWrap.css';
import { headerHeight } from '../Header';
import { pageTransitionDuration } from './constants';

const mainGridArea = 'main';

export default function MainWrap({ children }: PropsWithChildren) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainHeight, setMainWrapHeight] = useState<number | 'auto'>('auto');

  const updateMainWrapHeight = useCallback(() => {
    const mainHeight = mainRef.current?.offsetHeight;
    setMainWrapHeight(mainHeight || 'auto');
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateMainWrapHeight);
    return () => window.removeEventListener('resize', updateMainWrapHeight);
  }, []);

  const transitions = useTransition([children], {
    from: (item, i) => {
      // console.log("from", item, i);
      return {
        opacity: 0,
        transform: 'translate(50%, 0) scale(1.5)'
      };
    },
    enter: {
      opacity: 1,
      transform: 'translate(0%, 0) scale(1)'
    },
    leave: {
      opacity: 0,
      transform: 'translate(-50%, 0) scale(0.5)'
    },
    config: {
      duration: pageTransitionDuration
    },
    onStart: updateMainWrapHeight,
    onDestroyed: updateMainWrapHeight
    // easing: easings.easeInOutBounce,
  });

  return (
    <div
      // className={mainOuterWrap}
      style={{
        flexGrow: 1,
        marginTop: headerHeight
      }}
    >
      <div
        // className={mainInnerWrap}
        style={{
          overflowY: 'hidden',
          transition: `height ${pageTransitionDuration}ms`,
          height: mainHeight
        }}
      >
        {/* scrolling transition to prevous position when clicking Back */}
        {/* https://janessagarrow.com/blog/gatsby-framer-motion-page-transitions/#bonus */}
        <main
          ref={mainRef}
          //  className={mainHtml}
          style={{
            overflow: 'hidden',
            display: 'grid',
            gridTemplate: `"${mainGridArea}"`
          }}
        >
          {transitions((style, passedChildren) => (
            <animated.div
              style={{ ...style, gridArea: mainGridArea }}
              //  className={mainContent}
            >
              {passedChildren}
            </animated.div>
          ))}
        </main>
      </div>
    </div>
  );
}
