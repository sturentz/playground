
import appStyle from './App.css';
import React, {useState } from "react";
import CursorAnimTrail from './components/CursorAnimTrail';




function App() {

  const [particleType, setType] = useState("firefly");

  //console.log(particleType);
  return (
 <div>
    {/*<div className="nav">
    <div className="navitem" onClick={() =>setType("firefly")}>Firefly Style</div>
    <div className="navitem" onClick={() =>setType("bigandclose")}>Trail Style</div>
    </div>*/}

    <CursorAnimTrail
      particleType={particleType}
    />
     </div>

  );
}

export default App;
