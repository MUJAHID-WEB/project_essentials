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
        <h5 className="text-green-600 font-bold">Acordian 3 - Open one but when open another, previous one closed</h5>
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
