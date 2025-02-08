import {
  AppBar as MUIAppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { Book } from "@mui/icons-material";
import ThemeSwitch from "./ThemeSwitch";
import AppBarUserInfoWrapper from "./AppBarUserInfoWrapper";

export default function AppBar({}) {
  return (
    <MUIAppBar position="static">
      <Toolbar>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ flexGrow: 1 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Book />
            <Link
              href="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Typography
                variant="h6"
                style={{ color: "inherit", marginLeft: 8 }}
              >
                CP hub
              </Typography>
            </Link>
            <Button
              color="inherit"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              Problems
            </Button>
            <Button
              color="inherit"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              Forum
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <AppBarUserInfoWrapper />
            <ThemeSwitch />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </MUIAppBar>
  );
}
