import React, { useEffect, useState } from 'react';
import { Form, TextArea, useFormState, Select, Option, useFormApi } from 'informed';
import './App.css';
import { parse, buildBasicList, buildCardKingdom } from './DataParse';

function App() {
  const [parsedData, setParsedData] = useState([]);
  return (
    <div className='App'>
      <h1>MTG Data Formatter</h1>
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

  }, [parsedData, formState.values.format, formApi]);

  return (
    <>
      <label>
        Output Format
        <Select field='format' initialValue='list'>
          <Option value='list'>Copy List</Option>
          <Option value='cardKingdom'>Card Kingdom</Option>
          <Option value='csv'>CSV</Option>
          <Option value='editor'>Editor</Option>
        </Select>
      </label>

      {(formState.values.format === 'list' || formState.values.format === 'cardKingdom') &&
        <TextArea
          field='simpleList'
          onFocus={(event) => event.target.select()}
        />}

      {formState.values.format === 'editor' &&
        <>
          <OutputTable parsedData={parsedData} />
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
  );
};

export default App;