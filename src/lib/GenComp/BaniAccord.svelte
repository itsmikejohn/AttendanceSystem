<svelte:options accessors />
<script>
    /** What should we call the user ? */
    export let array_data = ["Male", "Female"];
    export let title = "";

    const thisComp = {
        showData: false,
    }

    const showSelection = () => thisComp.showData = !thisComp.showData;
    
    const selectHandler = (/** @type {string} */ selected) => 
    {   
        title = selected;
        showSelection();
    }
</script>
<!--@component This component takes array_data and title-->

<main>
    <p class="px-2 font-mono font-semibold">Gender:</p>

    <button class="px-2 py-1 border-[0.1rem] border-black bg-white w-full flex items-center"
    on:click={showSelection}
    >
        <div class="w-full">
            <p class="text-left">&nbsp{title}</p>
        </div>

        <div class="w-2 h-2 border-b-2 border-r-2 border-black rotate-45">

        </div>
    </button>
</main>
{#if thisComp.showData}
    <main>
        {#each array_data as selection }
            <button class="transition-all hover:bg-slate-200 active:scale-95 w-full text-left px-2 py-1 bg-white"
            on:click={() => selectHandler(selection)}
            >{selection}</button>
        {/each}
    </main>
{/if}