import { Button, ButtonProps } from "@mui/material";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

type ButtonLinkProps = {
  href: Url;
  children?: React.ReactNode;
} & ButtonProps;

export default function ButtonLink(props: ButtonLinkProps) {
  return (
    <Link
      href={props.href}
      style={{ color: "inherit", textDecoration: "inherit" }}
      passHref
    >
      <Button color="inherit" {...props} href={undefined} />
    </Link>
  );
}
