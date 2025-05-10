import { Plugin } from "unified";
import { Root } from "mdast";
import { findAndReplace } from "mdast-util-find-and-replace";

export const mentionUserCaptureRule = {
  type: "user",
  regex: /(?<=^|\s)@([A-Za-z0-9_]+)/g,
};

export const mentionUserPlugin: Plugin<[], Root> = () => {
  return function (tree) {
    findAndReplace(tree, [
      mentionUserCaptureRule.regex,
      function (_, match) {
        return {
          type: "text",
          value: `@${match}`,
          data: {
            hName: "span",
            hProperties: {
              className: "user-mention",
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
