const popup = document.querySelector('#share-article');

function popupShow() {
  popup.style.display = 'block';
  event.stopPropagation();
}

function popupHide(event) {
  popup.style.display = 'none';
  event.stopPropagation();
}

document.querySelectorAll('article').forEach((el) => {
  el.addEventListener('click', popupShow);
});

document.querySelector('.popup__close').addEventListener('click', popupHide);
