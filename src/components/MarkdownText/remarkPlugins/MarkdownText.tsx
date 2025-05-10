/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { mentionUserPlugin } from "./mentionUserPlugin";
import {
  referenceContestPlugin,
  referenceEditorialPlugin,
  referenceProblemPlugin,
} from "./referencePlugin";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";

export default function MarkdownText(props: {
  content: string;
  disallowedElements?: string[];
}) {
  const { content, disallowedElements } = props;
  return (
    <Markdown
      remarkPlugins={[
        remarkGfm,
        remarkMath,
        mentionUserPlugin,
        referenceEditorialPlugin,
        referenceProblemPlugin,
        referenceContestPlugin,
      ]}
      rehypePlugins={[rehypeKatex, rehypePrism]}
      disallowedElements={disallowedElements}
      components={{
        // WIP: ID 대신 콘텐츠 이름 로딩 되도록 작업 필요
        span(props) {
          const { children, className, node, id, ...rest } = props;
          if (className?.includes("user-mention")) {
            return (
              <Link href={`/user/${id}`} passHref>
                <MUILink>@{id}</MUILink>
              </Link>
            );
          } else if (className?.includes("problem-reference")) {
            return (
              <Link href={`/problem/${id}`} passHref>
                <MUILink>Problem | {id}</MUILink>
              </Link>
            );
          } else if (className?.includes("contest-reference")) {
            return (
              <Link href={`/contest/${id}`} passHref>
                <MUILink>Contest | {id}</MUILink>
              </Link>
            );
          } else {
            return <span {...props} />;
          }
        },
      }}
    >
      {content}
    </Markdown>
  );
}
