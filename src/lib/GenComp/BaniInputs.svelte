<svelte:options accessors />
<script>
    export let label = "Label";
    export let bindthis = "";
    export let type = "text";
    export let placeholder = "Placehold";

    
</script>
<!--@component this component takes label, bindthis(as data binder), type, placeholder-->
{#if type === "text"}
    <main>
        <p class="px-2 font-semibold font-mono">{label}</p>
        <input type="text" {placeholder} class="w-full px-2  py-1 focus:outline-none border-[0.1rem] border-black rounded-sm" 
        bind:value={bindthis}
        />
    </main>

{:else if type === "email"}
    <main>
        <p class="px-2 font-semibold font-mono">{label}</p>
        <input type="email" {placeholder} class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black rounded-sm" 
        bind:value={bindthis}
        />
    </main>

{:else if type === "password"}
    <main>
        <p class="px-2 font-semibold font-mono">{label}</p>
        <input type="password" {placeholder} class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black rounded-sm" 
        bind:value={bindthis}
        />
    </main>

{:else if type === "number"}
    <main>
        <p class="px-2 font-semibold font-mono">{label}</p>
        <input type="number" {placeholder} class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black rounded-sm" 
        bind:value={bindthis}
        />
    </main>

{:else if type === "date"}
    <main>
        <p class="px-2 font-semibold font-mono">{label}</p>
        <input type="date" {placeholder} class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black rounded-sm" 
        bind:value={bindthis}
        />
    </main>

{/if}