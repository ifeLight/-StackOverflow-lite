import redirect from '../functions/redirect';
import Token from '../functions/token'

const signout = function signout() {
    const token = new Token();
    token.removeToken();
    redirect('/index.html');
}

export default signout;