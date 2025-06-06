/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypePrism from "rehype-prism";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";
import styles from "./MarkdownText.module.css";

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

import {
  mentionUserCaptureRule,
  mentionUserPlugin,
} from "./remarkPlugins/mentionUserPlugin";
import {
  referenceContestCaptureRule,
  referenceContestPlugin,
  referenceEditorialCaptureRule,
  referenceEditorialPlugin,
  referenceProblemCaptureRule,
  referenceProblemPlugin,
} from "./remarkPlugins/referencePlugin";
import Link from "next/link";
import { Avatar, Chip, CircularProgress, Link as MUILink } from "@mui/material";
import { useEffect, useState } from "react";
import ReferenceStoreProvider from "@/app/components/providers/ReferenceStoreProvider";
import { useReferenceStore } from "@/app/stores/referenceStore";
import {
  ContestReferenceInfo,
  EditorialReferenceInfo,
  ProblemReferenceInfo,
  UserReferenceInfo,
} from "@/clients/cpHub/type";
import { NoAccounts } from "@mui/icons-material";

function extractMentionIds(content: string) {
  const captureRules: { type: string; regex: RegExp }[] = [
    mentionUserCaptureRule,
    referenceEditorialCaptureRule,
    referenceProblemCaptureRule,
    referenceContestCaptureRule,
  ];
  const ids: {
    type: "problem" | "editorial" | "contest" | "user";
    id: string;
  }[] = [];
  captureRules.forEach((rule) => {
    const regex = new RegExp(rule.regex, "g");
    let match;
    while ((match = regex.exec(content)) !== null) {
      const id = match[1];
      ids.push({
        type: rule.type as "problem" | "editorial" | "contest" | "user",
        id,
      });
    }
  });
  return ids;
}

export default function MarkdownText(props: {
  content: string;
  disallowedElements?: string[];
}) {
  return (
    <ReferenceStoreProvider>
      <div className={styles.markdownText}>
        <MarkdownText2 {...props} />
      </div>
    </ReferenceStoreProvider>
  );
}

function MarkdownText2(props: {
  content: string;
  disallowedElements?: string[];
}) {
  const { content, disallowedElements } = props;

  const setReference = useReferenceStore((state) => state.setReference);

  useEffect(() => {
    const ids = extractMentionIds(content);
    if (ids.length) setReference(ids);
  }, [content, setReference]);

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
        span(props) {
          const { children, className, node, id, ...rest } = props;
          if (className?.includes("user-mention")) {
            return <UserReference id={id!} />;
          } else if (className?.includes("problem-reference")) {
            return <ProblemReference id={id!} />;
          } else if (className?.includes("contest-reference")) {
            return <ContestReference id={id!} />;
          } else if (className?.includes("editorial-reference")) {
            return <EditorialReference id={id!} />;
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

function UserReference(props: { id: string }) {
  const { id } = props;
  const users = useReferenceStore((state) => state.users);
  const isLoading = useReferenceStore((state) => state.isLoading);
  const [user, setUser] = useState<UserReferenceInfo | undefined>(undefined);

  useEffect(() => {
    setUser(users.find((u) => u.username === id));
  }, [users, id]);

  if (isLoading)
    return <Chip component="span" label="Loading..." size="small" />;
  if (!user)
    return (
      <Chip
        component="span"
        avatar={<NoAccounts />}
        label="Invalid user"
        size="small"
      />
    );

  return (
    <Link href={`/users/${id}`} passHref>
      <Chip
        component="span"
        avatar={<Avatar alt={user?.username} src={user?.profilePictureUrl} />}
        size="small"
        label={`${id}`}
      />
    </Link>
  );
}

function ProblemReference(props: { id: string }) {
  const { id } = props;
  const problems = useReferenceStore((state) => state.problems);
  const isLoading = useReferenceStore((state) => state.isLoading);
  const [problem, setProblem] = useState<ProblemReferenceInfo | undefined>(
    undefined
  );

  useEffect(() => {
    setProblem(problems.find((item) => item.id === id));
  }, [problems, id]);

  if (isLoading) return <Chip label="Loading..." size="small" />;
  if (!problem)
    return (
      <Chip
        component="span"
        avatar={<NoAccounts />}
        label="Invalid problem"
        size="small"
      />
    );

  return (
    <Link href={`/problems/${id}`} passHref>
      <Chip component="span" size="small" label={`Problem | ${problem.name}`} />
    </Link>
  );
}

function ContestReference(props: { id: string }) {
  const { id } = props;
  const contests = useReferenceStore((state) => state.contests);
  const isLoading = useReferenceStore((state) => state.isLoading);
  const [contest, setContest] = useState<ContestReferenceInfo | undefined>(
    undefined
  );

  useEffect(() => {
    setContest(contests.find((item) => item.id === id));
  }, [contests, id]);

  if (isLoading) return <Chip label="Loading..." size="small" />;
  if (!contest)
    return (
      <Chip
        component="span"
        avatar={<NoAccounts />}
        label="Invalid contest"
        size="small"
      />
    );

  return (
    <Link href={`/contests/${id}`} passHref>
      <Chip component="span" size="small" label={`Contest | ${contest.name}`} />
    </Link>
  );
}

function EditorialReference(props: { id: string }) {
  const { id } = props;
  const editorials = useReferenceStore((state) => state.editorials);
  const isLoading = useReferenceStore((state) => state.isLoading);
  const [editorial, setEditorial] = useState<
    EditorialReferenceInfo | undefined
  >(undefined);

  useEffect(() => {
    setEditorial(editorials.find((item) => item.id === id));
  }, [editorials, id]);

  if (isLoading) return <Chip label="Loading..." size="small" />;
  if (!editorial)
    return (
      <Chip
        component="span"
        avatar={<NoAccounts />}
        label="Invalid editorial"
        size="small"
      />
    );

  return (
    <Link href={`/editorials/${id}`} passHref>
      <Chip
        component="span"
        size="small"
        label={`Editorial | ${editorial.problem.name} by ${editorial.author.username}`}
      />
    </Link>
  );
}
