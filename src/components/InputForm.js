import React, { useEffect } from 'react';
import { tcgInput, basicListInput, deckBoxInput } from './../DataParse';
import { inputPlaceholders, } from './../data/placeholder';
import { TextArea, useFormState, Select, Option} from 'informed';
const editions = require('./../data/sets.json');

const InputForm = ({ setParsedData }) => {
  const formState = useFormState();
  const isBasicList = formState.values.format === 'basicList';
  const sortedSetList = () => {
    return (
      <>
        <label for='set'> Set </label>
        <Select field='set' initialValue=''>
          <Option value=''>None</Option>
          {editions.sort((a, b) => a.name.localeCompare(b.name)).map((edition) => {
            return <Option key={edition.name} value={edition.productCode}>{edition.name}</Option>
          })}
        </Select>

      </>
    );
  }

  useEffect(() => {
    if (isBasicList) {
      setParsedData(basicListInput(formState.values.rawInput, formState.values.set));
    } else if (formState.values.format === 'deckBox') {
      setParsedData(deckBoxInput(formState.values.rawInput));    
    }else {
      setParsedData(tcgInput(formState.values.rawInput));
    }
  }, [formState.values.rawInput, setParsedData, formState.values.set, formState.values.format, isBasicList]);

  return (
    <>
      <div style={!isBasicList ? ({ paddingBottom: '21px' }) : ({})}>
        <label for='format'> Input Format </label>
        <Select field='format' initialValue='tcg' >
          <Option value='tcg'>TCG</Option>
          <Option value='basicList'>Basic List</Option>
          <Option value='deckBox'>Deckbox</Option>
        </Select>
      </div>
      {isBasicList &&
        <div>
          {sortedSetList()}
        </div>
      }
      <TextArea
        placeholder={inputPlaceholders[formState.values.format]}
        field='rawInput'
        onFocus={(event) => event.target.select()}
      />
    </>
  )
}

export default InputForm;