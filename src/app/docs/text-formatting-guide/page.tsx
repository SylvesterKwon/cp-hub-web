import MarkdownText from "@/components/MarkdownText/MarkdownText";
import { Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default async function TextFormattingGuidePage() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <MarkdownText
              content={`
# Text formatting guide
CP hub uses a content editing markup language called **CP Hub Flavored Markdown**, which is an extension of standard Markdown.

## Basic Markdown Syntax

See the [Markdown Guide - Basic Syntax](https://www.markdownguide.org/basic-syntax/) for basic Markdown syntax.

### $\\LaTeX$ Expressions

We use [KaTeX](https://katex.org/) for rendering $\\LaTeX$ expressions in Markdown.

#### Inline equations

To write inline $\\LaTeX$ expressions, use double dollar signs for block math and single dollar signs for inline math.

Example: \`$x = \\frac{ -b \\pm \\sqrt{b^2 - 4ac} }{2a}$\`

This rendered as: $x = \\frac{ -b \\pm \\sqrt{b^2 - 4ac} }{2a}$

#### Block equations

To write block $\\LaTeX$ expressions, use math code blocks described below (language identifier is \`math\`).

Example:
\`\`\`\`
\`\`\`math
x = \\frac{ -b \\pm \\sqrt{b^2 - 4ac} }{2a}
\`\`\`
\`\`\`\`

This rendered as:
\`\`\`math
x = \\frac{ -b \\pm \\sqrt{b^2 - 4ac} }{2a}
\`\`\`

* Surrounding double dollar signs (\$\$) to create block equations is not supported. Will be supported in the future.

### Code Blocks

To create code blocks, use triple backticks (\`\`\`) before and after the code. For inline code, use single backticks (\`).

Example:
\`\`\`\`
\`\`\`cpp
#include <bits/stdc++.h>
\`\`\`
\`\`\`\`

This rendered as:
\`\`\`cpp
#include <bits/stdc++.h>
\`\`\`


#### Language syntax highlighting support

To specify the language for syntax highlighting, add the language identifier right after the opening backticks, like: \`\`\`cpp.

CP Hub supports syntax highlighting for the following languages:
- **Katex (math)**
- C (c)
- C++ (cpp)
- C# (csharp)
- Python (python)
- Java (java)
- Kotlin (kotlin)
- Go (go)
- Ruby (ruby)
- Rust (rust)
- Dart (dart)

## CP Hub Flavored Markdown

CP Hub Flavored Markdown extends standard Markdown with additional features especially interconnectedness between contents within CP hub.

Inspired by [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/)

### Syntax

| Syntax | Usage | Example Input | Example Output |
|---|---|---|---|
|\`@<username>\`|Mention specific user|\`@SylvesterKwon\`| @SylvesterKwon |
|\`p#<problem_id>\`|Reference specific problem|\`p#0jc_YzOEZlK\`| p#sample_problem |
|\`c#<contest_id>\`|Reference specific contest|\`c#pJ7RylunRng\`| c#sample_contest |
|\`e#<editorial_id>\`|Reference specific editorial|\`e#InbrYf5ckhO\`| e#sample_editorial |
              `}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
