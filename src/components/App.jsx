import Header from "./Header.jsx"
import {Routes} from "react-router-dom";

function App() {
  return (
    <div className="page">
      <Header />
      <Routes>
        {/*TODO: добавить protected route для защиты путей и переброса на страничку входа*/}

      </Routes>
    </div>
  );
}

export default App;
