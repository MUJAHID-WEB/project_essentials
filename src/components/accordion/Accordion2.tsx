import React, { useState } from "react";
import { data } from "./data";

function Accordion2() {
  const [selected, setSelected] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  function handleSelection(getCurrentId: any) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  const handleCopy = () => {
    const code = `
    import React, { useState } from "react";
    import { data } from "./data";
    
    function Accordion2() {
      const [selected, setSelected] = useState(null);
    
      function handleSelection(getCurrentId: any) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
      }
    
      return (
        <div className="py-2">
            {/* Acordian 3 - Open one but when open another, previous one closed */}
            <h5 className="text-green-600 font-bold">Acordian 3 - Open one but when open another, previous one closed.</h5>
          {data && data.length > 0 ? (
            data.map((item: any) => (
              <div key={item.id}>
                <button onClick={() => handleSelection(item.id)}>
                  {item.question}
                </button>
                {selected === item.id ? <p className='text-red-600'>{item.answer}</p> : null}
              </div>
            ))
          ) : (
            <p>No Data Found!</p>
          )}
        </div>
      );
    }
    
    export default Accordion2;
`;
    navigator.clipboard.writeText(code).then(() => setShowAlert(true));
  };

  return (
    <div className="py-2">
      {/* Acordian 3 - Open one but when open another, previous one closed */}
      <h5 className="text-green-600 font-bold">
        Acordian 3 - Open one but when open another, previous one closed.
      </h5>
      {data && data.length > 0 ? (
        data.map((item: any) => (
          <div key={item.id}>
            <button onClick={() => handleSelection(item.id)}>
              {item.question}
            </button>
            {selected === item.id ? (
              <p className="text-red-600">{item.answer}</p>
            ) : null}
          </div>
        ))
      ) : (
        <p>No Data Found!</p>
      )}
      {/* copy the code from browser */}
      <button
        onClick={handleCopy}
        className="border border-red-400 p-3 bg-gray-400 text-white"
      >
        Copy Code
      </button>
      {showAlert && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-3"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Code copied to clipboard.</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowAlert(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.348 5.652a.5.5 0 0 1 0 .707L10.06 10l4.288 4.647a.5.5 0 0 1-.708.708L9.352 10.707a.5.5 0 0 1 0-.707l4.288-4.646a.5.5 0 0 1 .708 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
}

export default Accordion2;
