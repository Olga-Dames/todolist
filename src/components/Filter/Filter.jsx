import React from 'react';
import './Filter.scss';

const Filter = ({value, onChange}) => (
  <label>
    Find todo 
    <input type="text" value={value} onChange={onChange} />
  </label>
);


export default Filter;