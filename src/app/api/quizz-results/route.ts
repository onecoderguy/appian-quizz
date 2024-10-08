import { NextResponse } from "next/server";

import conn from "@/services/db";

export const GET = async (): Promise<NextResponse> => {
    try {

        const get = await conn
            .promise()
            .query('SELECT * FROM results')
            .then(([rows]) => {
                return {
                    data: rows,
                    status: "success"
                };
            })
            .catch((err) => {
                return {
                    data: null,
                    error: err.message,
                    status: "failed"
                };
            });

        if (get.status === "success") {
            return await new Promise(
                (resolve) => setTimeout(
                    resolve,
                    1000
                )
            ).then(
                () => {
                    return NextResponse.json({ results: get.data }, { status: 200 });
                }
            );
        };

        return NextResponse.json({ topics: [] }, { status: 500 });
    } catch (error) {
        return NextResponse.json(("Error: " + (error as Error).message));
    }
}