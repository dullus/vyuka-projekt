const popup = $('#share-article');

$('article').on('click', (evt) => {
  const source = $(evt.currentTarget);
  const bgImage = source.css('background-image');
  const title = source.find('h2').text();

  popup.show();
});

$('.popup__close').on('click', () => {
  popup.hide();
});
