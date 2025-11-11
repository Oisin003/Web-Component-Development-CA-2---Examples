// Import React and necessary hooks from the React library
// useEffect: runs side effects (like API calls) after component renders
// useState: manages component state (data that can change over time)
import React, { useEffect, useState } from "react";

// Define and export the FetchUsers functional component
// This component fetches and displays a list of users from an external API
export default function FetchUsers() {
  // Create state to store the array of users
  // useState([]) initializes the state with an empty array
  // users: the current state value (array of user objects)
  // setUsers: function to update the users state
  const [users, setUsers] = useState([]);

  // useEffect hook runs side effects after the component renders
  // The empty dependency array [] means this effect runs only once when component mounts
  useEffect(() => {
    // Fetch data from the JSONPlaceholder API (a fake REST API for testing)
    // This returns a Promise that resolves with the HTTP response
    fetch("https://jsonplaceholder.typicode.com/users")
      // First .then(): convert the response to JSON format
      // res.json() parses the response body and returns a Promise with the parsed data
      .then((res) => res.json())
      // Second .then(): receive the parsed JSON data (array of user objects)
      // Update the component state with the fetched user data
      // This triggers a re-render to display the users
      .then((data) => setUsers(data))
      // .catch(): handle any errors that occur during the fetch or parsing
      // If the API is down, network fails, or JSON parsing fails, log the error to console
      .catch((err) => console.error("Error fetching users:", err));
  }, []); // Empty dependency array: run this effect only once after initial render (component mount)

  // Return the JSX that renders the component UI
  return (
    // Container div with Tailwind CSS styling (padding, border, rounded corners, margin)
    <div className="p-4 border rounded-2xl m-2">
      {/* Heading for this section with bold and large text styling */}
      <h2 className="font-bold text-lg mb-2">Fetch API Example</h2>
      
      {/* Unordered list to display all users */}
      <ul>
        {/* Map over the users array to create a list item for each user
            .map() transforms each user object into a <li> element
            This creates dynamic content based on the fetched data */}
        {users.map((user) => (
          // List item for each user
          // key={user.id} is required by React for efficient list rendering and updates
          // It helps React identify which items have changed, been added, or removed
          <li key={user.id}>
            {/* Display user's name and email, separated by an em dash (—) */}
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
