import Head from "next/head";
import React from "react";
import clsx from "clsx";
import { SideBar } from "../components/sidebar/SideBar";

type Props = {
  title: string;
  showNavbar?: boolean;
  className?: string;
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({
  title,
  showNavbar = true,
  className,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {showNavbar && <SideBar />}
      <main className="flex flex-col justify-center items-center bg-slate-300">
        <div
          className={clsx(
            "w-11/12 min-h-screen p-5 flex flex-col items-center",
            className
          )}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default PageLayout;
