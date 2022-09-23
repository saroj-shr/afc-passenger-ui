import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import React from "react";

export default function Example({ children }) {
  const currentPath = useRouter().pathname;

  if (currentPath === "/user-registration") {
    return (
      <>
        <Head>
          <title>AFC | User Registration</title>
          <meta name="keywords" content="AFC" />
        </Head>

        {children}
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>AFC | User Console</title>
          <meta name="keywords" content="AFC" />
        </Head>
        <div className="min-h-full">{children}</div>
      </>
    );
  }
}
