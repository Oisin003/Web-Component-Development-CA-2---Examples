// Import React and the useRef hook from the React library
// useRef is used to create mutable references to DOM elements
import React, { useRef } from "react";

// Define and export the RefFormExample functional component
export default function RefFormExample() {
  // Create a ref for the name input field
  // useRef() creates a mutable object with a .current property that persists across re-renders
  // This ref will be attached to the name input element to access its DOM node directly
  const nameRef = useRef();
  
  // Create a ref for the age input field
  // Similar to nameRef, this will give us direct access to the age input's DOM node
  const ageRef = useRef();

  // Define the form submission handler function
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior (which would reload the page)
    e.preventDefault();
    
    // Display an alert with the current values from both input fields
    // Access the input values using the .current.value property of each ref
    alert(`Name: ${nameRef.current.value}\nAge: ${ageRef.current.value}`);
    
    // Clear the name input field by setting its value to an empty string
    nameRef.current.value = "";
    
    // Clear the age input field by setting its value to an empty string
    ageRef.current.value = "";
  };

  // Return the JSX that renders the form
  return (
    // Form element with submit handler and Tailwind CSS styling
    // onSubmit triggers the handleSubmit function when the form is submitted
    <form onSubmit={handleSubmit} className="p-4 border rounded-2xl m-2">
      {/* Heading for the form with bold styling and margin */}
      <h2 className="font-bold text-lg mb-2">Ref Form Example</h2>
      
      {/* Name input field
          - ref={nameRef} attaches the ref to this input element
          - This allows direct DOM access without using controlled components (state)
          - Tailwind classes add border, padding, and right margin */}
      <input ref={nameRef} placeholder="Enter name" className="border p-2 mr-2" />
      
      {/* Age input field
          - ref={ageRef} attaches the ref to this input element
          - type="number" restricts input to numeric values
          - Provides direct DOM access for reading/writing values */}
      <input ref={ageRef} type="number" placeholder="Enter age" className="border p-2 mr-2" />
      
      {/* Submit button with blue background and white text
          - Clicking this button triggers form submission and calls handleSubmit
          - Tailwind classes style the button with colors, padding, and rounded corners */}
      <button className="bg-blue-500 text-white px-3 py-1 rounded">Submit</button>
    </form>
  );
}
