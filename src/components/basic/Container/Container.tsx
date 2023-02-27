import React, { PropsWithChildren } from "react";
import { container } from "./Container.css";

interface ContainerProps {
  className?: string;
}

export default function Container({
  children,
  className = "",
}: PropsWithChildren<ContainerProps>) {
  return <div className={`${container} ${className}`}>{children}</div>;
}
