import { NextRequest, NextResponse } from "next/server";

import conn from "@/services/db";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const {
            topics,
            duration,
            totalQuestions,
            unansweredQuestions,
            correctAnswers
        }: {
            topics: string[],
            duration: number,
            totalQuestions: number,
            unansweredQuestions: number,
            correctAnswers: number
        } = await req.json();

        await conn
            .promise()
            .query(
                `INSERT INTO results (topics, duration, totalQuestions, correctAnswers, unansweredQuestions) VALUES (?, ?, ?, ?, ?)`,
                [
                    topics,
                    duration,
                    totalQuestions,
                    correctAnswers,
                    unansweredQuestions
                ]
            );

        return NextResponse.json({}, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json(("Error: " + (error as Error).message));
    }
}