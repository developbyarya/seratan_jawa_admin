import { getDoc, doc, collection } from "firebase/firestore";
import { db } from "../utils/firestore_config";

export const getTipe = async () => {
  const collc = collection(db, "types");
  return (await getDoc(doc(collc, "tipe_soal"))).data();
};
