import { REACT_APP_BASE_URL as BASE_URL } from '../utils/constants';

class Auth {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _onError(res) {
    return res.json()
    .then(data => {
      if(res.ok) {
        return Promise.resolve(data)
      }
      if(data.message === 'celebrate request validation failed') {
        console.log(data);
        data = data.validation.body;
      }
      return Promise.reject(data);
    })
  }

  signUp(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password, email})
    })
      .then(this._onError)
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password, email}),
      credentials: 'include',
    })
      .then(this._onError)
  }

  checkAutorization() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(this._onError)
  }

  logout() {
    return fetch(`${this._baseUrl}/users/me/logout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(this._onError)
  }
}

export default new Auth({
  baseUrl: BASE_URL,
});
