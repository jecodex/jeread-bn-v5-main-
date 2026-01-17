import React from "react";

// ClientSide component to display the jokes
const ClientSide = ({ jokes }) => {
  // Check if jokes are available
  if (!jokes || jokes.length === 0) {
    return <div>No jokes available at the moment.</div>; // Message when there are no jokes
  }

  return (
    <div className="jokes-container">
      <h2 className="text-xl font-bold mb-4">Jokes</h2>
      <ul className="space-y-4">
        {jokes.map((joke) => (
          <li key={joke.id} className="border p-4 rounded shadow-sm">
            <p>{joke.content}</p> {/* Display the joke content */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSide;
