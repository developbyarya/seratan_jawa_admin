import { doc, updateDoc, collection } from "firebase/firestore";
import { db } from "../utils/firestore_config";

const baseCollection = collection(db, "soal");
export const UpdateMateri = async (
  hari: string,
  bagian: string,
  target: string,
  data: any
) => {
  const hariDoc = doc(baseCollection, hari);
  const bagianCollection = collection(hariDoc, bagian);
  const targetDoc = doc(bagianCollection, target);
  return await updateDoc(targetDoc, data);
};
