import { fsDatabase } from "./firebase-config";
import { setDoc, doc} from "firebase/firestore";

async function addDataCustomIdFS(id,username,email) {
    try {
        await setDoc(doc(fsDatabase, "users", id), {
         profile:{
         userName:username,
         email:email,
         url:"",
         },
         feedbacks:[],
         id:id
        }
        
        );
        console.log("Document written with ID: ", id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

  export {addDataCustomIdFS}