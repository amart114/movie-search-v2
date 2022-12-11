import './App.css';
import {Routes, Route} from "react-router-dom"
import Search from "./components/Search"
import Watchlist from "./components/Watchlist"

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
}

export default App;
