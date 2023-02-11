import React, { Suspense } from "react";

export default function Footer() {
  return (
    <footer>
      <p>
        <Suspense fallback={null}>{new Date().getFullYear()}</Suspense>© , Built
        with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </p>
    </footer>
  );
}
