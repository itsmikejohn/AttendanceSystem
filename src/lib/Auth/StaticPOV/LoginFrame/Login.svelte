<script>
    import { staticState } from "$lib/StateManagement/stateMapping";

	import BaniButton from "$lib/GenComp/BaniButton.svelte";
    import BaniInputs from "$lib/GenComp/BaniInputs.svelte";
	import { scale } from "svelte/transition";

    const thisComp = {
        domMsg: "",
        loader: false,
    }

    /** database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { updateDoc, doc, collection } from "firebase/firestore";

    /** firebase login function */
    const loginHandler = () =>
    {
        thisComp.loader = true;
        /** @type {string} */
        const email = $staticState.email.bindthis;
        /** @type {string} */
        const password = $staticState.password.bindthis;

        signInWithEmailAndPassword($auth, email, password)
        .then(userCred => 
        {
            updateDoc(doc(collection($db, "registeredStudents"), userCred.user.uid), {
                photoURL: $auth.currentUser?.photoURL,
                name: $auth.currentUser?.displayName,
                email: email,
                password: password,

            })

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
        <p class="text-lightYellow font-bold bg-deepBlue text-center text-xl">Attendance System</p>
    </div>

    <p class="text-center text-red-500">{thisComp.domMsg}</p>

    <BaniInputs type="email" label="Email:" placeholder="Enter your email"
    bind:this={$staticState.email}
    />
    
    <BaniInputs type="password" label="Password:" placeholder="Enter your password"
    bind:this={$staticState.password}
    />
    
    <BaniButton 
    title="Login"
    logic={thisComp.loader}
    logic_title="Logging."
    on:click={loginHandler}
    />


    
    <div class="max-w-fit">
        <button class="transition-all hover:font-semibold hover:underline w-full"
        on:click={() => $staticState.showRecover = true}
        >Forgot password</button>
    </div>
    
    <div class="max-w-fit">
        <button class="transition-all hover:font-semibold hover:underline w-full"
        on:click={() => $staticState.showSignUp = true}
        >Create account</button>
    </div>
    
</main>