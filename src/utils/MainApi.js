import { BASE_URL } from "./Auth";

class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  setHeaders() {
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setSavedMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
  }) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: { url: image.url },
        trailerLink: trailerLink,
        thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        nameRU: nameRU,
        nameEN: nameEN,
        movieId: id,
      }),
    }).then(this._checkResponse);
  }

  deleteSavedMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const mainApi = new MainApi({
  url: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});
