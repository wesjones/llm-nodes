import { createContext, useContext, useState, type ReactNode } from "react"
import { createQuestion, type Question } from "@/data/questions"

interface QuestionsContextValue {
  questions: Question[]
  addQuestion: (text: string) => void
}

const QuestionsContext = createContext<QuestionsContextValue | null>(null)

const DEFAULT_QUESTIONS: Question[] = [
  createQuestion("q1", "What percentage does the plan cover for co-insurance on diagnostic lab services?", 0),
  createQuestion("q2", "What percentage does the plan cover for co-insurance on diagnostic lab services?", 1),
]

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS)

  function addQuestion(text: string) {
    setQuestions((prev) => [
      ...prev,
      createQuestion(`q${prev.length + 1}`, text, prev.length),
    ])
  }

  return (
    <QuestionsContext.Provider value={{ questions, addQuestion }}>
      {children}
    </QuestionsContext.Provider>
  )
}

export function useQuestions() {
  const context = useContext(QuestionsContext)
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider")
  }
  return context
}
