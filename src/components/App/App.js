import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { useEffect, useState } from "react";
import * as auth from "../../utils/Auth";
import ProtecedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";
import { filterCheckbox } from "../../utils/utils";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function App() {
  const navigate = useNavigate();
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedShortMovies, setSavedShortMovies] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [currentUser, setCurrentUser] = useState({});
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
          handleLogout();
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
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
            handleLogout();
          });
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && currentUser) {
      setIsLoading(true);
      mainApi.setHeaders();
      mainApi
        .getSavedMovies()
        .then((data) => {
          console.log(data);
          console.log(currentUser);
          const currentUserMovies = data.filter(
            (movie) => movie.owner === currentUser._id
          );
          console.log(currentUserMovies);
          setSavedMovies(currentUserMovies);
          setSavedShortMovies(filterCheckbox(currentUserMovies));
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, currentUser]);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
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

  function handleLogout() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
  }

  function handleUpdateUser(name, email) {
    mainApi.setHeaders();
    mainApi
      .updateUser(name, email)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
  }

  function handleSaveMovie(movie) {
    mainApi
      .setSavedMovie(movie)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
        movie.duration < SHORT_MOVIE_DURATION &&
          setSavedShortMovies([...savedShortMovies, movie]);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteSavedMovie(movie) {
    const deletedMovie = savedMovies.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi.deleteSavedMovie(deletedMovie._id).then(() => {
      const savedMovieList = savedMovies.filter((m) => {
        if (movie.id === m.movieId || movie.movieId === m.movieId) {
          return false;
        } else {
          return true;
        }
      });
      setSavedMovies(savedMovieList);
    });
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
                  savedMovies={savedMovies}
                  onCardClick={handleSaveMovie}
                  onDeleteClick={handleDeleteSavedMovie}
                />
              </ProtecedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtecedRoute path="/saved-movies" loggedIn={loggedIn}>
                <SavedMovies
                  isLoading={isLoading}
                  savedMovies={savedMovies}
                  onDeleteClick={handleDeleteSavedMovie}
                />
              </ProtecedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtecedRoute path="/profile" loggedIn={loggedIn}>
                <Profile
                  handleLogout={handleLogout}
                  handleUpdateUser={handleUpdateUser}
                />
              </ProtecedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register handleRegister={handleRegister} />
              )
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login handleLogin={handleLogin} />
              )
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
