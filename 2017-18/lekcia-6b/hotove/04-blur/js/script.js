const popup = $('#share-article');
const main = $('main');

$('article').on('click', (evt) => {
  main.addClass('blur');
  const source = $(evt.currentTarget);
  const bgImage = source.css('background-image');
  const title = source.find('h2').text();
  const text = source.find('p').text();

  popup.find('.popup__body').css({'background-image': bgImage});
  popup.find('.popup__title h2').text(title);
  popup.find('.popup__title p').text(text);
  popup.show();
});

$('.popup__close').on('click', () => {
  popup.hide();
  main.removeClass('blur');
});

