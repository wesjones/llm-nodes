import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "@/App"
import { QuestionsProvider } from "@/context/QuestionsContext"

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

function renderApp() {
  return render(
    <QuestionsProvider>
      <App />
    </QuestionsProvider>
  )
}

describe("App", () => {
  it("renders header with 'Workflow Builder' and 'Add Node' button", () => {
    renderApp()

    expect(screen.getByText("Workflow Builder")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /add node/i })
    ).toBeInTheDocument()
  })

  it("renders initial question cards", () => {
    renderApp()

    const articles = screen.getAllByRole("article")
    expect(articles).toHaveLength(2)
  })

  it("clicking 'Add Node' adds a new card", async () => {
    const user = userEvent.setup()
    renderApp()

    const button = screen.getByRole("button", { name: /add node/i })
    await user.click(button)

    const articles = screen.getAllByRole("article")
    expect(articles).toHaveLength(3)
  })
})
