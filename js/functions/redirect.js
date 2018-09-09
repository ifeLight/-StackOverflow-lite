const redirect = (path) => {
    const hostname = window.location.hostname;
    window.location.href = `${path}`;
}

export default redirect;