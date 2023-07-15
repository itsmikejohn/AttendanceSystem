<script>
    import { staticState, adminKey } from "$lib/StateManagement/stateMapping";

    import StaticPOV from "./StaticPOV/StaticPOV.svelte";
    import AdminPOV from "./AdminPOV/AdminPOV.svelte";
    import StudentPOV from "./StudentPOV/StudentPOV.svelte";


    //database calls
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { onAuthStateChanged } from "firebase/auth";
	import Nav from "./Nav.svelte";

    onAuthStateChanged($auth, userCredResp => 
    {
        if(userCredResp)
        {
            $staticState.hadAuth = true;

            if(userCredResp.uid === $adminKey)
            {
                $staticState.activeItem = "Create Subject";
                $staticState.array_data = $staticState.adminNav;
                $staticState.hadAdmin = true;
                $staticState.hadStudent = false;
            }else
            {
                $staticState.activeItem = "Subjects";
                $staticState.array_data = $staticState.studentNav;
                $staticState.hadAdmin = false;
                $staticState.hadStudent = true;
            }
        }else
        {
            $staticState.hadAdmin = false;
            $staticState.hadStudent = false;
            $staticState.hadAuth = false;
        }
    })

</script>

<main>
    {#if $staticState.hadAuth}
        <Nav array_data={$staticState.array_data}/>
        {#if $staticState.hadAdmin}
            <AdminPOV />
        {:else if $staticState.hadStudent}
            <StudentPOV />
        {/if}

    {:else}
        <StaticPOV />
    {/if}
</main>