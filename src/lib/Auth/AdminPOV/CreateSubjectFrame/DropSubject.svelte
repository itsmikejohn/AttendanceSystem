<script>
    import BaniButton from "$lib/GenComp/BaniButton.svelte";

    /** database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";

    /** @type {any} */
    export let subjectInfo;
    
    const thisComp = {
        loader: false,
    }

    const dropSubjectHandler = () =>
    {
        
        getDocs(collection($db, "attendedStudents"))
        .then(snapsResp =>
        {
            snapsResp.docs.forEach(docResp =>
            {
                if(docResp.data().targetUID === subjectInfo.originUID)
                {
                    thisComp.loader = true;
                    deleteDoc(doc(collection($db, "attendedStudents"), docResp.id))
                    .then(voidResp => thisComp.loader = false)
                    
                }
            })
        })
        .finally(() => {
            thisComp.loader = true;
            deleteDoc(doc(collection($db, "createdSubjects"), subjectInfo.id))
            .then((voidResp) => thisComp.loader = false)
        })
        
    }

</script>

<BaniButton 
color="bg-red-500" 
title="Drop"
logic={thisComp.loader}
logic_title="Dropping.."
on:click={dropSubjectHandler}
/>

