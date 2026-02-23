import { useEffect, useRef } from 'react';
import { CARD_MIN_HEIGHT, QuestionCard } from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { useQuestions } from '@/context/QuestionsContext';
import { Plus } from 'lucide-react';

const SCROLL_PADDING = 200;

function App() {
  const { questions, addQuestion } = useQuestions();
  const lastCardRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(questions.length);

  const offsets: number[] = [0];
  for (let i = 1; i < questions.length; i++) {
    offsets.push(offsets[i - 1] + CARD_MIN_HEIGHT + questions[i].position.y);
  }

  const firstCardHalf = CARD_MIN_HEIGHT / 2;
  const lastOffset = offsets[offsets.length - 1] ?? 0;
  const spacerTop = lastOffset + CARD_MIN_HEIGHT + SCROLL_PADDING;

  useEffect(() => {
    if (questions.length > prevCountRef.current) {
      lastCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    prevCountRef.current = questions.length;
  }, [questions.length]);

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      <header className="flex h-16 items-center justify-between gap-3 border-b px-4">
        <h1 className="text-sm font-semibold text-foreground">Workflow Builder</h1>
        <Button
          onClick={() =>
            addQuestion('What percentage does the plan cover for co-insurance on diagnostic lab services?')
          }
        >
          <Plus /> Add Node
        </Button>
      </header>
      <main
        aria-label="Workflow canvas"
        className="relative overflow-auto"
        style={{
          backgroundImage: 'radial-gradient(circle, #e5e5e5 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        <div role="list" aria-live="polite" aria-label="Question nodes">
          {questions.map((question, index) => (
            <div
              role="listitem"
              key={question.id}
              ref={index === questions.length - 1 ? lastCardRef : undefined}
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: `calc(50% - ${firstCardHalf}px + ${offsets[index]}px)`,
              }}
            >
              <QuestionCard question={question} showConnector={index > 0} connectorHeight={question.position.y} />
            </div>
          ))}
        </div>
        {/* Spacer to ensure enough scroll room below the last card */}
        <div
          className="pointer-events-none"
          style={{
            height: `calc(50% - ${firstCardHalf}px + ${spacerTop}px)`,
          }}
        />
      </main>
    </div>
  );
}

export default App;
