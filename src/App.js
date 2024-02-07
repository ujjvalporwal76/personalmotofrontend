import React from "react";

import "./App.css";
import Home from "./Pages/Home";
import { useParams } from "react-router-dom";
import PartHome from "./Pages/PartHome";
import MotorHome from "./Pages/MotorHome";
import TruckHome from "./Pages/TruckHome";
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

function App() {
  const { categoryName } = useParams();
  console.log(categoryName);
  // Default to Home component if no category or invalid category
  const selectedComponent = () => {
    switch (categoryName) {
      case "personal":
        return <Home />;
      case "parts":
        return <PartHome />;
      case "motorcycle":
        return <MotorHome />;
      case "trucks":
      case "delivery":
      case "construction":
      case "trailers":
      case "agricultural":
        return <TruckHome />;
      default:
        return <Home />;
    }
  };

  return <div className="App">{selectedComponent()}</div>;
}

export default App;
