import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React, { useState, useEffect } from "react";
import { getAllDocsId } from "@/lib/firestore/read_data";
import Tabel from "@/lib/components/tabel";

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="w-3/4 container mx-auto my-12 flex justify-center">
      <Tabel data={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getAllDocsId();
  return { props: { data } };
};

export default Home;
