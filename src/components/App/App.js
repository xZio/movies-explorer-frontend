import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
//import { moviesApi } from "../../utils/MoviesApi";
import { useEffect, useState } from "react";
import * as auth from "../../utils/Auth";
import ProtecedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";
import { filterCheckbox } from "../../utils/utils";

function App() {
  const navigate = useNavigate();
  //const location = useLocation();
  /*  const [filteredMovies, setFilteredMovies] = useState(
    localStorage.movies ? JSON.parse(localStorage.movies) : []
  );
  const [shortMovies, setShortMovies] = useState(
    localStorage.shortMovies ? JSON.parse(localStorage.shortMovies) : []
  ); */
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedShortMovies, setSavedShortMovies] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  // const [savedShortMovies, setSavedShortMovies] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  //const [isNothing, setIsNothing] = useState(false);
  /*  const [isShort, setIsShort] = useState(
    localStorage.checkbox ? JSON.parse(localStorage.checkbox) : false
  ); */
  // const [isError, setIsError] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  //const [userEmail, setUserEmail] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi.setHeaders();
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
          setSavedShortMovies(filterCheckbox(data));
          setIsLoading(false);
          // setSavedShortMovies(filterCheckbox(data));
          /* localStorage.setItem("savedMovies", JSON.stringify(data));
          localStorage.setItem(
            "savedShortMovies",
            JSON.stringify(filterCheckbox(data))
          ); */
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        //setUserEmail(email);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("jwt");
      });
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* function getAllMovies() {
    setFilteredMovies([]);
    setShortMovies([]);
    setIsNothing(false);
    setIsLoading(true);
    return moviesApi
      .getMovies()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  } */

  /* function handleCheck() {
    setIsShort(!isShort);
    localStorage.setItem("checkbox", !isShort);

    if (!isShort) {
      shortMovies.length !== 0 ? setIsNothing(false) : setIsNothing(true);
      return;
    }
    filteredMovies.length !== 0 ? setIsNothing(false) : setIsNothing(true);
  }

  function filterMovies(movies, inputValue) {
    return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(inputValue.toLowerCase());
    });
  }

  function filterCheckbox(movies) {
    return movies.filter((movie) => {
      return movie.duration < 40;
    });
  }

  function searchResult(inputValue) {
    getAllMovies().then((data) => {
      setIsLoading(false);
      let movies = filterMovies(data, inputValue);

      localStorage.setItem("movies", JSON.stringify(movies));
      localStorage.setItem(
        "shortMovies",
        JSON.stringify(filterCheckbox(movies))
      );
      localStorage.setItem("searchText", inputValue);
      localStorage.setItem("checkbox", isShort);

      movies.length > 0 ? setIsNothing(false) : setIsNothing(true);

      setFilteredMovies(movies);
      setShortMovies(filterCheckbox(movies));
    });
  } */

  function handleSaveMovie(movie) {
    mainApi
      .setSavedMovie(movie)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
        movie.duration < 40 &&
          setSavedShortMovies([...savedShortMovies, movie]);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteSavedMovie(movie) {
    mainApi.deleteSavedMovie(movie._id).catch((err) => console.log(err));
    setSavedMovies(savedMovies.filter((m) => m !== movie));
    setSavedShortMovies(filterCheckbox(savedMovies.filter((m) => m !== movie)));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtecedRoute path="/movies" loggedIn={loggedIn}>
                <Movies
                  /*   searchResult={searchResult}
                  filteredMovies={filteredMovies}
                  shortMovies={shortMovies}
                  isLoading={isLoading}
                  isNothing={isNothing}
                  isShort={isShort}
                  isError={isError}
                  onChange={handleCheck} */
                  savedMovies={savedMovies}
                  onCardClick={handleSaveMovie}
                />
              </ProtecedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtecedRoute path="/saved-movies" loggedIn={loggedIn}>
                <SavedMovies
                  // searchResult={searchResult}
                  // filteredMovies={filteredMovies}
                  // isNothing={isNothing}
                  isLoading={isLoading}
                  // isError={isError}
                  savedMovies={savedMovies}
                  savedShortMovies={savedShortMovies}
                  // isShort={isShort}
                  //onChange={handleCheck}
                  onDeleteClick={handleDeleteSavedMovie}
                />
              </ProtecedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtecedRoute path="/profile" loggedIn={loggedIn}>
                <Profile />
              </ProtecedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
