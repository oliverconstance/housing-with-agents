import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  projectId: "housing-with-agents"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const querySnapshot = await getDocs(collection(db, 'factChecks'));
  querySnapshot.forEach((doc) => {
    console.log(JSON.stringify(doc.data(), null, 2));
  });
}
run();
