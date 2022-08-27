import { getDocById } from "@/lib/firestore/read_data";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { useRouter } from "next/router";

const DetailId: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  return (
    <div className="w-3/4 container mx-auto my-12 flex flex-col justify-center">
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-12">
            <th>No.</th>
            <th className="col-span-9">Deskripsi</th>
            <th className="col-span-2">Total chapter</th>
          </tr>
        </thead>

        <tbody>
          <tr className="grid grid-cols-12">
            <td>1.</td>
            <td className="col-span-9">{data.deskripsi}</td>
            <td className="col-span-2 text-center">{data.chapter}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="font-bold text-center mt-10 text-2xl">Collection</h2>
      <table>
        <thead>
          <tr>
            <th>Chapter</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: data.chapter as number }, (x, i) => i + 1).map(
            (el) => (
              <tr>
                <td>{"Bagian " + el}</td>
                <td>
                  <a
                    href={router.asPath + "/materi/bagian" + el}
                    className="button-primary-sm"
                  >
                    view
                  </a>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>

    // TODO: Buat collectin management
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getDocById(params?.id as string);

  return {
    props: { data },
  };
};

export default DetailId;
