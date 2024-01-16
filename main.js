const API_LINK = "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc";
const IMG_PATH = "https://image.tmdb.org/t/p/original";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?query=";


const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmQ1ZTA0YmI4OTI0YjMwMjc5MDIxMzJlM2YxNTdkZCIsInN1YiI6IjY1YTVlOWFkMDNmMGI2MDBjNmQ1ZTI4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TW9xKFHPolQ-56FJVQ3gWopZa6YSNDxIvMc5oTmswEY'
    }
};

returnMovies(API_LINK);

function returnMovies(url) {
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                title.innerHTML = `${element.title}`;
                const postPath = element.poster_path;
                (postPath != null) ? image.src = IMG_PATH + postPath : image.src = "images/no-image.png";

                div_card.appendChild(image);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);
                main.appendChild(div_row);
            })
        })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});