const popup = $('#share-article');
const main = $('main');
const videoPopup = $('#video-popup');

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

$('#popup-close').on('click', () => {
  popup.addClass('popup--fall');
  main.removeClass('blur');
  setTimeout(() => {
    popup.hide();
    popup.removeClass('popup--fall');
  }, 410);
});

$('#popup-close').tooltip({
  delay: {
    show: 500,
    hide: 100
  }
});

$('#home').on('click', () => {
  $('html, body').animate({ scrollTop: 0 }, 'slow');
});

$('#video').on('click', () => {
  let iframe = '<iframe width="100%" height="230" src="https://www.youtube.com/embed/iZT_Dr59KJ8?rel=0"></iframe>';
  main.addClass('blur');
});

$('#video-popup-close').on('click', () => {
});
