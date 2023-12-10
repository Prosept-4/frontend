import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import Auth from '../Auth/Auth.jsx'
import Table from '../Table/Table.jsx'
import Main from '../Main/Main.jsx'
import Loader from '../Loader/Loader.jsx'
import api from '../../utils/Api'
import { useEffect, useState } from 'react'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import Popup from '../Popup/Popup.jsx'
import Statistic from '../Statistic/Statistic.jsx'

function App() {
  const navigate = useNavigate()

  const [isAppLoading, setIsAppLoading] = useState(true)
  const [isLoaderOpen, setLoaderOpen] = useState(false)
  const [isLoggedIn, setLoggedIn] = useState(false)

  const [isPopupOpen, setPopupOpen] = useState(false)
  const [popupData, setPopupData] = useState({})

  const [matchedItems, setMatchedItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [predictions, setPredictions] = useState([])

  function deleteMatchedItems(id) {
    setLoaderOpen(true)

    api
      .deleteMatchedItems(id)
      .then(() => {
        setMatchedItems(matchedItems.filter((prod) => prod.id !== id))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoaderOpen(false)
      })
  }

  function handleLogin({ email, password }) {
    setLoaderOpen(true)

    api
      .login(email, password)
      .then((res) => {
        localStorage.setItem('token', res.access)
        setLoggedIn(true)
        navigate('/main')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoaderOpen(false)
      })
  }

  useEffect(() => {
    setLoaderOpen(true)
    const token = localStorage.getItem('token')
    if (token) {
      api
        .checkToken()
        .then(() => {
          setLoggedIn(true)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoaderOpen(false)
          setIsAppLoading(false)
        })
    } else {
      setLoggedIn(false)
      setIsAppLoading(false)
      setLoaderOpen(false)
    }
  }, [])

  return (
    <div className='page'>
      {!isAppLoading && (
        <>
          <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            {!isLoggedIn && (
              <Route path='/auth' element={<Auth onSubmit={handleLogin} />} />
            )}

            <Route
              path='/main'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} element={Main} />
              }
            />

            <Route
              path='/table'
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Table}
                  matchedItems={matchedItems}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  maxPage={maxPage}
                  setMaxPage={setMaxPage}
                  deleteMatchedItems={deleteMatchedItems}
                  setPopupOpen={setPopupOpen}
                  setPopupData={setPopupData}
                  setLoaderOpen={setLoaderOpen}
                  setMatchedItems={setMatchedItems}
                  setPredictions={setPredictions}
                />
              }
            />

            <Route
              path='/stats'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} element={Statistic} />
              }
            />

            {isLoggedIn && (
              <Route path='*' element={<Navigate to='/main' />} />
            )}
            {!isLoggedIn && (
              <Route path='*' element={<Navigate to='/auth' />} />
            )}
          </Routes>
          <Popup
            setOpen={setPopupOpen}
            isOpen={isPopupOpen}
            setData={setPopupData}
            data={popupData}
            setPredictions={setPredictions}
            predictions={predictions}
            setMatchedItems={setMatchedItems}
          />
        </>
      )}
      <Loader isOpen={isLoaderOpen} />
    </div>
  )
}

export default App
