import { GetUserDetailResponse } from "@/clients/cpHub/type";
import {
  Card,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function UserExternalLinkSection(props: {
  userDetail: GetUserDetailResponse;
}) {
  const { userDetail } = props;
  const { externalPlatformIds } = userDetail;
  console.log("External Platform IDs:", externalPlatformIds);

  return (
    <Card variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>External links</TableCell>
            <TableCell align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {/* TODO: link rating color when AtCoder/CF rating is available*/}
          {externalPlatformIds.codeforces && (
            <TableRow>
              <TableCell scope="row">Codeforces</TableCell>
              <TableCell align="left">
                <Link
                  href={`https://codeforces.com/profile/${externalPlatformIds.codeforces}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{externalPlatformIds.codeforces}
                </Link>
              </TableCell>
            </TableRow>
          )}
          {externalPlatformIds.atCoder && (
            <TableRow>
              <TableCell scope="row">AtCoder</TableCell>
              <TableCell align="left">
                <Link
                  href={`https://atcoder.jp/users/${externalPlatformIds.atCoder}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{externalPlatformIds.atCoder}
                </Link>
              </TableCell>
            </TableRow>
          )}
          {externalPlatformIds.baekjoonOnlineJudge && (
            <TableRow>
              <TableCell scope="row">BOJ</TableCell>
              <TableCell scope="row">
                <Link
                  href={`https://www.acmicpc.net/user/${externalPlatformIds.baekjoonOnlineJudge}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{externalPlatformIds.baekjoonOnlineJudge}
                </Link>
              </TableCell>
            </TableRow>
          )}
          {externalPlatformIds.gitHub && (
            <TableRow>
              <TableCell scope="row">GitHub</TableCell>
              <TableCell scope="row">
                <Link
                  href={`https://github.com/${externalPlatformIds.gitHub}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{externalPlatformIds.gitHub}
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
