import Notification from "../src/Theme/notification";
import './App.css'
import AppRouter from './router/common';

function App() {
  return (
    <div>
      <AppRouter/>
      <Notification/>
    </div>
  );
}
export default App;