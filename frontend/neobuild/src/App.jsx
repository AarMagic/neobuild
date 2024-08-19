import { createContext } from "react";
import { Routing } from "./routes/Routing";
import { LanguagesContext } from "./context/LanguagesContext";

function App() {
  const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "PHP",
    "TypeScript",
    "Ruby",
    "Swift",
    "Go",
    "Kotlin",
    "Rust",
    "SQL",
    "R",
    "Dart",
    "Scala",
    "Perl",
    "Shell",
    "Objective-C",
    "Haskell",
    "MATLAB",
    "Lua",
    "Groovy",
    "Elixir",
  ];
  return (
    <div className="App">
      <LanguagesContext.Provider value={languages}>
        <Routing />
      </LanguagesContext.Provider>
    </div>
  );
}

export default App;
