<script>
    import { adminKey, adminState } from "$lib/StateManagement/stateMapping";
    import BaniAccord from "$lib/GenComp/BaniAccord.svelte";
	import PendingAccordion from "./PendingAccordion.svelte";

    /** Database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { onSnapshot, collection } from "firebase/firestore";
	

    /** Get registered student from db */
    onSnapshot(collection($db, "registeredStudents"), snapsResp =>
    {   
        /** @type {any} */
        let fbData = [];
        let result;
        snapsResp.docs.forEach(doc => 
        {
            let mutatedData = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
            let date = mutatedData.toLocaleTimeString() + ", " + mutatedData.toDateString();
            let data = {...doc.data(), id: doc.id, date: date};
            fbData = [data, ...fbData];

            result = fbData.filter(/** @param {any} item */ item => item.id != $adminKey )

        })
        $adminState.fetchPendingStud = result;
    })
</script>

<main class="sm:max-w-xl mx-auto p-2 sm:p-0">
    <section class="border-b-2 border-t-2 border-lightYellow py-1">
        <p class="px-2 bg-lightYellow text-center font-semibold">Pending Students</p>
    </section>

    <div class="p-2 bg-white border-2 border-deepBlue max-h-[70vh] overflow-y-scroll mt-2">

        
        
        {#each $adminState.fetchPendingStud as pending }
            <section class="mt-2">
                <PendingAccordion 
                date={pending.date}
                email={pending.email}
                fullname={pending.fullname}
                gender={pending.gender}
                isPending={pending.isPending}
                password={pending.password}
                photoURL={pending.photoURL}
                id={pending.id}
                />
            </section>
        {/each}
    </div>
</main>