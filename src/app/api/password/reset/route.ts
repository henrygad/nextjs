import dbConnection from "@/src/dbConfig/db";
import Users from "@/src/models/userModel";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import resetPassWordValid from "@/src/validators/resetPassWordValid";

export async function POST(request: NextRequest) {

    try {

        await dbConnection(); // Connect DB
        const reqBody = await request.json(); // Get resquest body

        // validate request body
        const validBody = await resetPassWordValid.validate(reqBody); // Validate body
        const { passWord} = validBody;

        // Get reset password token from cookies
        const token = request.cookies.get('resetPassWord')?.value || ''
        if (!token) throw ('Reset password token was not provided. Send a new OTP token');

        const {
            email,
            expiryDate,
        }: { email: string, expiryDate: string } = JSON.parse(token);

        // Varify token
        const user = await Users.findOne({ email });
        if (!user) throw ('Invalid OTP');
        if (Date.now() > parseFloat(expiryDate)) throw ('OTP has expired. Please send a new one');
        const { passWord: prePassword } = user;

        // Compare hashed password with user login password
        const isMatch = bcrypt.compareSync(passWord, prePassword);
        if (isMatch) throw ("You can't use your previous password");

        // Hash user reset password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassWord = bcrypt.hashSync(passWord, salt);

        // Save user new password and others 
        user.forgetPassWordToken = '';
        user.forgetPassWordTokenExpiryData = 0;
        user.passWord = hashedPassWord;
        await user.save();

        const response = NextResponse.json({
            msg: 'Successfully reset password. You can now login',
            ok: true,
        }, { status: 200 });


        return response;

    } catch (error) {

        return NextResponse.json({
            msg: error,
            ok: false,
        }, { status: 401 });
    };
};
