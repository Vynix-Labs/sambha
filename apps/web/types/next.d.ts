import type { NextPage } from "next";

declare module "next" {
  type PageProps = {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[] | undefined>;
  };

  type Page<P = {}> = NextPage<P & PageProps>;
}

