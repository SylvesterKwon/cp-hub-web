import { findAndReplace } from "mdast-util-find-and-replace";
import { Plugin } from "unified";
import { Root } from "mdast";

export const referenceEditorialPlugin: Plugin<[], Root> = () => {
  return function (tree) {
    findAndReplace(tree, [
      /(?<=^|\s)e#([A-Za-z0-9_]+)/g,
      function (_, match) {
        return {
          type: "text",
          value: `problem #${match}`,
          data: {
            hName: "span",
            hProperties: {
              className: "editorial-reference",
              id: match,
            },
          },
          children: [
            {
              type: "text",
              value: `@${match}`,
            },
          ],
        };
      },
    ]);
  };
};

export const referenceProblemPlugin: Plugin<[], Root> = () => {
  return function (tree) {
    findAndReplace(tree, [
      /(?<=^|\s)p#([A-Za-z0-9_]+)/g,
      function (_, match) {
        return {
          type: "text",
          value: `Problem #${match}`,

          data: {
            hName: "span",
            hProperties: {
              className: "problem-reference",
              id: match,
            },
          },
          children: [
            {
              type: "text",
              value: `@${match}`,
            },
          ],
        };
      },
    ]);
  };
};

export const referenceContestPlugin: Plugin<[], Root> = () => {
  return function (tree) {
    findAndReplace(tree, [
      /(?<=^|\s)c#([A-Za-z0-9_]+)/g,
      function (_, match) {
        return {
          type: "text",
          value: `editorial #${match}`,
          data: {
            hName: "span",
            hProperties: {
              className: "contest-reference",
              id: match,
            },
          },
          children: [
            {
              type: "text",
              value: `@${match}`,
            },
          ],
        };
      },
    ]);
  };
};
