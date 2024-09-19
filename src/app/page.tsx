import { cookies } from "next/headers";

import QuizContainer from "@/components/QuizzContainer";
import QuizzSetupData from "@/interfaces/QuizzSetupData";

export default function Home() {
  const verifyIfHaveActiveQuizz = () => {
    const clientCookie = JSON.parse(cookies().get('client-appian-quizz')?.value ?? "{}");
    const cookie: QuizzSetupData = {
      codename: clientCookie?.codename ?? "",
      duration: clientCookie?.duration ?? 0,
      end: clientCookie?.end ?? null,
      topics: clientCookie?.topics ?? [],
      start: clientCookie?.start ?? null,
      step: clientCookie?.start ?? 0,
    };

    return cookie;
  }

  return (
    <div className="flex items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)] w-screen min-h-screen">
      <main className="flex flex-col gap-8 row-start-2 items-center p-3">
        <QuizContainer cookie={verifyIfHaveActiveQuizz()}/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}