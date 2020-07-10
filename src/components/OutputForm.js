import React, { useEffect } from 'react';
import { TextArea, useFormState, Select, Option, Checkbox, useFormApi } from 'informed';
import { buildBasicList, buildCardKingdom, buildDeckbox, buildTcg } from './../DataParse';

const OutputForm = ({ parsedData }) => {
  const formApi = useFormApi();
  const formState = useFormState();
  const {
    format,
    condition,
    language,
    foil
  } = formState.values;

  const isSimpleList = format === 'list';
  const isCardKingdom = format === 'cardKingdom';
  const isTcg = format === 'tcg';
  const isDeckbox = format === 'deckbox';


  useEffect(() => {
    if (isSimpleList) {
      formApi.setValue('simpleList', buildBasicList(parsedData));
    }
    if (isCardKingdom) {
      formApi.setValue('simpleList', buildCardKingdom(parsedData));
    }
    if (isTcg) {
      formApi.setValue('simpleList', buildTcg(parsedData));
    }
    if (isDeckbox) {
      formApi.setValue('deckboxList', buildDeckbox(parsedData, condition, language, foil));
    }
  }, [parsedData, formApi, isSimpleList, isCardKingdom, isTcg, isDeckbox, condition, language, foil]);

  return (
    <>
      <div style={!(isDeckbox) ? ({ paddingBottom: '21px' }) : ({})}>
        <label for='format'> Output Format </label>
        <Select field='format' initialValue='list'>
          <Option value='list'>Copy List</Option>
          <Option value='tcg'>TCG</Option>
          <Option value='cardKingdom'>Card Kingdom</Option>
          <Option value='deckbox'>Deckbox</Option>
          <Option value='editor'>Editor</Option>
        </Select>
      </div>

      {(isSimpleList || isTcg || isCardKingdom) &&
        <TextArea
          field='simpleList'
          onFocus={(event) => event.target.select()}
        />
      }

      {formState.values.format === 'editor' &&
        <OutputTable parsedData={parsedData} />
      }

      {(isDeckbox) &&
        <>
          <label for='condition'> Condition </label>
          <Select field='condition' initialValue='Near Mint'>
            <Option value=''>Leave Blank</Option>
            <Option value='Mint'>Mint</Option>
            <Option value='Near Mint'>Near Mint</Option>
            <Option value='Good'>Good</Option>
            <Option value='Played'>played</Option>
            <Option value='Heavily Played'>Heavily Played</Option>
            <Option value='Poor'>Poor</Option>
          </Select>

          <label for='language'> Language </label>
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
          <label> Foil </label>
          <Checkbox field='foil' />
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

export default OutputForm;