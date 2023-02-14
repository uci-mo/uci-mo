import React, { PropsWithChildren, useCallback } from "react";
import { createPortal } from "react-dom";

export const overlayContainerId = "overlay-container";

function getOverlayContainer() {
  const overlayContainer = document.getElementById(overlayContainerId);
  return overlayContainer
    ? (overlayContainer as HTMLDivElement)
    : document.body;
}

export default function useOverlayPortal() {
  const Portal = useCallback(
    ({ children }: PropsWithChildren) =>
      createPortal(children, getOverlayContainer()),
    []
  );

  return { Portal };
}
