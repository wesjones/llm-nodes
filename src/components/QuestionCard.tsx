import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Question } from "@/data/questions"
import { MessageCircleQuestion } from "lucide-react"

export const CARD_MIN_HEIGHT = 124
export const CARD_WIDTH = 295

export const THICKNESS = 2

interface QuestionCardProps {
  question: Question
  showConnector?: boolean
  connectorHeight: number
}

export function QuestionCard({
  question,
  showConnector = false,
  connectorHeight,
}: QuestionCardProps) {
  // The circle is 12px (size-3) and sits half outside the card (6px).
  // The line spans the gap between the two circles.
  const circleRadius = 6
  const lineLength = connectorHeight - circleRadius * 2 + THICKNESS

  return (
    <div className="relative">
      {showConnector && lineLength > 0 && (
        <svg
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: -connectorHeight + circleRadius - THICKNESS / 2 }}
          width="12"
          height={lineLength}
          viewBox={`0 0 12 ${lineLength}`}
          fill="none"
        >
          <line
            x1="6"
            y1={-THICKNESS / 2}
            x2="6"
            y2={lineLength - THICKNESS / 2}
            className="stroke-primary"
            strokeWidth={THICKNESS}
          />
          <polygon
            points={`1,${lineLength - 8} 6,${lineLength} 11,${lineLength - 8}`}
            className="fill-primary"
          />
        </svg>
      )}
      <Card role="article" aria-label={`Question: ${question.text}`} className="relative min-h-[124px] w-[295px] gap-0 pt-3 pb-3">
        <div aria-hidden="true" className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-card" />
        <div aria-hidden="true" className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-primary bg-card" />
        <CardHeader
          className=""
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <MessageCircleQuestion aria-hidden="true" className="size-4" />
            Question
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3">
          <p className="text-sm text-foreground">{question.text}</p>
        </CardContent>
      </Card>
    </div>
  )
}
