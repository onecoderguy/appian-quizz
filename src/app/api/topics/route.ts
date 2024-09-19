import conn from "@/services/db"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const get = await conn
            .promise()
            .query('SELECT * FROM `topics`')
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
                    return NextResponse.json({ topics: get.data }, { status: 200 });
                }
            );
        }

        return NextResponse.json({ topics: [] }, { status: 500 });
    } catch (error) {
        return NextResponse.json(("Error: " + (error as Error).message))
    }
}