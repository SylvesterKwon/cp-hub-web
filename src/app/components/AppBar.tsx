import {
  AppBar as MUIAppBar,
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
import ButtonLink from "@/components/ButtonLink";

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
            <ButtonLink
              color="inherit"
              sx={{ display: { xs: "none", md: "block" } }}
              href="/problems"
            >
              Problems
            </ButtonLink>
            <ButtonLink
              color="inherit"
              sx={{ display: { xs: "none", md: "block" } }}
              href="/contests"
            >
              Contests
            </ButtonLink>
            <ButtonLink
              color="inherit"
              sx={{ display: { xs: "none", md: "block" } }}
              href="/forum"
            >
              Forum
            </ButtonLink>
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
