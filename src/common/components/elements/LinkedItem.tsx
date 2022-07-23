import Link from "next/link";
import React from "react";

export type Props = {
  href: string;
  target?: "_self" | "_blank";
  className?: string;
  children: React.ReactNode;
  shallow?: boolean;
  onClick?: () => void;
};

const LinkedItem: React.FC<Props> = ({
  href,
  target = "_self",
  className,
  children,
  shallow = false,
  onClick,
}) => {
  return (
    <Link href={href} shallow={shallow}>
      <a {...{ className, target, onClick }}>{children}</a>
    </Link>
  );
};

export default LinkedItem;
