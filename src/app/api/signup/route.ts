import dbConnection from "@/src/dbConfig/db";
import signUpValid from "@/src/validators/signUpValid";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/src/models/userModel";
import { userProps } from "@/src/types";
import bcrypt from 'bcryptjs';
import Jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {

    try {

        await dbConnection(); // Connect DB

        const reqBody = await request.json(); // Get requests
        const validBody = await signUpValid.validate(reqBody); // Validate body
        const { userName, email, passWord } = validBody;

        // Check if user alread exist. If not continue.
        let userExist: userProps | null = null;
        userExist = await Users.findOne({ email });
        if (userExist) throw ('There is an account with this email. Try log in instead');
        userExist = await Users.findOne({ userName });
        if (userExist) throw ('This username is not available');

        // Hash user password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassWord = bcrypt.hashSync(passWord, salt);

        // Create and login new user
        const newUser = new Users({ userName, email, passWord: hashedPassWord, login: true });
        const savedUser = await newUser.save();

        // generate authentication token and assign cookie
        const oneDay = 3600 * 24 // 1 day in seconds;
        const token = Jwt.sign(
            {
                _id: savedUser._id,
                userName: savedUser.userName,
                email: savedUser.email,
            },
            process.env.SECRET_KEY!,
            { expiresIn: '12h' }
        );
        const response = NextResponse.json(
            {
                msg:
                    ['Succesfully created a user. Please verify your email',
                        { verifyEmailUrl: '/api/verify/email' }
                    ], ok: true
            },
            { status: 201 }
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