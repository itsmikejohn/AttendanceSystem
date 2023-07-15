<script>
    import BaniButton from "$lib/GenComp/BaniButton.svelte";

    export let id = "";

    /** Data base calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { collection, doc, updateDoc } from "firebase/firestore";


    const handleAccept = () => updateDoc(doc(collection($db, "registeredStudents"), id), {isPending: false,})

    const handlerRevoke = () => updateDoc(doc(collection($db, "registeredStudents"), id), {isPending: true,})
    
</script>

<BaniButton title="Accept" on:click={handleAccept}/>

<BaniButton color="bg-red-500" title="Revoke" on:click={handlerRevoke}/>