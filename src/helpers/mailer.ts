import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

//This code defines a utility function sendEmail in a Node.js app that helps send verification or password reset emails to users.
//  It uses the nodemailer library for email sending

//Creates a transport using Mailtrap’s test SMTP server (good for development).
//Credentials (user, pass) go in the transport object.
//Tokens with expiries limit loopholes by allowing only short-lived access to sensitive operations.

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hahsed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        //hashing the user ID

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
                
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }


var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ea2637f0ff0769",
    pass: "b4e2cc4d6a937a"
  }
});


        const mailOptions = {
            from: 'samillow@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}