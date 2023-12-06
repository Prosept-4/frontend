import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import Header from '../Header/Header.jsx'
import Auth from '../Auth/Auth.jsx';
import Table from '../Table/Table.jsx';
import Main from '../Main/Main.jsx';
import Loader from '../Loader/Loader.jsx';
import api from '../../utils/Api'
import {useEffect, useState} from "react";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import Popup from "../Popup/Popup.jsx";
import Statistic from "../Statistic/Statistic.jsx";

function App() {
  const navigate = useNavigate();

  const [isLoaderOpen, setLoaderOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});

  const [matchedItems, setMatchedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(matchedItems.count/10)

  const [statisticData, setStatisticData] = useState({});

  function getStatistic(token) {
    setLoaderOpen(true)

    api.getStatistic(token)
      .then((res) => {
        setStatisticData(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoaderOpen(false)
      })
  }

  function getMatchedItems(token) {
    setLoaderOpen(true)

    if (currentPage === 1) {
      api.getAllMatchedItems(token)
        .then((res) => {
          setMatchedItems(res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoaderOpen(false)
        })
    } else if (currentPage <= maxPage) {
      api.getDirectMatchedItems(token, currentPage)
        .then((res) => {
          setMatchedItems(res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoaderOpen(false)
        })
    } else {
      setCurrentPage(maxPage)
    }
  }

  function deleteMatchedItems(token, id) {
    setLoaderOpen(true)

    api.deleteMatchedItems(token, id)
      .then(() => {
        setMatchedItems((state) => {
          return {
            ...state,
            results: state.results.reduce((acc, rec) => {
              if(rec.id === id) {
                return [...acc]
              }
              return [...acc, rec]
            }, [])
          }
        })
        console.log(matchedItems)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoaderOpen(false)
      })
  }

  function handleLogin({ email, password}) {
    setLoaderOpen(true)

    api.login(email, password)
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

  function handleTokenCheck() {
    setLoaderOpen(true)

    const token = localStorage.getItem('token')

    if(token) {
      api.checkToken(token)
        .then(() => {
          setLoggedIn(true);
          navigate('/main',{replace: true});
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoaderOpen(false);
        })
    }

    setLoaderOpen(false);
  }

  useEffect(() => {
    handleTokenCheck();
    getStatistic(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    getMatchedItems(localStorage.getItem('token'));
  }, [currentPage, isLoggedIn]);

  return (
    <div className='page'>
      <Header
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route
          path="/auth"
          element={<Auth onSubmit={handleLogin}/>}
        />

        <Route
          path="/main"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={Main}
            />
          }
        />

        <Route
          path="/table"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={Table}
              matchedItems={matchedItems}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={maxPage}
              deleteMatchedItems={deleteMatchedItems}
              setPopupOpen={setPopupOpen}
              setPopupData={setPopupData}
            />
          }
        />

        <Route
          path="/stats"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={Statistic}
              data={statisticData}
            />
          }
        />

        <Route
          path="*"
          element={<Navigate to="/auth" />}
        />
      </Routes>
      <Popup
        setOpen={setPopupOpen}
        isOpen={isPopupOpen}
        setData={setPopupData}
        data={popupData}
      />
      <Loader
        isOpen={isLoaderOpen}
      />
    </div>
  )
}

export default App
