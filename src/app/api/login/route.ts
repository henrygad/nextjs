import { NextRequest, NextResponse } from "next/server";
import { userProps } from "@/src/types";
import bcrpt from 'bcryptjs';
import logInValid from "@/src/validators/logInValid";
import Users from "@/src/models/userModel";
import dbConnection from "@/src/dbConfig/db";
import Jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {

    try {

        await dbConnection(); // Connect DB

        const reqBody = await request.json(); // Get requests
        const validBody = await logInValid.validate(reqBody); // Validate body
        const { userNameOrEmail, passWord } = validBody;

        // Check if user exist by either username or email
        const userExist: userProps | null = await Users.findOne({
            $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
        });
        if (!userExist) throw ('Invalid credentials');

        // Compare hashed password with user login password
        const isMatch = bcrpt.compareSync(passWord, userExist.passWord);
        if (!isMatch) throw ('Invalid credentials');

        // generate authentication token and assign cookie
        const oneDay = 3600 * 24 // 1 day in seconds;
        const token = Jwt.sign(
            {
                _id: userExist._id,
                userName: userExist.userName,
                email: userExist.email,
            },
            process.env.SECRET_KEY!,
            { expiresIn: '12h' }
        );
        const response = NextResponse.json(
            { msg: "Succesfully login", ok: true },
            { status: 202 }
        );
        response.cookies.set('sessionId', JSON.stringify({ jwtToken: token }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: oneDay,
        });

        return response;

    } catch (error) {
        const getError = error as {errors: string}
        return NextResponse.json({ msg: getError.errors[0] || error, ok: false }, { status: 400 });
    };

};