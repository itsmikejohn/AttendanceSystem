<script>
    import { staticState } from "$lib/StateManagement/stateMapping";
    
	import BaniButton from "$lib/GenComp/BaniButton.svelte";
    import BaniInputs from "$lib/GenComp/BaniInputs.svelte";
	import { scale } from "svelte/transition";
	import BaniAccord from "$lib/GenComp/BaniAccord.svelte";

    /** Database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
	import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";


    const thisComp = {
        domMsg: "",
        loader: false,
    }

    /** firebase register function params 
     * @param {string} email 
     * @param {string} password 
     * @param {string} gender
     * @param {string} fullname
     * @param {string} photoURL
    */
    const register = (email, password, gender, fullname, photoURL) => 
    {
        thisComp.loader = true;
        createUserWithEmailAndPassword($auth, email, password)
        .then(userCred => 
        {
            setDoc(doc(collection($db, "registeredStudents"), userCred.user.uid), {
				createdAt: serverTimestamp(),
                isPending: true,
				email: email,
				password: password,
				gender: gender,
				fullname: fullname,
				photoURL: photoURL,
			}, {merge:true})
            .then(documentRes => {
                updateProfile(userCred.user, {
                    displayName: fullname,
                    photoURL: photoURL,
                });

                thisComp.loader = false;
            });
            
        })
        .catch(errorRes =>
        {
            thisComp.domMsg = errorRes.code;
            thisComp.loader = false;
        })
    }

    const signUpHandler = () =>
    {
        /** @type {string} gender */
        const gender = $staticState.gender.title;

        /** @type {string} fullname */
        const fullname = $staticState.fullname.bindthis;

        /** @type {string} email */
        const email = $staticState.email.bindthis;

        /** @type {string} password */
        const password = $staticState.password.bindthis;

        /** @type {string} confirmPassword */
        const confirmPassword = $staticState.confirmPassword.bindthis;

        /** @type {string} photoURL */
        let photoURL;

        if(confirmPassword === password)
        {
            if(gender.trim().length > 2 && password.trim().length > 5)
            {
                if(gender === "Male")
                {
                    photoURL = "https://em-content.zobj.net/source/telegram/358/man-police-officer_1f46e-200d-2642-fe0f.webp";
                    register(email, password, gender, fullname, photoURL);
                }else if(gender === "Female")
                {
                    photoURL = "https://em-content.zobj.net/source/telegram/358/woman-police-officer_1f46e-200d-2640-fe0f.webp";
                    register(email, password, gender, fullname, photoURL);
                }

            }else
            {
                thisComp.domMsg = "Check gender or password must not weak";
            }
        }else
        {
            thisComp.domMsg = "Password not same";
        }
    }
    
</script>

<main class="p-4 flex flex-col gap-2 mt-[10vh] border-2 border-black rounded-lg bg-slate-300" in:scale>

    <div class="border-b-2 border-t-2 border-deepBlue py-1 mb-5">
        <p class="text-lightYellow font-bold bg-deepBlue text-center text-xl">Registeration</p>
    </div>

    <p class="text-center text-red-500">{thisComp.domMsg}</p>

    <BaniAccord 
    bind:this={$staticState.gender}
    />

    <BaniInputs label="Fullname:" placeholder="Enter your fullname"
    bind:this={$staticState.fullname}
    />

    <BaniInputs type="email" label="Email:" placeholder="Enter your email"
    bind:this={$staticState.email}
    />

    <BaniInputs type="password" label="Password:" placeholder="Enter your password"
    bind:this={$staticState.password}
    />

    <BaniInputs type="password" label="Confirm password:" placeholder="Confirm your password"
    bind:this={$staticState.confirmPassword}
    />

    <BaniButton 
    title="Signup"
    logic={thisComp.loader}
    logic_title="Signing."
    on:click={signUpHandler}
    />

   
    <div class="max-w-fit">
        <button class="transition-all hover:font-semibold hover:underline w-full"
        on:click={() => $staticState.showSignUp = false}
        >Login here</button>
    </div>
    
</main>