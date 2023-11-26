import { Routes, Route } from 'react-router-dom'
import Main from '../Main/Main.jsx'
import Header from '../Header/Header.jsx'

function App() {
  return (
    <div className='page'>
      <Header />
      <Routes>
        {/*TODO: добавить protected route для защиты путей и переброса на страничку входа*/}
        <Route path='/' element={<Main />} />
      </Routes>
    </div>
  )
}

export default App
