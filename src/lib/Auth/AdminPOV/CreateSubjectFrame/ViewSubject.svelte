<script>
    import { adminKey, adminState } from "$lib/StateManagement/stateMapping";
    import { scale } from "svelte/transition";
    import BaniButton from "$lib/GenComp/BaniButton.svelte";

    /** @type {any} */
    export let subjectInfo;

    /** database calls */
    import { auth } from "$lib/Database/firebaseConfig";
	import Attend from "$lib/Auth/StudentPOV/SubjectFrame/Attend.svelte";
	import FetchAttended from "./FetchAttended.svelte";
	import ClearAttendance from "./ClearAttendance.svelte";
	
</script>

<main class="fixed top-0 bottom-0 left-0 right-0 bg-white z-10 p-2 sm:p-0" id="colorMe">
    <section class="mx-auto max-w-xl mt-[10vh] p-4 border-2 border-black rounded-lg bg-white" transition:scale>
        <div class="border-b-2 border-t-2 border-lightYellow py-1">
            <p class="bg-lightYellow font-semibold text-center ">{subjectInfo.subject}</p>
        </div>

        <!--Logic for admin nav-->
        {#if $auth.currentUser?.uid === $adminKey}
            <section class="mt-2 flex gap-1 ">
                <div class="w-full ">
                    <BaniButton title="Back" on:click={() => $adminState.subjectComparison = 0.1}/>
                </div>
                <!--Clear Attendance component-->
                <ClearAttendance {subjectInfo}/>
                
            </section>
        {:else}
            <main class="flex gap-1 mt-2">
                <section class="w-full ">
                    <BaniButton title="Back" on:click={() => $adminState.subjectComparison = 0.1}/>
                </section>
                <!--Attend component-->
                <Attend {subjectInfo}/>
            </main>

        {/if}
        <main class="max-h-[60vh] overflow-y-scroll border-2 border-lightYellow bg-white p-2 mt-2">
            
            <section class="flex items-center">
                <p class="w-full font-bold">Student Attended: </p>

                <div class="flex w-full">
                    <input type="text" class="w-full border-2 border-r-0 border-deepBlue focus:outline-none px-2" />
                    <button class="transition-all hover:font-semibold  active:scale-95  border-2 border-deepBlue px-2 bg-black text-white"
                    >Search</button>
                </div>
            </section>

            <!--Main Screen for student attendance-->
            <FetchAttended {subjectInfo}/>

        </main>

    </section>
</main>

<style>
    #colorMe{
        background-color: rgba(0, 0, 0, 0.543);
    }
</style>