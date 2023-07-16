<script>
    import { adminState } from "$lib/StateManagement/stateMapping";

    /** Database calls */
    import { auth, db } from "$lib/Database/firebaseConfig";
    import { onSnapshot, collection, orderBy, query, where, getDocs } from "firebase/firestore";

    const searchHandler = () =>
    {
        getDocs(query(collection($db, "attendedStudents"), where("name", "==", $adminState.searchValue)))
        .then(snapsResp =>
        {
            /** @type {any} */
            let fbData = [];
            snapsResp.docs.forEach(doc => 
            {   

                if(doc.data())
                {
                    let mutatedData = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
                    let date = mutatedData.toLocaleTimeString() + ", " + mutatedData.toDateString();
                    let data = {...doc.data(), id: doc.id, date: date}
                    fbData = [data, ...fbData];
                    $adminState.fetchAttended = fbData;
                }

            })
            
        })

    }

    const detectKey = () =>
    {
        if($adminState.searchValue.trim().length === 0)
        {
            onSnapshot(query(collection($db, "attendedStudents"), orderBy("createdAt", "asc")),  snapsResp =>
            { 
                /** @type {any} */
                let fbData = [];
                snapsResp.docs.forEach(doc => 
                {   
                    let mutatedData = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
                    let date = mutatedData.toLocaleTimeString() + ", " + mutatedData.toDateString();
                    let data = {...doc.data(), id: doc.id, date: date}
                    fbData = [data, ...fbData];

                })
                $adminState.fetchAttended = fbData;
            })
        }
        
    }

</script>
<!--@component this component deals with search algorithm bullshts!-->

<div class="flex w-full">
    <input type="text" class="w-full border-2 border-r-0 border-deepBlue focus:outline-none px-2" placeholder="Search by name"
    bind:value={$adminState.searchValue}
    on:keyup={detectKey}
    />
    
    <button class="transition-all hover:font-semibold  active:scale-95  border-2 border-deepBlue px-2 bg-black text-white"
    on:click={searchHandler}
    >Search</button>

</div>
