"use client";  //you can use any front end framework with this, useffect usestate (BROKEN)
import Link from "next/link";
import React, {useEffect} from "react"; 
import {useRouter} from "next/navigation";
import {axios} from "axios";







export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.
    useState(false);

    const onSignup = async () => {

    }

    useEffect (() => {
      if(user.email.length > 0 && user.password.length > 0
         && user.username.length > 0){
        setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
    }, [user]
    );

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Sign Up</h1>
      <hr />
<label htmlFor="username">username</label>
<input
  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
  id="username"
  type="text"
  value={user.username}
  onChange={(e) => setUser({ ...user, username: e.target.value })}
  placeholder="username"
/>
<label htmlFor="password">password</label>
<input
  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
  id="password"
  type="password"
  value={user.password}
  onChange={(e) => setUser({ ...user, password: e.target.value })}
  placeholder="password"
/>
<label htmlFor="email">email</label>
<input
  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
  id="email"
  type="text"
  value={user.email}
  onChange={(e) => setUser({ ...user, email: e.target.value })}
  placeholder="email"
/>
<button
  onClick={onSignup}
  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
>
  {buttonDisabled ? "No signup": "Signup"}
</button>
<Link href="/login">Visit login page</Link>

</div>
    )

  }
