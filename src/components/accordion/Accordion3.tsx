import React, { useState } from "react";
import { data } from "./data";



function Accordion3() {
  const [selected, setSelected] = useState<any[]>([]);

  function handleMultiSelection(getCurrentId: any) {
    let copySelected = [...selected];
    const findIndexOfCurrentId = copySelected.indexOf(getCurrentId);

    // console.log(findIndexOfCurrentId)
    if (findIndexOfCurrentId === -1)
      copySelected.push(getCurrentId); // add index
    else copySelected.splice(findIndexOfCurrentId, 1); // remove index
    setSelected(copySelected);
  }

  console.log(selected);

  return (
    <div className="py-2">
      {/* Acordian 4 - Open one and another but previous one not closed */}
      <h5 className="text-green-600 font-bold">
        Acordian 4 - Open one and another but previous one not closed using index add and remove.
      </h5>
      {data && data.length > 0 ? (
        data.map((item: any) => (
          <div key={item.id}>
            <button onClick={() => handleMultiSelection(item.id)}>
              {item.question}
            </button>
            {selected.indexOf(item.id) !== -1 ? <p className='text-red-600'>{item.answer}</p> : null}
          </div>
        ))
      ) : (
        <p>No Data Found!</p>
      )}
    </div>
  );
}

export default Accordion3;
