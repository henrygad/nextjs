import dbConnection from "@/src/dbConfig/db";
import Users from "@/src/models/userModel";
import sendEmail from "@/src/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {

        await dbConnection(); // Connect DB

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email') || '';

        // get user by email
        const getUser = await Users.findOne({ email });
        if (!getUser) throw ('There is no account with this email');
        const { _id, userName, email: userEmail } = getUser;

        const OTP: string = Math.floor(10000 + Math.random() * 90000).toString(); // Generate random OTP token
        await Users.findOneAndUpdate({ _id }, // Update user forget passWord token with OTP 
            {
                forgetPassWordToken: OTP,
                forgetPassWordTokenExpiryData: Date.now() + (1000 * 60 * 5), // OTP expires in 5 mins
            },
            { runValidators: true, }
        ).catch(() => {

            throw ("User was not found");
        });

        // Send email verification OTP token to the user mail
        sendEmail({ type: "RESET", userName, emailTo: userEmail, OTP });

        return NextResponse.json({
            msg: `Successfully sent OTP to user email, ${email}`,
            ok: true,
        }, { status: 200 });

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({
                msg: 'User not found',
                ok: false,
            }, { status: 401 });
        };

        return NextResponse.json({
            msg: String(error),
            ok: false,
        }, { status: 401 });
    };
};


export async function POST(request: NextRequest) {

    try {

        await dbConnection(); // Connect DB

        const reqBody = await request.json(); // Get requests
        const { email, OTP } = reqBody;

        // Varify user otp
        const user = await Users.findOne({ email, forgetPassWordToken: OTP });
        if (!user) throw ('Invalid OTP');

        // Check expired data
        const { forgetPassWordTokenExpiryData } = user;
        if (Date.now() > forgetPassWordTokenExpiryData) throw ('OTP has expired. Please send a new one');

        // Reset user data
        user.forgetPassWordToken = '';
        user.forgetPassWordTokenExpiryData = 0
        await user.save();

        const response = NextResponse.json({
            msg: ['Successfully verified user. You can now rest your password', { url: 'http://localhost:3000/api/password/reset' }],
            ok: true,
        }, { status: 200 });
        
        const token = {
            email,
            expiryDate: Date.now() + (1000 * 60 * 5), // OTP expires in 5 mins ,
        };

        const fiveMins = 60 * 5 // five minutes seconds;
        response.cookies.set('resetPassWord', JSON.stringify(token), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: fiveMins,
        })

        return response;

    } catch (error) {

        if(error instanceof Error){
            return NextResponse.json({
                msg: error,
                ok: false,
            }, { status: 401 });
        };

        return NextResponse.json({
            msg: String(error),
            ok: false,
        }, { status: 401 });
    };
};
