import React, { useState } from 'react';
import Select from 'react-select';

const BirthForm = props => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const options = props.authors.map(a => {
    return {
      value: a.name,
      label: a.name,
    };
  });

  const onChange = selectedOption => {
    setName(selectedOption.value);
  };

  const submit = async e => {
    e.preventDefault();
    await props.update({
      variables: { name, setBornTo: parseInt(born) },
    });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <div>
        <h2>Set Birthyear</h2>
        <form onSubmit={submit}>
          <Select onChange={onChange} options={options} />
          <div>
            Born{' '}
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='input'>Update author</button>
        </form>
      </div>
    </div>
  );
};

export default BirthForm;
