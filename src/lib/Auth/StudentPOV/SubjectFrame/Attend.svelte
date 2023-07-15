<script>
    import BaniButton from "$lib/GenComp/BaniButton.svelte";

    /** @type {any} prop drilled to the main component fetch subject */
    export let subjectInfo;

    /** database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { addDoc, setDoc, collection, serverTimestamp, doc, onSnapshot } from "firebase/firestore";


    let showAttendBtn = false;

    onSnapshot(doc(collection($db, "attendedStudents"), subjectInfo.id + $auth.currentUser?.uid), /** @param {any} snapResp*/ snapResp =>
    {
        snapResp.data().ownerUID === $auth.currentUser?.uid ? showAttendBtn = true : showAttendBtn = false
       
    })

    const thisComp = {
        loader: false,
    }
    /** handle attend function that saves to database */
    const attendHandler = () => 
    {
        thisComp.loader = true;
        setDoc(doc(collection($db, "attendedStudents"), subjectInfo.id + $auth.currentUser?.uid), {
            createdAt: serverTimestamp(),
            ownerUID: $auth.currentUser?.uid,
            targetUID: subjectInfo.id,
            name: $auth.currentUser?.displayName,
            email: $auth.currentUser?.email,
            photoURL: $auth.currentUser?.photoURL,
        }, {merge:true})
        .then(voidRes =>
        {
            thisComp.loader = false;
        })
        .catch(errorResp => 
        {
            console.log(errorResp.code);
            thisComp.loader = false;
        })
    }


</script>
{#if !showAttendBtn}
    <main class="w-full">
        <section class="w-full">
            <BaniButton 
            color="bg-green-600" 
            title="Attend"
            logic={thisComp.loader}
            logic_title="Attending."
            on:click={attendHandler}
            />
        </section>
    </main>
{/if}
