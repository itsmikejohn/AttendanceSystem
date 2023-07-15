<script>
    import { staticState } from "$lib/StateManagement/stateMapping";
    import Pending from "./PendingFrame/Pending.svelte";
    import SubjectFrame from "./SubjectFrame/SubjectFrame.svelte";


    /** Database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { collection, doc, onSnapshot } from "firebase/firestore";

    const thisComp = {
        isPending: true,
    }

    /** This will constantly check if you are approved to navigate or not */
    onSnapshot(doc(collection($db, "registeredStudents"), $auth.currentUser?.uid), 
    /** @param {any} snapResp */ snapResp => thisComp.isPending = snapResp.data().isPending )
    

</script>

<main class="mt-20">
    {#if thisComp.isPending}
        <Pending />
    {:else}
        {#if $staticState.activeItem === "Subjects"}
            <SubjectFrame />
        {/if}
    {/if}
</main>