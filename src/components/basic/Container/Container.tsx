import React, { PropsWithChildren } from "react";
import { container } from "./Container.css";

export default function Container({ children }: PropsWithChildren) {
  return <div className={container}>{children}</div>;
}
