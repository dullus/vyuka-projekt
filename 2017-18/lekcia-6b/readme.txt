Popup
* position: fixed
* z-index
* top, left: 50% = vycentruje iba na max screen size
* transform: translate(-50%, -50%); vycentruje na aktualnu velkost
* vysvetlit preco ikonky riesit vektorovym formatom iconfont/svg
* vysvetlit vhodnost svg ikoniek pred iconfontom (= prezije nahradu fontov u dislektikov, farby)
* doplnit buttony pre facebook a twitter

JavaScript
* intro do javascriptu
* kde sa da umiestnit <script> tag
* intro do $() selectorov
* ukazanie script.js - popup premenna
* do popup dame display: none
* pridanie nasho <script> tagu na koniec a preco
* click na article otvori popup
* dorobenie zatvaranie popupu
    $('.popup__close').on('click', () => {
      popup.hide();
    });

JS, SVG + CSS
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
* pohrat sa s efektom
