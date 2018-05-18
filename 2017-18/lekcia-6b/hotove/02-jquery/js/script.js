const popup = $('#share-article');

$('article').on('click', (evt) => {
  popup.show();
});

$('.popup__close').on('click', () => {
  popup.hide();
});
