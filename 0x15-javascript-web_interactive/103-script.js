document.addEventListener('DOMContentLoaded', () => {
  const languageInput = document.querySelector('#language_code');
  const translateBtn = document.querySelector('#btn_translate');
  const helloDiv = document.querySelector('#hello');

  const fetchTranslation = async () => {
    const lang = languageInput ? languageInput.value.trim() : '';
    if (!lang) {
      return;
    }
    try {
      const response = await fetch(`https://hellosalut.stefanbohacek.dev/?lang=${encodeURIComponent(lang)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (helloDiv) {
        helloDiv.textContent = data.hello;
      }
    } catch (error) {
      if (helloDiv) {
        helloDiv.textContent = 'Error loading translation';
      }
    }
  };

  if (translateBtn) {
    translateBtn.addEventListener('click', fetchTranslation);
  }

  if (languageInput) {
    languageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        fetchTranslation();
      }
    });
  }
});
