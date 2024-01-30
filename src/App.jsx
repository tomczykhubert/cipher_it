import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import Caesar from "./pages/caesar.jsx";
import Polybius from "./pages/polybius.jsx";
import Homophonic from "./pages/homophonic.jsx";
import Trithemius from "./pages/trithemius.jsx";
import Home from "./pages/Home.jsx";

function App() {
  let Component;
  switch (window.location.pathname) {
    case "/caesar":
      Component = Caesar;
      break;
    case "/polybius":
      Component = Polybius;
      break;
    case "/homophonic":
      Component = Homophonic;
      break;
    case "/trithemius":
      Component = Trithemius;
      break;
    default:
      Component = Home;
      break;
  }
  return (
    <div className="App">
      <Navbar />
      <Component />
    </div>
  );
}

export default App;
