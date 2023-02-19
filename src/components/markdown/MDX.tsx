import React, { PropsWithChildren } from "react";
import { MDXProvider } from "@mdx-js/react";
import type { Components as MDXComponents } from "@mdx-js/react/lib";
import { Link } from "../basic/Link";

const MDXComponents: MDXComponents = {
  // Link,
  // link: Link
  // Default components
  // https://mdxjs.com/table-of-components/
  a: (props) => <Link {...props} to={props.href || ""} />,
  // code: (props) => <CodeBlock {...props} />,
  // h2: ({ children }) => {
  //   const id = slugify(children);
  //   return (
  //     <Box display="block" marginBottom="6" marginTop="12">
  //       <Heading color="textPrimary" id={id}>
  //         <Box
  //           as="a"
  //           className={styles.hoverParent}
  //           href={`#${id}`}
  //           width="max"
  //         >
  //           {children}
  //           <Box
  //             className={styles.hoverChild}
  //             color="textSecondary"
  //             display="inline-block"
  //             marginLeft="2"
  //           >
  //             #
  //           </Box>
  //         </Box>
  //       </Heading>
  //     </Box>
  //   );
  // },
  // inlineCode: ({ children }) => (
  //   <Text as="code" color="accent" font="mono">
  //     {children}
  //   </Text>
  // ),
  // p: ({ children }) => (
  //   <Box marginY="6">
  //     <Text as="p" color="text" lineHeight="1.625" variant="base">
  //       {children}
  //     </Text>
  //   </Box>
  // ),
  // pre: (props) => <Box marginY="6" {...props} />,
};

export default function MDX({ children }: PropsWithChildren) {
  return <MDXProvider components={MDXComponents}>{children}</MDXProvider>;
}
