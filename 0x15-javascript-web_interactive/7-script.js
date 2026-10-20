const fetchCharacter = async () => {
  const characterElement = document.querySelector('#character');
  try {
    const response = await fetch('https://swapi-api.alx-tools.com/api/people/5/?format=json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (characterElement) {
      characterElement.textContent = data.name;
    }
  } catch (error) {
    if (characterElement) {
      characterElement.textContent = 'Error loading character';
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchCharacter);
} else {
  fetchCharacter();
}
