import React from "react";
import RefFormExample from "./components/RefFormExample";
import FetchUsers from "./components/FetchUsers";
import AthleteApp from "./components/AthleteApp";
import RefAxiosForm from "./components/RefAxiosForm";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">React Athlete Manager</h1>
      <RefFormExample />
      <FetchUsers />
      <AthleteApp />
      <RefAxiosForm />
    </div>
  );
}

export default App;
