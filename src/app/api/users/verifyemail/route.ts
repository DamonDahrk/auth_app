import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";



connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()  // get the body
        const {token} = reqBody         // get the token from the body
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});   // find the user with the token

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})  //user doesnt match the token then then return an error
        }
        console.log(user);

        user.isVerfied = true;                      // set the isVerified to true
        user.verifyToken = undefined;               // clear the token and expiry time
        user.verifyTokenExpiry = undefined;
        await user.save();               // save the user   
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}