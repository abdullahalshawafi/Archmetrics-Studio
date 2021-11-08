import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import{Services} from "./Pages/Services"
function App() {
  return (
    <Router>
        <div className="App">
                  <Services/>
        </div>
      </Router>
    );
}

export default App;
