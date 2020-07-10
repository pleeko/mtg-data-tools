import React, { useState } from 'react';
import './App.css';
import { Form } from 'informed';
import InputForm from './components/InputForm';
import OutputForm from './components/OutputForm';
import { description, howTo } from './data/placeholder';

function App() {
  const [parsedData, setParsedData] = useState([]);
  return (
    <div className='App'>
      <header>
        <h1 style={{ marginTop: '.5rem' }}>MTG Data Formatter</h1>
      </header>

      <div className='flex-container'>
        <div>
          <Form>
            <InputForm setParsedData={setParsedData} />
          </Form>
        </div>

        <div>
          <Form>
            <OutputForm parsedData={parsedData} />
          </Form>
        </div>
      </div>

      <div className='info'>
        <p>{description}</p>
        <p>{howTo}</p>
      </div>

      <footer>
        <div style={{ textAlign: 'left', padding: '.5rem 0 .5rem .5rem' }}>
          <a style={{ marginRight: '1rem' }} href='https://github.com/pleeko/mtg-data-tools/issues'>Suggestions/Bugs</a>
          <a href='https://github.com/pleeko/mtg-data-tools'>Source Code</a>
        </div>
      </footer>
    </div>
  );
}

export default App;