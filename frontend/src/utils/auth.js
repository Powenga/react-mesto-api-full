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
      body: JSON.stringify({password, email})
    })
      .then(this._onError)
  }

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(this._onError)
  }
}

export default new Auth({
  baseUrl: 'https://pob15.nomoredomains.icu',
});
