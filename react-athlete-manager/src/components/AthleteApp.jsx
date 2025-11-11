// Import React and necessary hooks from the React library
// useEffect: runs side effects (like API calls) after component renders
// useState: manages component state (data that can change over time)
import React, { useEffect, useState } from "react";
// Import axios library for making HTTP requests (GET, POST, DELETE, etc.)
// Axios is a popular alternative to fetch() with simpler API and automatic JSON parsing
import axios from "axios";

// Define and export the AthleteApp functional component
// This component demonstrates full CRUD operations (Create, Read, Update, Delete)
export default function AthleteApp() {
  // State to store the array of athlete objects fetched from the API
  // Initialized as empty array, will be populated when data is fetched
  const [athletes, setAthletes] = useState([]);
  
  // State to store the name input value (controlled component)
  // Initialized as empty string, updates as user types in the name field
  const [name, setName] = useState("");
  
  // State to store the country input value (controlled component)
  // Initialized as empty string, updates as user types in the country field
  const [country, setCountry] = useState("");

  // Base URL for the API endpoint
  // This should point to a local JSON server running on port 3001
  // The /athletes endpoint manages the athlete resources
  const baseURL = "http://localhost:3001/athletes";

  // useEffect hook runs when component mounts (initial render)
  // Empty dependency array [] means this runs only once after first render
  useEffect(() => {
    // GET request to fetch all athletes from the API
    axios.get(baseURL)
      // .then() handles successful response
      // res.data contains the parsed JSON response (axios automatically parses JSON)
      // Update the athletes state with the fetched data, triggering a re-render
      .then((res) => setAthletes(res.data))
      // .catch() handles any errors (network issues, server errors, etc.)
      // Log error to console for debugging purposes
      .catch((err) => console.error("Error loading athletes:", err));
  }, []); // Empty dependency array: run only once on component mount

  // Function to add a new athlete to the database
  const addAthlete = () => {
    // Validation: check if both fields are filled
    // If either name or country is empty, show alert and exit function early
    if (!name || !country) return alert("Please enter both fields.");
    
    // POST request to create a new athlete on the server
    // Second parameter is the data object to send in the request body
    axios.post(baseURL, { name, country })
      // .then() handles successful creation
      // res.data contains the newly created athlete object (with server-assigned ID)
      // Update state by creating a new array with all existing athletes plus the new one
      // The spread operator (...athletes) creates a copy of the existing array
      .then((res) => setAthletes([...athletes, res.data]));
    
    // Clear the input fields after successful submission
    // Reset name field to empty string
    setName("");
    // Reset country field to empty string
    setCountry("");
  };

  // Function to delete an athlete from the database
  // Parameter: id - the unique identifier of the athlete to delete
  const deleteAthlete = (id) => {
    // DELETE request to remove the athlete with the specified ID
    // Template literal `${baseURL}/${id}` constructs URL like: http://localhost:3001/athletes/1
    axios.delete(`${baseURL}/${id}`)
      // .then() handles successful deletion
      // Update state by filtering out the deleted athlete
      // .filter() creates a new array excluding the athlete with matching ID
      .then(() => setAthletes(athletes.filter((a) => a.id !== id)));
  };

  // Return the JSX that renders the component UI
  return (
    // Container div with Tailwind CSS styling (padding, border, rounded corners, margin)
    <div className="p-4 border rounded-2xl m-2">
      {/* Heading for this section with bold and large text styling */}
      <h2 className="font-bold text-lg mb-2">Axios CRUD Example</h2>
      
      {/* Controlled input for athlete name
          value={name}: binds input value to state (single source of truth)
          onChange: updates state whenever user types, keeping input and state in sync
          This pattern makes the input "controlled" by React state */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 mr-2"
      />
      
      {/* Controlled input for athlete country
          Same pattern as name input - value from state, onChange updates state */}
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        className="border p-2 mr-2"
      />
      
      {/* Button to add new athlete
          onClick triggers the addAthlete function when clicked
          Green background indicates a positive/create action */}
      <button onClick={addAthlete} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>

      {/* Unordered list to display all athletes with top margin */}
      <ul className="mt-3">
        {/* Map over athletes array to create a list item for each athlete
            Transforms the data array into an array of JSX elements */}
        {athletes.map((a) => (
          // List item for each athlete
          // key={a.id}: unique identifier required by React for efficient rendering
          // flex layout with items-center (vertical alignment) and justify-between (space between content)
          <li key={a.id} className="flex items-center justify-between">
            {/* Display athlete's name and country, separated by an em dash */}
            {a.name} — {a.country}
            
            {/* Delete button for this athlete
                onClick uses arrow function to pass the athlete's ID to deleteAthlete
                Red background indicates a destructive/delete action
                The X symbol is a common delete icon */}
            <button onClick={() => deleteAthlete(a.id)} className="bg-red-500 text-white px-2 py-1 rounded">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
