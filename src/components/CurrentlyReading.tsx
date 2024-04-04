/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  return (
    <div data-testid="currently-reading">
      <div>
        {sentences.map((sentence, idx) => (
          <p key={idx} data-testid="current-sentence">
            {idx === currentSentenceIdx ? (
              <>
                {sentence.split(" ").map((word, wordIdx) => (
                  <span
                    key={wordIdx}
                    data-testid="current-word"
                    style={{
                      backgroundColor:
                        wordIdx >= currentWordRange[0] && wordIdx <= currentWordRange[1]
                          ? "yellow"
                          : "transparent",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </>
            ) : null}
          </p>
        ))}
      </div>
    </div>
  );
};
