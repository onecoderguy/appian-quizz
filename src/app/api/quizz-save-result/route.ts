import { NextRequest, NextResponse } from "next/server";

import conn from "@/services/db";

import QuizzQuestionProps from "@/interfaces/QuizzQuestionProps";
import QuizzSetupDataProps from "@/interfaces/QuizzSetupDataProps";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const { quizzSetupData, selectedAnswers, questions }: {
            quizzSetupData: QuizzSetupDataProps,
            selectedAnswers: number[],
            questions: QuizzQuestionProps[]
        } = await req.json();

        await conn
            .promise()
            .query(
                `INSERT INTO results (duration, topics, questions, selectedAnswers) VALUES (?, ?, ?, ?)`,
                [
                    quizzSetupData.duration,
                    quizzSetupData.topics,
                    JSON.stringify(questions),
                    selectedAnswers.toString()
                ]
            );

        return NextResponse.json({}, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json(("Error: " + (error as Error).message));
    }
}