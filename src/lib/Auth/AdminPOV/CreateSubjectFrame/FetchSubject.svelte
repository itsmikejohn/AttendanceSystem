<script>
    import { adminKey, adminState } from "$lib/StateManagement/stateMapping";
    import BaniButton from "$lib/GenComp/BaniButton.svelte";

    /** database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { onSnapshot, collection, orderBy, query, updateDoc, doc } from "firebase/firestore";
	import ViewSubject from "./ViewSubject.svelte";
	import DropSubject from "./DropSubject.svelte";

    
    /** Get get created subjects data from database */
    onSnapshot(query(collection($db, "createdSubjects"), orderBy("createdAt", "desc")), snapsResp =>
    {
        /** @type {any} */
        let fbData = [];
        snapsResp.docs.forEach(doc =>
        {   
            let mutatedData = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
            let date = mutatedData.toLocaleTimeString() + ", " + mutatedData.toDateString();

            let data = {...doc.data(), id: doc.id, date: date};
            fbData = [data, ...fbData];
        })
        $adminState.subjectArray = fbData;
    })

    /** view handler that also makes marking to the created subject id
     * @param {any} subjectInfo
     * @param {number} outerIndex
     */
    const viewHandler = (subjectInfo, outerIndex) => 
    {
        updateDoc(doc(collection($db, "createdSubjects"), subjectInfo.id), {
            originUID: subjectInfo.id,
        })
        .then(voidResp => $adminState.subjectComparison = outerIndex)
    }

</script>

<main class="p-2 md:p-0 flex flex-wrap">
    {#each $adminState.subjectArray as subjectInfo, outerIndex}
        <section class="border-2 border-deepBlue mt-10 sm:ml-10 max-w-xl h-fit p-4 flex flex-col gap-2 bg-white break-words">
            <div class="border-b-2 border-t-2 border-lightYellow py-1">
                <p class="bg-lightYellow text-center text-deepBlue font-semibold">{subjectInfo.subject}</p>
            </div>
            <section>
                <p class="font-semibold">Date Open:</p>
                <p class="px-2">{subjectInfo.date}</p>
            </section>

            <section>
                <p class="font-semibold">Teacher Name:</p>
                <p class="px-2">{subjectInfo.teacher}</p>
            </section>

            <section>
                <p class="font-semibold">Description:</p>
                <p class="px-2">{subjectInfo.description}</p>
            </section>

            <section class="flex gap-1">

                <BaniButton title="View"
                on:click={() => viewHandler(subjectInfo, outerIndex)}
                />
                
                {#if $auth.currentUser?.uid === $adminKey}
                    <DropSubject {subjectInfo}/>
                {/if}
            </section>

        </section>
        {#if $adminState.subjectComparison === outerIndex}
            <ViewSubject {subjectInfo}/>
        {/if}
    {/each}
   
</main>