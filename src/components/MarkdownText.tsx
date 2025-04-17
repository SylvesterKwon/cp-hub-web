import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypePrism from "rehype-prism";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";

import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-go";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-dart";

export default function MarkdownText(props: { content: string }) {
  const { content } = props;
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypePrism]}
    >
      {content}
    </Markdown>
  );
}
