import { getTipe } from "@/lib/firestore/get_types";
import { getSoalLists, TSoalList } from "@/lib/firestore/read_data";
import { DocumentData } from "firebase/firestore";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRef, useState } from "react";

const Soal = ({
  index,
  tipe,
  currentTipe,
  data,
}: {
  index: number;
  tipe: DocumentData;
  currentTipe: string;
  data: DocumentData;
}) => {
  const [changes, setChanges] = useState<boolean>(false);
  const [inputData, setInputData] = useState(data);
  const [tipeChanges, setTipeChanges] = useState(currentTipe);
  const changesData = useRef({});
  return (
    <div key={index} className="my-8">
      <h1 className="font-bold text-xl">Soal {index + 1}</h1>
      {changes && (
        <div>
          <p>Apply Changes?</p>
          <button className="button-succes">Yes</button>
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
                      setChanges(true);
                      changesData.current = {
                        ...changesData.current,
                        [soalData]: e.target.value,
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
                    [soalData]: e.target.value,
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
  return (
    <div className="mx-12 mt-10 ">
      {(soal as TSoalList[]).map((data, index) => (
        <Soal
          index={index}
          tipe={tipe}
          currentTipe={data.data.tipe}
          data={data.data.data}
        />
      ))}
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
