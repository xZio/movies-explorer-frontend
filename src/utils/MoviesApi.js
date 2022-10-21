import { ALL_MOVIES_URL } from "./constants";

class MoviesApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi({
  url: ALL_MOVIES_URL,
  headers: {
    "content-type": "application/json",
  },
});
