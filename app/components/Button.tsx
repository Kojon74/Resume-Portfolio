// "use client";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  href?: Url;
  type?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ title, href, type = "button", onClick }: Props) => {
  return type === "link" && !!href ? (
    <Link className="btn" href={href}>
      {title}
    </Link>
  ) : (
    <button className="btn my-1" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
