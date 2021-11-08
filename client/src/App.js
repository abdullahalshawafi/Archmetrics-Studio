import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import {Navbar} from "./Components/Navbar"
import {Footer} from "./Components/Footer"
function App() {
  return (
    <Router>
        <div className="App">
              <Routes>
                <Route exact path='/' component={Navbar} />
                <Route exact path='/Services' component={Footer} />
              </Routes>
        </div>
      </Router>
    );
}

export default App;
