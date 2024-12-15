import { NextRequest, NextResponse } from "next/server";
import Users from "@/src/models/userModel";
import dbConnection from "@/src/dbConfig/db";


export async function GET(request: NextRequest) {

    try {
        
        await dbConnection(); // Connect DB

        const { searchParams } = new URL(request.url);
        const userName = searchParams.get('userName') || '';
        let getUserData = null;

        if (userName) {
            getUserData = await Users.findOne({ userName }).select('-passWord');
        } else {
            getUserData = await Users.find().select('-passWord');
        };

        if (!getUserData) throw ('User(s) not found');

        return NextResponse.json({
            msg: 'User data found',
            data: getUserData,
            ok: true,
        }, { status: 200 });

    } catch (error) {

        return NextResponse.json({
            msg: error,
            ok: true,
        }, { status: 404 });

    };
};