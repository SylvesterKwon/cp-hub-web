"use client";

import cpHubClient from "@/clients/cpHub/cpHubClient";
import {
  CitationInformation,
  CommentContextType,
  ReferenceSourceType,
} from "@/clients/cpHub/type";
import {
  Card,
  CardHeader,
  Link,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function CitedBySecion(props: { editorialId: string }) {
  const { editorialId } = props;
  const [citations, setCitations] = useState<CitationInformation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    cpHubClient.getEditorialCitations(editorialId).then((res) => {
      setCitations(res.results);
      setIsLoading(false);
    });
  }, [editorialId]);
  // cpHubClient.getEditorialCitations(editorialId);
  return (
    <Card
      color="secondary"
      variant="outlined"
      sx={{ padding: 1, overflow: "scroll" }}
    >
      <Typography>Cited by:</Typography>
      {isLoading ? (
        <Skeleton />
      ) : citations.length === 0 ? (
        <Typography>No citations</Typography>
      ) : (
        <ul>
          {citations.map((citation) => (
            // WIP - citation 표기하기 link 추가하기
            <li key={citation.source.id}>
              <span>
                <Link href={`/users/${citation.source.author.username}`}>
                  {citation.source.author.username}
                </Link>
                {`'s `}
                {citation.sourceType === ReferenceSourceType.COMMENT ? (
                  <>
                    comment on{" "}
                    {citation.source.context?.type ===
                      CommentContextType.CONTEST && (
                      <>
                        <Link href={`/contests/${citation.source.id}`}>
                          contest {citation.source.context.name} review
                        </Link>
                      </>
                    )}
                    {citation.source.context?.type ===
                      CommentContextType.EDITORIAL && (
                      <>
                        <Link href={`/editorials/${citation.source.id}`}>
                          editorial
                        </Link>{" "}
                        by{" "}
                        <Link
                          href={`/users/${citation.source.context.author.username}`}
                        >
                          {` ${citation.source.context.author.username}`}
                        </Link>{" "}
                        for{" "}
                        <Link
                          href={`/problems/${citation.source.context.problem.id}`}
                        >
                          {citation.source.context.problem.name}
                        </Link>
                      </>
                    )}
                    {citation.source.context?.type ===
                      CommentContextType.PROBLEM && (
                      <>
                        <Link href={`/problems/${citation.source.id}`}>
                          problem {citation.source.context.name} review
                        </Link>
                      </>
                    )}
                  </>
                ) : citation.sourceType === ReferenceSourceType.EDITORIAL ? (
                  <>
                    <Link href={`/problems/${citation.source.id}`}>
                      editorial
                    </Link>{" "}
                    for{" "}
                    <Link href={`/problems/${citation.source.problem.id}`}>
                      {citation.source.problem.name}
                    </Link>
                  </>
                ) : (
                  "Unknown citation"
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
