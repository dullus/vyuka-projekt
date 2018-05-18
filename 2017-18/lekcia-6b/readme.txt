01-js
* umiestnenie <script> tagu
* querySelector, querySelcetorAll - co to je a naco sa pouziva
* zmena stylu elementu cez JS
* funkcia, spustenie funkcie v konzole
* funkcie popupShow, popupHide
* Eventy, event driven, event listener, event handler

02-jquery
* pridanie kniznice do <head>
* intro do $() selectorov
* dorobenie zatvaranie popupu
    $('.popup__close').on('click', () => {
      popup.hide();
    });

03-svg-css
* vymazeme texty a style v .popup__body
* vysvetlit dynamicke nahradzovanie dat v popupe
* pridame scripty na kopirovanie obrazkov, textov do .popup_body
  const text = source.find('p').text();
* nakopirovanie do popupu:
  popup.find('.popup__body').css({'background-image': bgImage});
  popup.find('.popup__title h2').text(title);
  popup.find('.popup__title p').text(text);
* close button - vysvetlit ako sa zmenil a ako cez CSS ovplyvnujeme jeho vlastnosti

BLUR
* vyvetlit preco je dobre znizit kontrast pozadia, napriklad blurom
* v DevTools pridat blur do <main class="blur">
* vyvetlit ze to urobime dynamicky v JS
* pridat premennu pre <main>
  const main = $('main');
* pridat do handlerov
  main.addClass('blur');
  main.removeClass('blur');
* pohrat sa s efektom v dev tools - ease out atd, zapinat vypinat filter
