import { NextResponse, NextRequest } from "next/server"
import { FieldPacket, RowDataPacket } from "mysql2";

import conn from "@/services/db"

import QuizzQuestionProps from "@/interfaces/QuizzQuestionProps";
import QuizzAnswerProps from "@/interfaces/QuizzAnswerProps";

const randomAnswers = (answers: QuizzAnswerProps[]) => {
    for (let i = (answers.length - 1); i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
}

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url)
        const topicIds = searchParams.get('topics')?.split(',');
        const result = searchParams.get('result');
        let queryWheres = '';
        let resultSelect = '';
        
        if (topicIds) {
            topicIds.forEach(
                (topicId: string, index: number) => {
                    index === 0 ?
                    queryWheres += ` AND q.topicId = ${topicId}` :
                    queryWheres += ` OR q.topicId = ${topicId}`
                }
            );
        };

        if (result) {
            resultSelect += `,
                'correctAnswer',
                a.correctAnswer`
        }

        const [rows]: [RowDataPacket[], FieldPacket[]] = await conn
            .promise()
            .query(`
                SELECT
                    q.*,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id',
                            a.id,
                            'questionId',
                            a.questionId,
                            'answer',
                            a.answer ${resultSelect}
                        )
                    ) as answers,
                COUNT (CASE WHEN a.correctAnswer = TRUE THEN 1 END) as correctAnswers
                FROM
                    questions as q
                    LEFT JOIN answers a ON a.questionId = q.id
                WHERE
                    q.active = 1
                    AND a.active = 1 ${queryWheres}
                GROUP BY
                    q.id;
            `);

        const questions: QuizzQuestionProps[] = rows.map((row: RowDataPacket) => ({
            id: row.id,
            topicId: row.topicId,
            question: row.question,
            answers: randomAnswers(JSON.parse(row.answers)),
            correctAnswers: row.correctAnswers
        }));

        return NextResponse.json({ questions }, { status: 200 });
    } catch (error) {
        return NextResponse.json(("Error: " + (error as Error).message));
    }
}