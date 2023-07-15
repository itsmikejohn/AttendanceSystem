<script>
    import { staticState } from "$lib/StateManagement/stateMapping";
    
    import BaniButton from "$lib/GenComp/BaniButton.svelte";
	import { fly } from "svelte/transition";

    /** Database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { signOut } from "firebase/auth";

	export let array_data = ["Attendance System"];

    const thisComp = {
        showMenu: false,
    }

    const showMenu = () => thisComp.showMenu = !thisComp.showMenu;
    
    /**@param {string} selectedData */
    const selectHandler = selectedData => ( $staticState.activeItem = selectedData, showMenu() )
    
</script>
<!--@component this nav takes array_data depends on authentication student or admin-->

<main class="transition-all fixed w-full top-0 z-10 left-0 right-0 bg-deepBlue p-2 flex items-center">
    
    <div class="w-full">
        <button class="flex flex-col gap-1 p-2 transition-all hover:bg-blue-500 active:scale-95"
        on:click={showMenu}
        >
            <div class="w-8 border-b-4 border-slate-100"></div>
            <div class="w-8 border-b-4 border-slate-100"></div>
            <div class="w-8 border-b-4 border-slate-100"></div>
        </button>
    </div>

    <div class="">
        <BaniButton color="bg-red-500" title="Logout" on:click={() => signOut($auth)}/>
    </div>

</main>

{#if thisComp.showMenu}
    <main class="fixed bottom-0 top-0 left-0 bg-deepBlue z-10 w-[70%] sm:w-[30%] lg:w-[15%]" in:fly={{x:-300, duration:600}}>
        <submain class="float-right p-2">
            <button class="px-2 py-4 transition-all hover:bg-blue-500 active:scale-95"
            on:click={showMenu}
            >
                <div class="w-8 border-b-4 border-slate-100 rotate-45 absolute"></div>
                <div class="w-8 border-b-4 border-slate-100 rotate-[-45deg]"></div>
            </button>
        </submain>

        <div class="mt-16 mx-2">
            <div class="border-b-2 border-t-2 py-1">
                <p class="text-lightYellow text-center font-bold text-2xl">Attendance System</p>
            </div>

            <div class="flex items-center p-2 gap-2 mt-2 border-b-2 flex-wrap justify-center">
                <img src={$auth.currentUser?.photoURL} alt="loading" class="w-16 rounded-full bg-slate-200" />
                <div class="text-white font-semibold">
                    <p>{$auth.currentUser?.displayName}</p>
                    <p>{$auth.currentUser?.email}</p>
                </div>
            </div>
        </div>

        <div class="mt-4 p-2">
            {#each array_data as selection }
                <button class="transition-all hover:bg-lightYellow hover:text-black text-white font-semibold text-left text-lg w-full p-2"
                class:active={$staticState.activeItem === selection}
                on:click={() => selectHandler(selection)}
                >{selection}</button>
            {/each}
            
         
        </div>
        
    </main>
{/if}

<style>
    .active{
        background-color: #fadd24b1;
        color: black;
    }
</style>