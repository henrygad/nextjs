import { NextResponse } from "next/server";

export async function GET() {

    try {

        const response = NextResponse.json(
            { msg: "Succesfully logout user", ok: true },
            { status: 202 }
        );

        response.cookies.delete('sessionId');
        response.cookies.delete('token');

        return response;

    } catch (error) {

        return NextResponse.json({ msg: error, ok: false }, { status: 400 });
    };

};