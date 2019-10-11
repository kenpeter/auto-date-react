import React, {useState, useRef} from "react";

function App() {
  const prevDateFromRef = useRef('');
  const inputRef = useRef(null);
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
      ref={inputRef}
      // id
      id="fromDate"
      // guide
      placeholder={'DD/MM/YYYY'}

      onKeyDown={(e) => {
        
        // detect the del key
        if (e.keyCode === 8) {
          console.log('-- delete --');

          if(e.target.selectionStart === 0 || e.target.selectionStart === e.target.value.length) {
            console.log('~~ on edge ~~');
            inputRef.current.focus();
          } else {
            // del in mid
            console.log('$$$$$$ e.target.selectionStart', e.target.selectionStart, 'e.target.value.length', e.target.value.length);
            // move cursor at the end and allow user deletes there, not delete in the middle
            inputRef.current.setSelectionRange(e.target.value.length, e.target.value.length);
            console.log('e.preventDefault');
            e.preventDefault();
          }
        }
      }}

      // on change
      onChange={event => {
        event.preventDefault();

        //test
        console.log('==== on change + del as well === ');

        let outputDate = formatInputDate(event.target.value);
        // set
        setFromDate(outputDate);
      }}
      value={fromDate}
  
    />
  </div>;
}

export default App;
