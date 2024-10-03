import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import QuizzSetupDataProps from "@/interfaces/QuizzSetupDataProps";

export const POST = async (req: Request) => {
    try {
        const clientCookie = cookies().get('client-appian-quizz');

        if (!clientCookie) {
            throw new Error("Request missing setup data cookie.");
        }
        
        const { current, answers } = await req.json();
        const parsedClientCookie = JSON.parse(clientCookie.value);
        const setupData: QuizzSetupDataProps = {
            codename: parsedClientCookie.codename,
            duration: parsedClientCookie.duration,
            start: parsedClientCookie.start,
            end: parsedClientCookie.end,
            step: parsedClientCookie.step,
            topics: parsedClientCookie.topics,
            answers: answers,
            current: current
        }

        cookies().set({
            name: 'client-appian-quizz',
            value: JSON.stringify(setupData),
            httpOnly: false,
            path: '/',
            expires: setupData.end ?? new Date()
        });

        return NextResponse.json({}, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json(("Error: " + (error as Error).message))
    }
}