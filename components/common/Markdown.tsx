import React, { memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function Markdown({ children, className = "", ...props }: Options) {
  //   console.log("Markdown render");

  return (
    <>
      <ReactMarkdown
        {...props}
        remarkPlugins={[remarkGfm]}
        className={`markdown prose dark:prose-invert ${className}`}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, "")}
                style={a11yDark}
                language={match?.[1] ?? ""}
                PreTag="div"
                // {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </>
  );
}

// export default Markdown;
export default memo(Markdown);
