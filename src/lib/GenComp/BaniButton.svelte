<script>
    export let title = "Btn";
    export let color = "bg-deepBlue";
    export let logic = false;
    export let logic_title = "Btn loading";

</script>

<!--@component This component takes title, color, logic for loading, logic_title for loading title-->

<button class="transition-all hover:opacity-50 active:scale-95 {color} w-full px-2 py-1 text-slate-200 font-semibold rounded-sm"
on:click
>
    {#if logic}
        <div class="flex gap-1 items-center justify-center">
            <p>{logic_title}</p>
            <div class="w-4 h-4 border-2 border-white rounded-full border-b-deepBlue animate-spin"></div>
        </div>
    {:else}
        <p>{title}</p>
    {/if}
</button>