<script>
    import { adminState } from "$lib/StateManagement/stateMapping";
	import BaniButton from "$lib/GenComp/BaniButton.svelte";
	import BaniInputs from "$lib/GenComp/BaniInputs.svelte";
	import { scale } from "svelte/transition";

    /** Database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { addDoc, collection, serverTimestamp, } from "firebase/firestore";

    const thisComp = {
        domMsg: "",
        loader: false,
    }

    /** this function will submit created subject data to db */
    const createClassHandler = () =>
    {
        const subject = $adminState.subject.bindthis;
        const teacher = $adminState.teacher.bindthis;
        const description = $adminState.description.bindthis;
        thisComp.loader = true;

        addDoc(collection($db, "createdSubjects"), {
            createdAt: serverTimestamp(),
            subject: subject,
            teacher: teacher,
            description: description,
        })
        .then(documentResp =>
        {
            thisComp.loader = false;
            $adminState.createSubject = false;
        })
        .catch(errorResp =>
        {
            thisComp.loader = false;
        })
    }

</script>

<main>
    <div class="max-w-fit ml-5">
        <BaniButton color="bg-yellow-500" title="Create Subject" on:click={() => $adminState.createSubject = true}/>
    </div>


    {#if $adminState.createSubject}
        <section class="fixed bottom-0 top-0 left-0 right-0  z-10 p-2 sm:p-0" id="colorMe" >
            <main class="mx-auto max-w-xl mt-[10vh] p-4 border-2 border-black rounded-lg bg-slate-300" transition:scale>
                <div class="border-b-2 border-t-2 border-yellow-500 py-1">
                    <p class="bg-yellow-500 font-semibold text-center">Create Subject</p>
                </div>

                <BaniInputs label="Subject name:" placeholder="Enter subject name"
                bind:this={$adminState.subject}
                />

                <BaniInputs label="Teacher:" placeholder="Enter teacher name"
                bind:this={$adminState.teacher}
                />

                <BaniInputs label="Description:" placeholder="Enter subject description"
                bind:this={$adminState.description}
                />
                <section class="flex gap-1 mt-2">

                    <BaniButton title="Create"
                    logic={thisComp.loader}
                    logic_title="Creating."
                    on:click={createClassHandler}
                    /> 
                    <BaniButton title="Cancel" on:click={() => $adminState.createSubject = false} 
                        
                        />

                </section>
            </main>
        </section>
    {/if}
</main>

<style>
    #colorMe{
        background-color: rgba(0, 0, 0, 0.543);
    }
</style>