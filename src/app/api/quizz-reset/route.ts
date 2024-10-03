import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async () => {
    try {
        cookies().getAll().forEach((cookie) => {
            cookies().set({
                name: cookie.name,
                value: '',
                expires: new Date(0),
                path: '/'
            });
        });

        return NextResponse.json({}, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json(("Error: " + (error as Error).message))
    }
}