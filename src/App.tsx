import { useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';


function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentSentenceIdx, currentWordRange, playbackState, play, pause } = useSpeech(sentences);

  const loadNewContent = async () => {
    console.log('Loading new content');
    const content = await fetchContent();
    const sentences = parseContentIntoSentences(content);
    console.log('Loaded new content', sentences);
    setSentences(sentences);
  }

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          currentWordRange={[currentWordRange[0], currentWordRange[1]]}
          currentSentenceIdx={currentSentenceIdx}
          sentences={sentences}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          loadNewContent={loadNewContent}
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
