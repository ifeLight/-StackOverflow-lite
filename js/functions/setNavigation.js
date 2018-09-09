const setNavigation = (page = 1) => {
    const pageNavigation = document.getElementById('pageNav');
    let content;
    if (pageNavigation) {
        if (page === 1) {
            content = `<li><a>Prev</a></li>
            <li class="right"><a href="/#2">Next</a></li>`;
        } else {
            let prevPage = page - 1;
            let nextPage = page + 1;
            content = `<li><a href="/#${prevPage}">Prev</a></li>
            <li class="right"><a href="#${nextPage}">Next</a></li>`;
        }
        pageNavigation.innerHTML = content;
    }
}

export default setNavigation;