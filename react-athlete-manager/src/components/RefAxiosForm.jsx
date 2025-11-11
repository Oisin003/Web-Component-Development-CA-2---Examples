// Import React and necessary hooks from the React library
// useRef: creates mutable references to DOM elements without triggering re-renders
// useState: manages component state (data that can change over time)
// useEffect: runs side effects (like API calls) after component renders
import React, { useRef, useState, useEffect } from "react";
// Import axios library for making HTTP requests
// Axios provides a simpler API than fetch() with automatic JSON parsing
import axios from "axios";

// Define and export the RefAxiosForm functional component
// This component combines refs (for form inputs) with axios (for API calls)
// It demonstrates an alternative approach to controlled components using refs
export default function RefAxiosForm() {
  // Create a ref for the name input field
  // Unlike useState, refs don't cause re-renders when their values change
  // Useful for accessing input values without managing state for every keystroke
  const nameRef = useRef();
  
  // Create a ref for the country input field
  // Provides direct DOM access to read/write the input value
  const countryRef = useRef();
  
  // State to store the array of athlete objects fetched from the API
  // Initialized as empty array, will be populated when data is fetched
  const [athletes, setAthletes] = useState([]);

  // Base URL for the API endpoint
  // Points to a local JSON server running on port 3001
  // The /athletes endpoint manages the athlete resources
  const baseURL = "http://localhost:3001/athletes";

  // useEffect hook runs when component mounts (initial render)
  // Empty dependency array [] means this runs only once after first render
  useEffect(() => {
    // GET request to fetch all athletes from the API
    // axios.get() returns a Promise that resolves with the response
    axios.get(baseURL).then((res) => setAthletes(res.data));
    // Note: No .catch() here - in production, error handling should be added
  }, []); // Empty dependency array: run only once on component mount

  // Function to add a new athlete to the database
  // Uses refs to access input values instead of controlled state
  const handleAdd = () => {
    // POST request to create a new athlete on the server
    // Access input values using ref.current.value (direct DOM access)
    // This is more performant than controlled components for simple forms
    // because it doesn't trigger re-renders on every keystroke
    axios.post(baseURL, {
      name: nameRef.current.value,
      country: countryRef.current.value
    }).then((res) => 
      // Update state with the new athlete returned from the server
      // The spread operator (...athletes) creates a copy of the existing array
      // Then adds the new athlete object (res.data) to the end
      setAthletes([...athletes, res.data])
    );

    // Clear the input fields after successful submission
    // Directly manipulate the DOM to reset the input values
    nameRef.current.value = "";
    countryRef.current.value = "";
  };

  // Return the JSX that renders the component UI
  return (
    // Container div with Tailwind CSS styling (padding, border, rounded corners, margin)
    <div className="p-4 border rounded-2xl m-2">
      {/* Heading for this section with bold and large text styling */}
      <h2 className="font-bold text-lg mb-2">Ref + Axios Example</h2>
      
      {/* Uncontrolled input for athlete name
          ref={nameRef}: attaches the ref to this input element for direct DOM access
          Unlike controlled components, no value or onChange props are needed
          The input manages its own state internally (uncontrolled) */}
      <input ref={nameRef} placeholder="Name" className="border p-2 mr-2" />
      
      {/* Uncontrolled input for athlete country
          Same pattern as name input - uses ref for direct DOM access */}
      <input ref={countryRef} placeholder="Country" className="border p-2 mr-2" />
      
      {/* Button to add new athlete
          onClick triggers the handleAdd function when clicked
          Purple background distinguishes this from other examples */}
      <button onClick={handleAdd} className="bg-purple-500 text-white px-3 py-1 rounded">Add</button>

      {/* Unordered list to display all athletes with top margin */}
      <ul className="mt-3">
        {/* Map over athletes array to create a list item for each athlete
            Transforms the data array into an array of JSX elements */}
        {athletes.map((a) => (
          // List item for each athlete
          // key={a.id}: unique identifier required by React for efficient list rendering
          <li key={a.id}>
            {/* Display athlete's name and country, separated by an em dash */}
            {a.name} — {a.country}
          </li>
        ))}
      </ul>
    </div>
  );
}
