import { render, screen } from "@testing-library/react"
import { QuestionCard } from "@/components/QuestionCard"
import type { Question } from "@/data/questions"

const mockQuestion: Question = {
  id: "q1",
  text: "What is the deductible?",
  position: { x: 0, y: 99 },
}

describe("QuestionCard", () => {
  it("renders question text and 'Question' title", () => {
    render(
      <QuestionCard question={mockQuestion} connectorHeight={99} />
    )

    expect(screen.getByText("What is the deductible?")).toBeInTheDocument()
    expect(screen.getByText("Question")).toBeInTheDocument()
  })

  it("shows connector SVG when showConnector is true", () => {
    const { container } = render(
      <QuestionCard
        question={mockQuestion}
        showConnector={true}
        connectorHeight={99}
      />
    )

    // The connector SVG contains a <line> element; the icon SVG does not
    expect(container.querySelector("svg line")).toBeInTheDocument()
  })

  it("hides connector SVG when showConnector is false", () => {
    const { container } = render(
      <QuestionCard
        question={mockQuestion}
        showConnector={false}
        connectorHeight={99}
      />
    )

    expect(container.querySelector("svg line")).not.toBeInTheDocument()
  })

  it("decorative elements have aria-hidden='true'", () => {
    const { container } = render(
      <QuestionCard
        question={mockQuestion}
        showConnector={true}
        connectorHeight={99}
      />
    )

    const ariaHiddenElements = container.querySelectorAll('[aria-hidden="true"]')
    expect(ariaHiddenElements.length).toBeGreaterThanOrEqual(3)
  })

  it("card has role='article' with aria-label", () => {
    render(
      <QuestionCard question={mockQuestion} connectorHeight={99} />
    )

    const article = screen.getByRole("article")
    expect(article).toHaveAttribute(
      "aria-label",
      "Question: What is the deductible?"
    )
  })
})
