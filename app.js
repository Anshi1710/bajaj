import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        setError('Invalid JSON format');
        return;
      }

      // Send the POST request to your backend API
      const response = await fetch('https://your-backend-url/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      const result = await response.json();
      setResponseData(result);
      setShowDropdown(true);
      setError('');
    } catch (e) {
      setError('Invalid JSON');
    }
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    let result = {};
    if (selectedOptions.includes('Alphabets')) {
      result['Alphabets'] = responseData.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      result['Numbers'] = responseData.numbers;
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      result['Highest Lowercase Alphabet'] = responseData.highest_lowercase_alphabet;
    }

    return (
      <div>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE10176</h1>
      <textarea
        rows="4"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showDropdown && (
        <div>
          <label>Select data to display:</label>
          <select multiple onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
          </select>
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
