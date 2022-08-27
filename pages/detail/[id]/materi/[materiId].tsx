import { getTipe } from "@/lib/firestore/get_types";
import { getSoalLists, TSoalList } from "@/lib/firestore/read_data";
import { UpdateMateri } from "@/lib/firestore/update_data";
import { DocumentData } from "firebase/firestore";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useId, useRef, useState } from "react";

const Soal = ({
  index,
  tipe,
  currentTipe,
  data,
  id,
  route,
}: {
  index: number;
  tipe: DocumentData;
  currentTipe: string;
  data: DocumentData;
  id: string;
  route: { id: string; materiId: string };
}) => {
  const [changes, setChanges] = useState<boolean>(false);
  const [inputData, setInputData] = useState(data);
  const [tipeChanges, setTipeChanges] = useState(currentTipe);
  const changesData = useRef<{ tipe?: string; data?: any }>({});
  const handleUpdate = () => {
    setChanges(false);
    UpdateMateri(route.id, route.materiId, id, changesData.current);
    changesData.current = {};
  };
  return (
    <div key={index} className="my-8">
      <h1 className="font-bold text-xl">Soal {index + 1}</h1>
      {changes && (
        <div>
          <p>Apply Changes?</p>
          <button
            className="button-succes"
            onClick={() => {
              handleUpdate();
            }}
          >
            Yes
          </button>
          <button
            className="button-error"
            onClick={() => {
              setChanges(false);
              setInputData(data);
              setTipeChanges(currentTipe);
              changesData.current = {};
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="flex flex-row">
        <label htmlFor="" className="mr-2">
          Tipe:
        </label>
        <select
          name=""
          id=""
          value={tipeChanges}
          onChange={(e) => {
            setTipeChanges(e.target.value);
            setChanges(true);
            changesData.current = {
              ...changesData.current,
              tipe: e.target.value,
            };
          }}
        >
          {Object.keys(tipe).map((tipe, tipeIndex) => (
            <option key={index.toString() + tipe} value={tipe}>
              {tipe}
            </option>
          ))}{" "}
        </select>
      </div>
      <h3>Data:</h3>
      <div className="ml-5">
        {Object.keys(data).map((soalData, soalIndex) => (
          <div className="flex" key={soalIndex}>
            <p>{soalData}:</p>
            {(currentTipe == "pilihan" || currentTipe == "pilihan_kartu") &&
            soalData == "option" ? (
              <div>
                {(inputData[soalData] as Array<any>).map((opsi, index) => (
                  <input
                    type="text"
                    key={soalData + soalIndex + index}
                    value={opsi}
                    onChange={(e) => {
                      let newArray = (
                        inputData[soalData] as Array<any>
                      ).slice();
                      console.log(newArray);
                      changesData.current = {
                        ...changesData.current,
                        data: {
                          ...data,
                          ...changesData.current?.data,
                          [soalData]:
                            newArray.splice(index, index + 1, e.target.value) &&
                            newArray,
                        },
                      };
                      setInputData((prev) => ({
                        ...prev,
                        [soalData]:
                          newArray.splice(index, index + 1, e.target.value) &&
                          newArray,
                      }));
                    }}
                    className="ml-2 bg-gray-200 border-gray-400 border-2"
                  />
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={inputData[soalData]}
                onChange={(e) => {
                  setChanges(true);
                  changesData.current = {
                    ...changesData.current,
                    data: {
                      ...data,
                      ...changesData.current.data,
                      [soalData]: e.target.value,
                    },
                  };
                  setInputData((prev) => ({
                    ...prev,
                    [soalData]: e.target.value,
                  }));
                }}
                className="ml-2 bg-gray-200 border-gray-400 border-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailMateri: NextPage = ({
  soal,
  tipe,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  return (
    <div className="mx-12 mt-10 mb-20 ">
      {(soal as TSoalList[]).map((data, index) => (
        <Soal
          route={{
            id: router.query?.id as string,
            materiId: router.query?.materiId as string,
          }}
          index={index}
          key={useId()}
          tipe={tipe}
          currentTipe={data.data.tipe}
          data={data.data.data}
          id={data.id}
        />
      ))}
      <button className="button-primary">Tambah Data</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data: TSoalList[] = await getSoalLists(
    params?.materiId as string,
    params?.id as string
  );

  return {
    props: { soal: data, tipe: await getTipe() },
  };
};

export default DetailMateri;
