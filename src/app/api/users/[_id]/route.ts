import { NextRequest, NextResponse } from "next/server";
import Users from "@/src/models/userModel";
import authenticate from "@/src/utils/authenticate";
import dbConnection from "@/src/dbConfig/db";


export async function GET(request: NextRequest){

    try {

        await dbConnection(); // Connect DB
        const user = await authenticate(request);

        return NextResponse.json({
            msg: 'User data found',
            data: {...user},
            ok: true,
        }, {status: 200});
        
    } catch (error) {
      
        return NextResponse.json({
            msg: error,
            ok: true,
        }, {status: 401});

    };
};

export async function DELETE(request: NextRequest){

    try {

        await dbConnection(); // Connect DB
        const user = await authenticate(request);
        const {_id} = user;
        
        const delteUserData = await Users.findByIdAndDelete({_id}); // Delete user data
        if(!delteUserData) throw ('User was not deleted');

        return NextResponse.json({
            msg: 'Successfully deleted user data',
            ok: true,
        }, {status: 200});
        
    } catch (error) {

        return NextResponse.json({
            msg: error,
            ok: false,
        }, {status: 401});
        
    };
};