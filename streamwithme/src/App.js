import './components/styles/App.css';
import Navbar from './components/Navbar';
import Backgroundvideo from './components/Backgroundvideo';
import CreateRoom from './components/CreateRoom';

function App() {
  return (
    <div className="App">
        <nav><Navbar/></nav>
        <CreateRoom/>
        <Backgroundvideo/>
    </div>
  );
}

export default App;