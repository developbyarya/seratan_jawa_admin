import { db } from "../utils/firestore_config";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import type {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

const soalCollection = collection(db, "soal");

export const getAllDocsId = async () => {
  const data = await getDocs(soalCollection);
  return data.docs.map((e) => e.id);
};

export const getDocById = async (id: string) => {
  const document = doc(soalCollection, id);
  return (await getDoc(document)).data();
};

export interface TSoalList {
  id: string;
  data: DocumentData;
}
export const getSoalLists: (
  subcollection: string,
  day: string
) => Promise<TSoalList[]> = async (subcollection: string, day: string) => {
  const subc = collection(doc(soalCollection, day), subcollection);
  return (await getDocs(subc)).docs.map((e) => ({ id: e.id, data: e.data() }));
};
