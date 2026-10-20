document.addEventListener('DOMContentLoaded', async () => {
  const helloElement = document.querySelector('#hello');
  try {
    const response = await fetch('https://hellosalut.stefanbohacek.dev/?lang=fr');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (helloElement) {
      helloElement.textContent = data.hello;
    }
  } catch (error) {
    if (helloElement) {
      helloElement.textContent = 'Error loading translation';
    }
  }
});
