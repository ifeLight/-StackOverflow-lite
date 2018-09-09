class Token {
    getToken() {
        if (sessionStorage.getItem('auth-token')) {
            return sessionStorage.getItem('auth-token');
        } else {
            return null;
        }
    }

    setToken(token) {
        return sessionStorage.setItem('auth-token', token);
    }

    removeToken() {
        return sessionStorage.removeItem('auth-token');
    }
}

export default Token;