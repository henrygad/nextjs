import dbConnection from "@/src/dbConfig/db";
import Users from "@/src/models/userModel";
import authenticate from "@/src/utils/authenticate";
import sendEmail from "@/src/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    try {

        await dbConnection(); // Connect DB
        const user = await authenticate(request);
        const { _id, userName, email } = user;

        const OTP: string = Math.floor(10000 + Math.random() * 90000).toString(); // Generate random OTP token
        await Users.findOneAndUpdate({ _id }, // Update user verification token with OTP 
            {
                verificationToken: OTP,
                verificationTokenExpiryData: Date.now() + (1000 * 60 * 5), // OTP expires in 5 mins
            },
            { runValidators: true, }
        ).catch(() => {
            throw ("User was not found");
        });

        // Send email verification OTP token to the user mail
        sendEmail({ type: "VERIFY", userName, emailTo: email, OTP });

        return NextResponse.json({
            msg: `Successfully sent OTP to user email, ${email}`,
            ok: true,
        }, { status: 200 });

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


export async function POST(request: NextRequest) {

    try {

        await dbConnection(); // Connect DB
        const reqBody = await request.json(); // Get requests
        const { OTP } = reqBody;

        const user = await authenticate(request);
        const { _id, verificationToken, verificationTokenExpiryData } = user;

        // Varify user 
        if (OTP?.trim() !== verificationToken?.trim() || Date.now() > verificationTokenExpiryData) throw ('Invalid or expired OTP');

        await Users.findOneAndUpdate({ _id }, // Update user verifications data
            {
                isVerified: true,
                verificationToken: '',
                verificationTokenExpiryData: 0,
            },
            { runValidators: true }
        ).catch(() => {

            throw ("User was not found");
        });

        return NextResponse.json({
            msg: 'Successfully verified user',
            ok: true,
        }, { status: 200 });

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
