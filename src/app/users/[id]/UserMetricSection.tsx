import { GetUserDetailResponse } from "@/clients/cpHub/type";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function UserMetricSection(props: {
  userDetail: GetUserDetailResponse;
}) {
  const { userDetail } = props;

  return (
    <Card variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Metrics</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell scope="row">H-index</TableCell>
            <TableCell align="right">{userDetail.metrics.hIndex}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row">G-index</TableCell>
            <TableCell align="right">{userDetail.metrics.gIndex}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row">Authored editorials</TableCell>
            <TableCell align="right">
              {userDetail.metrics.authoredEditorialCount}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row">Authored comments</TableCell>
            <TableCell align="right">
              {userDetail.metrics.authoredCommentCount}
            </TableCell>
          </TableRow>
          <TableRow sx={{ borderBottom: "0" }}>
            <TableCell scope="row">Editorial votes</TableCell>
            <TableCell align="right">
              {userDetail.metrics.editorialVoteCount}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
