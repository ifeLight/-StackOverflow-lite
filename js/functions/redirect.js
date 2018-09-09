const redirect = (path) => {
    const hostname = window.location.hostname;
    window.location.href = `${hostname}/${path}`;
}

export default redirect;