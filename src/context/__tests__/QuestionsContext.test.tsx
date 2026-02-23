import { renderHook, act } from "@testing-library/react"
import { QuestionsProvider, useQuestions } from "@/context/QuestionsContext"
import { VERTICAL_GAP } from "@/data/questions"

describe("QuestionsContext", () => {
  it("provides 2 default questions", () => {
    const { result } = renderHook(() => useQuestions(), {
      wrapper: QuestionsProvider,
    })

    expect(result.current.questions).toHaveLength(2)
    expect(result.current.questions[0].id).toBe("q1")
    expect(result.current.questions[1].id).toBe("q2")
  })

  it("addQuestion appends a new question with correct id and position.y", () => {
    const { result } = renderHook(() => useQuestions(), {
      wrapper: QuestionsProvider,
    })

    act(() => {
      result.current.addQuestion("New question?")
    })

    expect(result.current.questions).toHaveLength(3)
    const added = result.current.questions[2]
    expect(added.id).toBe("q3")
    expect(added.text).toBe("New question?")
    expect(added.position.y).toBe(VERTICAL_GAP)
  })

  it("throws when useQuestions is used outside provider", () => {
    // Suppress console.error for the expected error
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})

    expect(() => {
      renderHook(() => useQuestions())
    }).toThrow("useQuestions must be used within a QuestionsProvider")

    spy.mockRestore()
  })
})
