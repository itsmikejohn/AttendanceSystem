<script>  

    import { slide } from "svelte/transition";
	import AcceptAndRevoke from "./AcceptAndRevoke.svelte";
    export let id = "";
    export let date = "";
    export let email = "";
    export let fullname = "Sample";
    export let gender = "";
    export let isPending = "";
    export let photoURL = "";

    const thisComp = {
        showMenu: false,
    }

    const showMenu = () => thisComp.showMenu = !thisComp.showMenu;

</script>
<!-- @component this component takes array_data as menu and takes title as bind value-->
<button class="flex items-center w-full border-2 border-black px-2 py-1 text-left bg-slate-400"
on:click={showMenu}
>

    <section class="w-full">
        <p>{fullname}</p>
    </section>

    <div class="w-2 h-2 border-b-2 border-r-2 border-black rotate-45">

    </div>
</button>

{#if thisComp.showMenu}
    <main class="border-2 border-black mt-1 flex flex-col gap-2 p-2 bg-slate-400" in:slide>
        <section>
            <img src={photoURL} alt="loading" class="w-20"/>
        </section>

        <section class="px-4">
            <p><b>Account Status:</b> {#if isPending} <b class="bg-red-500 px-2 text-white">In waiting list</b> {:else} <b class="bg-green-500 px-2 text-white">Accepted</b> {/if}</p>
            <p><b>Date:</b> {date}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Fullname:</b> {fullname}</p>
            <p><b>Gender:</b> {gender}</p>
        </section>

        <section class="flex gap-1">
            <AcceptAndRevoke {id}/>
        </section>
    </main>
{/if}