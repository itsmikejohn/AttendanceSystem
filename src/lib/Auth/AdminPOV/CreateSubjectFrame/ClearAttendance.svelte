
<script>
    import BaniButton from "$lib/GenComp/BaniButton.svelte";

    /** Database calls*/
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";

    /** @type {any} */
    export let subjectInfo;

    const thisComp = {
        loader: false,
    }

    /** Clear attendance */
    const clearAttendaceHandler = () =>
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
                    .then(voidResp =>
                    {
                        thisComp.loader = false;
                    })
                }
            })
        })
    
    }   
</script>

<div class="w-full ">
    <BaniButton 
    color="bg-red-500" 
    title="Clear Attendance"
    logic={thisComp.loader}
    logic_title="Clearing."
    on:click={clearAttendaceHandler}
    />
</div>