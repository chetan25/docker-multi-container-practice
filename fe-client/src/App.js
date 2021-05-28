import React, {useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [index, setIndex] = useState();
  // is redis data
  const [values, setValues ] = useState({});
  // postgress data, is an array of object
  const [indexs, setIndexes ] = useState([]);

  const getNumber = async () => {
    const values = await axios.get('/api/values/current');
    console.log(values, 'values')
    setValues(Object.keys(values.data).length > 0 ? values.data : {});
  }

  const getIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    setIndexes(seenIndexes.data.length > 1 ? seenIndexes.data : []);
  }

  useEffect(() => {
      console.log('eweweweewew');
      const init = async() => {
        await getNumber();
        await getIndexes();
      }
      init();  
  }, []);
  
  const handleChange = (e) => {
    e.preventDefault();
    setIndex(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/values', {
      index: index
    });
    setIndex('');
  }

  const renderIndexes = () => {
      return indexs.map(index => {
        return index;
      }).join(',');
  }

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;   
  }

  return (
    <div className="App">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>Enter you Name</label>
          <input value={index} onChange={handleChange} />
          <button>Submit</button>
        </form>
      </div>
      <div className="indexes">
        <h3>Indexs already calculated</h3>
        {renderIndexes()}
      </div>
      <div className="values">
        <h3>Calculated values</h3>
        { renderValues() }
      </div>
    </div>
  );
}

export default App;
