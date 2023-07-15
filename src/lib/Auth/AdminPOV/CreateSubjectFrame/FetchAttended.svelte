<script>
    import { adminState } from "$lib/StateManagement/stateMapping";

    /** @type {any} subjectInfo  */
    export let subjectInfo;

    /** Database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
    
    /**Fetch attended students to specific subject */
    onSnapshot(query(collection($db, "attendedStudents"), orderBy("createdAt", "asc")),  snapsResp =>
    { 
        /** @type {any} */
        let fbData = [];
        snapsResp.docs.forEach(doc => 
        {   
            let mutatedData = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
            let date = mutatedData.toLocaleTimeString() + ", " + mutatedData.toDateString();
            let data = {...doc.data(), id: doc.id, date: date}
            fbData = [data, ...fbData];

        })
        $adminState.fetchAttended = fbData;
    })
</script>

<section class=" p-2">
    {#each $adminState.fetchAttended as attendance}
        {#if subjectInfo.originUID === attendance.targetUID}
            <section class="items-center mt-2 bg-slate-300 p-2">
                <div class="">
                    <img src={attendance.photoURL} alt="loading" class="w-10" />
                </div>
    
                <div class="">
                    <p class="px-2 font-semibold">{attendance.name}</p>
                    <p class="px-2">{attendance.date}</p>
                </div>
            </section>
        {/if}
   {/each}
</section> 