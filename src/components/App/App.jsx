import {Navigate, Route, Routes} from 'react-router-dom'
import Header from '../Header/Header.jsx'
import Auth from "../Auth/Auth.jsx";

function App() {
  return (
    <div className='page'>
      <Header />
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/auth" />}
        />

        <Route
          path="/auth"
          element={<Auth/>}
        />
        
        {/*TODO: добавить protected route для защиты путей и переброса на страничку входа*/}
      </Routes>
    </div>
  )
}

export default App
