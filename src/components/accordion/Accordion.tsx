import React, { useState } from "react";
import Accordion2 from "./Accordion2";
import Accordion1 from "./Accordion1";
import Accordion3 from "./Accordion3";

const Accordion = () => {
  return (
    <div className="p-5 flex flex-col justify-start items-start">
      <Accordion1 />
      <Accordion2 />
      <Accordion3 />
    </div>
  );
};

export default Accordion;
