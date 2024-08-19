import { createContext } from "react";
import { Routing } from "./routes/Routing";
import { FilterProvider } from "./context/FilterContext";
import { LanguagesProvider } from "./context/LanguagesContext";

function App() {
  return (
    <div className="App">
      <FilterProvider>
        <LanguagesProvider>
          <Routing />
        </LanguagesProvider>
      </FilterProvider>
    </div>
  );
}

export default App;
