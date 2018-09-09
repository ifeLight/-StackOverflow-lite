const getHash = () => {
    return window.location.hash.slice(1,window.location.hash.length)
}

export default getHash;