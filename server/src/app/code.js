fetch('/background')
  .then((response) => response.text())
  .then((url) => {
    const $backgroundImage = document.querySelector('.background-image');
    $backgroundImage.src = url;
  });
