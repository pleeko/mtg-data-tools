import React, { useEffect, useState } from 'react';
import { Form, TextArea, useFormState, Select, Option, Checkbox, useFormApi } from 'informed';
import './App.css';
import { parse, buildBasicList, buildCardKingdom, buildDeckbox } from './DataParse';
import { tcgPlayerPlaceholder, deckBoxPlaceholder, description, howTo } from './data/placeholder';
function App() {
  const [parsedData, setParsedData] = useState([]);
  return (
    <div className='App'>
      <header>
        <h1 style={{marginTop: '.5rem'}}>MTG Data Formatter</h1>
      </header>

      <div class='flex-container'>
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

      <div class='info'>
        <p>{description}</p>
        <p>{howTo}</p>
      </div>

      <footer>
        <div style={{textAlign: 'left', padding: '.5rem 0 .5rem .5rem'}}>
          <a style={{marginRight: '1rem'}}href='https://github.com/pleeko/mtg-data-tools/issues'>Suggestions/Bugs</a>
          <a href='https://github.com/pleeko/mtg-data-tools'>Source Code</a>
        </div>
      </footer>
    </div>
  );
}

const InputForm = ({ setParsedData }) => {
  const formState = useFormState();

  useEffect(() => {
    setParsedData(parse(formState.values.rawInput, formState.values.format));
  }, [formState.values.rawInput, formState.values.format, setParsedData]);

  return (
    <>
      <label>
        Input Format
        <Select field='format' initialValue='tcg'>
          <Option value='tcg'>TCG</Option>
          <Option value='deckbox'>Deckbox</Option>
        </Select>
      </label>
      <TextArea
        placeholder={formState.values.format === 'tcg' ? tcgPlayerPlaceholder : deckBoxPlaceholder}
        field='rawInput'
        onFocus={(event) => event.target.select()}
      />
    </>
  )
}

const OutputForm = ({ parsedData }) => {
  const formApi = useFormApi();
  const formState = useFormState();

  useEffect(() => {
    if (formState.values.format === 'list') {
      formApi.setValue('simpleList', buildBasicList(parsedData));
    }
    if (formState.values.format === 'cardKingdom') {
      formApi.setValue('simpleList', buildCardKingdom(parsedData));
    }
    if (formState.values.format === 'deckbox') {
      formApi.setValue('deckboxList', buildDeckbox(parsedData, formState.values.condition, formState.values.language, formState.values.foil));
    }
  }, [parsedData, formState.values.format, formApi, formState.values.condition, formState.values.language, formState.values.foil]);

  return (
    <>
      <div>
        <label>
          Output Format
          <Select field='format' initialValue='list'>
            <Option value='list'>Copy List</Option>
            <Option value='cardKingdom'>Card Kingdom</Option>
            <Option value='deckbox'>Deckbox</Option>
            <Option value='editor'>Editor</Option>
          </Select>
        </label>
      </div>


      {(formState.values.format === 'list' || formState.values.format === 'cardKingdom') &&
        <TextArea
          field='simpleList'
          onFocus={(event) => event.target.select()}
        />
      }

      {formState.values.format === 'editor' &&
        <>
          <OutputTable parsedData={parsedData} />
        </>
      }

      {(formState.values.format === 'deckbox') &&
        <>
          <label>
            Condition
            <Select field='condition' initialValue='Near Mint'>
              <Option value=''>Leave Blank</Option>
              <Option value='Mint'>Mint</Option>
              <Option value='Near Mint'>Near Mint</Option>
              <Option value='Good'>Good</Option>
              <Option value='Played'>played</Option>
              <Option value='Heavily Played'>Heavily Played</Option>
              <Option value='Poor'>Poor</Option>
            </Select>
          </label>
          <label>
            Language
            <Select field='language' initialValue='English'>
              <Option value=''>Leave Blank</Option>
              <Option value='English'>English</Option>
              <Option value='French'>French</Option>
              <Option value='Italian'>Italian</Option>
              <Option value='Spanish'>Spanish</Option>
              <Option value='Portuguese'>Portuguese</Option>
              <Option value='Japanese'>Japanese</Option>
              <Option value='Chinese'>Chinese</Option>
              <Option value='Russian'>Russian</Option>
              <Option value='Korean'>Korean</Option>
              <Option value='Traditional Chinese'>Traditional Chinese</Option>
            </Select>
          </label>
          <label>
            Foil <Checkbox field='foil' />
          </label>

          <TextArea
            field='deckboxList'
            onFocus={(event) => event.target.select()}
          />
        </>
      }

    </>
  )
}

const OutputTable = ({ parsedData }) => {
  const table = () => {
    return parsedData.map(row => {
      return (
        <tr style={{ textAlign: 'left' }}>
          <td style={{ paddingLeft: '15px' }}>{row.quantity}</td>
          <td style={{ paddingLeft: '15px' }}>{row.name}</td>
          {row.edition ? <td style={{ paddingLeft: '15px' }}>{row.edition.name}</td> : <td style={{ paddingLeft: '15px', color: 'red' }}>MISSING</td>}
        </tr>
      );
    });
  };

  return (
    parsedData ?
      <table style={{ width: '100%', overflowY: 'scroll', height: '500px', display: 'block' }}>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Name</th>
            <th>Edition</th>
          </tr>
        </thead>
        <tbody>
          {table()}
        </tbody>
      </table>
      : <></>
  );
};

export default App;