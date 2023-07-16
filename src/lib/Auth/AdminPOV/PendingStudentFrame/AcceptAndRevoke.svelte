<script>
    import BaniButton from "$lib/GenComp/BaniButton.svelte";

    export let id = "";

    /** Data base calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";


    const handleAccept = () => updateDoc(doc(collection($db, "registeredStudents"), id), {isPending: false,})

    const handlerRevoke = () => updateDoc(doc(collection($db, "registeredStudents"), id), {isPending: true,})

    let showBtn = false;
    onSnapshot(doc(collection($db, "registeredStudents"), id), /** @param {any} snapResp */snapResp =>
    {
        snapResp.data().isPending ? showBtn = true : showBtn = false;
    })
    
</script>
{#if showBtn}
    <BaniButton title="Accept" on:click={handleAccept}/>
{:else}
   <BaniButton color="bg-red-500" title="Revoke" on:click={handlerRevoke}/>
{/if}
