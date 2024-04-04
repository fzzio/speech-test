import { useEffect, useState } from 'react';

import { PlayingState, createSpeechEngine, SpeechEngine } from './speech';
import { s } from 'vitest/dist/reporters-LLiOBu3g';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");
  const [speechEngine, setSpeechEngine] = useState<SpeechEngine>();

  useEffect(() => {
    const options = {
      onBoundary: (e: SpeechSynthesisEvent) => {
        // TODO: Implement this
      },
      onEnd: (e: SpeechSynthesisEvent) => {
        setCurrentSentenceIdx(prevIdx => prevIdx + 1);
      },
      onStateUpdate: (state: PlayingState) => {
        setPlaybackState(state);
      }
    };
    const engine = createSpeechEngine(options);
    setSpeechEngine(engine);

    return () => {
      if (engine) {
        engine.cancel();
      }
    };
  }, [sentences]);

  useEffect(() => {
    if (speechEngine && sentences[currentSentenceIdx]) {
      speechEngine.load(sentences[currentSentenceIdx]);
      speechEngine.play();
      setPlaybackState("playing");
    }
  }, [currentSentenceIdx, sentences]);

  const play = () => {
    if (speechEngine) {
      speechEngine.play();
      setPlaybackState("playing");
    }
  };

  const pause = () => {
    if (speechEngine) {
      speechEngine.pause();
      setPlaybackState("paused");
    }
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
