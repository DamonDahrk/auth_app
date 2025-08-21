"use client";  //you can use any front end framework with this, useffect usestate (BROKEN)
import Link from "next/link";
import React from "react"; 
import {useRouter} from "next/navigation";
import {axios} from "axios";





export default function LoginPage(){
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const onSignup = async () => {

    }

    //anything that will to db uses async



    return(
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Login </h1>
        </div>
    )
}