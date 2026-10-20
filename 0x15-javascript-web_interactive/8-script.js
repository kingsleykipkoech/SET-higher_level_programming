const fetchMovies = async () => {
  const listElement = document.querySelector('#list_movies');
  try {
    const response = await fetch('https://swapi-api.alx-tools.com/api/films/?format=json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (listElement) {
      for (const movie of data.results) {
        const listItem = document.createElement('li');
        listItem.textContent = movie.title;
        listElement.appendChild(listItem);
      }
    }
  } catch (error) {
    if (listElement) {
      const errorItem = document.createElement('li');
      errorItem.textContent = 'Error loading movies';
      listElement.appendChild(errorItem);
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchMovies);
} else {
  fetchMovies();
}
