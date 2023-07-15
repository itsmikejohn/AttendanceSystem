import { writable } from "svelte/store";
export const adminKey = writable("nhKTjMmvNXWBxyS53pFcg9GijbS2");
export const adminState = writable({
    //create subject
    createSubject: false,

    /** @type {any} */
    subject: "",
    /** @type {any} */
    teacher: "",
    /** @type {any} */
    description: "",
    /** @type {any} */
    subjectArray: [],

    subjectComparison: 0.1,
    /** @type {any} */
    fetchAttended: [],

    //pending students
    /** @type {any} */
    fetchPendingStud: [],
})

export const studentState = writable({

})

export const staticState = writable({
    //nav state
    hadStudent: false,
    hadAdmin: false,
    hadAuth: false,
    activeItem: "",
    adminNav: ["Create Subject", "Pending Students"],
    studentNav: ["Subjects"],
    array_data: ["Checking Internet"],

    //Login states
    showSignUp: false,
    showRecover: false,
    
    /**  @type {any} gender binds to svelte component idk so i just use any */
    gender: "",
    /**  @type {any} fullname binds to svelte component idk so i just use any */
    fullname: "",
    /**  @type {any} email binds to svelte component idk so i just use any */
    email: "",
    /**  @type {any} password binds to svelte component idk so i just use any */
    password: "",
    /**  @type {any} confirmPassword binds to svelte component idk so i just use any */
    confirmPassword: "",


})



