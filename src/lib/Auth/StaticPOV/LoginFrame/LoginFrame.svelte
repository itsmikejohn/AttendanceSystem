<script>
    import { staticState } from "$lib/StateManagement/stateMapping";

    import Login from "./Login.svelte";
    import SignUp from "./SignUp.svelte";
    import RecoverPass from "./RecoverPass.svelte";

</script>

<main class="mx-auto max-w-xs ">
    {#if $staticState.showSignUp}
        <SignUp />
    {:else if $staticState.showRecover}
        <RecoverPass />
    {:else}
        <Login />
    {/if}
</main>