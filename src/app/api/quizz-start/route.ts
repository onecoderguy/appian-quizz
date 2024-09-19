import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
    try {
        const { codename, topics, duration } = await req.json();

        const now = new Date();
        const start = now.getTime();
        const end = now.setMinutes(now.getMinutes() + parseInt(duration));

        cookies().getAll().forEach((cookie) => {
            cookies().set({
                name: cookie.name,
                value: '',
                expires: new Date(0),
                path: '/'
            });
        });

        cookies().set({
            name: 'client-appian-quizz',
            value: JSON.stringify({ codename, topics, duration, start, end }),
            httpOnly: false,
            path: '/',
            expires: end
        });

        return NextResponse.json({}, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json(("Error: " + (error as Error).message))
    }
}