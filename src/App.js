import React, {useState, useRef} from "react";

function App() {
  const prevDateFromRef = useRef('');
  const [fromDate, setFromDate] = useState('');

  const checkDateValue = (str, max) => {
    if (str.charAt(0) !== '0' || str === '00') {
      let num = parseInt(str);

      if (isNaN(num) || num <= 0 || num > max) num = 1;

      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length === 1
          ? '0' + num // self, no more #
          : num.toString(); // can be more num
    }
    return str;
  };

  // user input
  const formatInputDate = (input) => {
    // from date
    if (
      prevDateFromRef.current.length > input.length &&
      /\d\/$/.test(prevDateFromRef.current)
    ) {
      input = input.substr(0, input.length - 1);
    }
    

    let values = input.split('/').map(value => {
      return value.replace(/\D/g, '');
    });

    // day
    if (values[0]) values[0] = checkDateValue(values[0], 31);

    // month
    if (values[1]) values[1] = checkDateValue(values[1], 12);

    let output = values.map((value, index) => {
      return value.length === 2 && index < 2 ? value + '/' : value;
    });

    let assignVal = output.join('').substr(0, 10);
    prevDateFromRef.current = assignVal;
    
    return assignVal;
  }

  return <div className="App">
    <input
      id="fromDate"
      placeholder={'DD/MM/YYYY'}
      onChange={event => {
        // output date
        let outputDate = formatInputDate(event.target.value);
   
        // set from date val
        setFromDate(outputDate);
      }}
      value={fromDate}
  
    />
  </div>;
}

export default App;
