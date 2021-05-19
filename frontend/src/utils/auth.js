import { BASE_URL } from '../utils/constants';

class Auth {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _onError(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res);
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
      .then(res => res.ok ? Promise.resolve() : Promise.reject())
  }

  checkAutorization() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => res.ok ? Promise.resolve() : Promise.reject())
  }

  logout() {
    return fetch(`${this._baseUrl}/users/me/logout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => res.ok ? Promise.resolve() : Promise.reject())
  }
}

export default new Auth({
  baseUrl: BASE_URL,
});
