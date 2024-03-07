import React, { useState } from "react";
import { data } from "./data";

const Accordion1 = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="pb-5">
      {/* Acordian 1 */}

      <h5 className="text-green-600 font-bold">Acordian 1.</h5>
      <button onClick={() => setSelected(!selected)}>
        <h3>How are you??</h3>
      </button>
      {/* if selected then show this */}
      {selected && <p className="text-red-600">I am fine, Alhamdulillah</p>}

      {/* Acordian 2 */}

      <h5 className="text-green-600 font-bold pt-4">
        Acordian 2 - Open one and another but previous one not closed using
        toggle.
      </h5>

      {/* {data.map((item: any) => (
        <div key={item.id}>
          <button onClick={() => setSelected(!selected)}>
            <h3>{item.question}</h3>
          </button>
          {selected && <p className="text-red-600">{item.answer}</p>}
        </div>
      ))} */}
      {/* Another approach using props */}
      <h2 className="text-orange-500">
        Another Approach using props to use dynamically
      </h2>
      {data.map((item) => (
        <Accordion2Btn key={item.id} btnText={item} />
      ))}
    </div>
  );
};

export default Accordion1;

// Another approach using props
export const Accordion2Btn = ({ btnText }: { btnText: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { question, answer } = btnText;

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <h3>{question}</h3>
      </button>

      {isOpen && <p className="text-red-600">{answer}</p>}
    </div>
  );
};
