import React, { PropsWithChildren } from 'react';
import { Link as Linki18n } from 'gatsby-plugin-react-i18next';

export type LinkProps = {
  className?: string;
  to: string;
};

export const Link = ({
  children,
  className,
  to
}: PropsWithChildren<LinkProps>) => {
  const external = to.startsWith('http');
  if (external) {
    return (
      <a
        href={to}
        className={className}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Linki18n to={to} className={className}>
      {children}
    </Linki18n>
  );
};
