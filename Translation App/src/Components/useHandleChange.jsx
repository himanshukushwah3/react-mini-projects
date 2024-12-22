import {useState} from 'react';

const useHandleChange = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return {
    value, onChange: handleChange
  };
};

export default useHandleChange