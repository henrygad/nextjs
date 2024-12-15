import dbConnection from "@/src/dbConfig/db";
import authenticate from "@/src/utils/authenticate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {

        await dbConnection(); // Connect DB
        const user = await authenticate(request);
        const { userName, email } = user;
        
        const response = NextResponse.json({
            msg: 'User is login',
            data: {userName, email},
            ok: true,
        }, { status: 200 });
        
        // If user is login, always create new user token cookies that expires after 1hr.
        const oneHour = 3600 // 1hour in seconds;
        response.cookies.set('token', userName, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: oneHour,
        });

        return response;

    } catch (error) {

        const response = NextResponse.json({
            msg: error,
            ok: false,
        }, { status: 400 });

        // If user is logout, delete user token cookies.
        response.cookies.delete('token');

        return response;
    };
};