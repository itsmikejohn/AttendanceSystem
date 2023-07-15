<script>
    import { staticState } from "$lib/StateManagement/stateMapping";
	import BaniButton from "$lib/GenComp/BaniButton.svelte";
    import BaniInputs from "$lib/GenComp/BaniInputs.svelte";
	import { scale } from "svelte/transition";

    /** Database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { sendPasswordResetEmail } from "firebase/auth";

    const thisComp = {
        domMsg: "",
        loader: false,
    }

    /** function for firebase send reset password to student legitimate email */
    const handlerPassRecovery = () =>
    {
        /** @type {string} email */
        const email = $staticState.email.bindthis;

        thisComp.loader = true;

        sendPasswordResetEmail($auth, email)
        .then(voidResp => 
        {
            thisComp.domMsg = "Success check your email";
            thisComp.loader = false;
        })
        .catch(errorResp =>
        {
            thisComp.domMsg = errorResp.code;
            thisComp.loader = false;
        })
    }

    
</script>

<main class="p-4 flex flex-col gap-2 mt-[10vh] border-2 border-black rounded-lg bg-slate-300" in:scale>
    <div class="border-b-2 border-t-2 border-deepBlue py-1 mb-5">
        <p class="text-lightYellow font-bold bg-deepBlue text-center text-xl">Recover Account</p>
    </div>

    <p class="text-center text-red-500">{thisComp.domMsg}</p>

    <BaniInputs label="Previous Email:" placeholder="Enter your email"
    bind:this={$staticState.email}
    />
    
    <BaniButton 
    title="Send Password Reset"
    color="bg-green-500"
    logic={thisComp.loader}
    logic_title="Sending."
    on:click={handlerPassRecovery}
    
    />

    
    <div class="max-w-fit ">
        <button class="transition-all hover:font-semibold hover:underline w-full"
        on:click={() => $staticState.showRecover = false}
        >Login here</button>
    </div>
    
</main>