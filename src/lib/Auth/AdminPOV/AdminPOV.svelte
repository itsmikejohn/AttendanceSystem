<script>
    import { staticState } from "$lib/StateManagement/stateMapping";
	import CreateSubjectFrame from "./CreateSubjectFrame/CreateSubjectFrame.svelte";
	import PendingStudentFrame from "./PendingStudentFrame/PendingStudentFrame.svelte";

</script>

<main class="mt-20">
    {#if $staticState.activeItem === "Create Subject"}
        <CreateSubjectFrame />
    {:else if $staticState.activeItem === "Pending Students"}
        <PendingStudentFrame />
    {/if}
</main>