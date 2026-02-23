export const VERTICAL_GAP = 99

export interface Question {
  id: string
  text: string
  position: { x: number; y: number }
}

export function createQuestion(id: string, text: string, index: number): Question {
  return {
    id,
    text,
    position: { x: 0, y: index === 0 ? 0 : VERTICAL_GAP },
  }
}
