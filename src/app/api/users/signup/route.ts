import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest){
    try{    const reqBody = await request.json();
        const {email, username, password} = reqBody;

        console.log(reqBody);

        // check if user exist
        const user = await User.findOne({email});
        
      if(user){
    return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
    );
}

        
        // Hash password
        const salt = await bcryptjs.genSalt(10); 
        // Generate a salt with 10 rounds
        const hashedPassword = await bcryptjs.hash(password, salt); 
        // Hash the password using the salt

        const newUser = new User({
        username, // Username of the new user
        email,    // Email of the new user
        password: hashedPassword // Store only the hashed password
});

const savedUser = await newUser.save()
console.log(savedUser);

return NextResponse.json({
    message: "User created successfully",
    success: true,
    user: savedUser
}, {status: 201})

    } catch (error: any){
        return NextResponse.json({error: error.message},
        {status: 500})

    }


}