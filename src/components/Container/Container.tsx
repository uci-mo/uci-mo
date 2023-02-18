import React, { PropsWithChildren } from "react";
import { container } from "./Container.css";
// import { sprinkles as s } from "../../styles/sprinkles.css";

export default function Container({ children }: PropsWithChildren) {
  return <div className={container}>{children}</div>;
}
