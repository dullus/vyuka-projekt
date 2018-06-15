Animacia
========
- chceme pridat efekt padajuceho okna vzad pri zatvoreni

https://robots.thoughtbot.com/transitions-and-transforms
- transition teoria
- tranformation teoria

- najprv vychodzie hodnoty z minula, centrovanie
.popup {
  transform: translate(-50%, -50%)
}
- robime 3D efekt a teda potrebujeme perspektivu
- pridanie perspective(500px)
- pridanie rotatex(0deg)
- kontrola pomocou 45deg v devtools

- pridame .popup--fall {}
- koncova hodnota rotacie 90deg

- nakoniec transition aby sa to animovalo
.popup {
  ...
  transition: all .4s ease;
}

- JS v popup__close
- pridat popup.addClass('popup--fall');
- ukazat ze nam ostava ciara
- doplnit schovanie a odstranenie triedy
setTimeout(() => {
  popup.hide();
  popup.removeClass('popup--fall');
}, 410);

Carousel
========
- ukazat bootstrap carousel
- https://getbootstrap.com/docs/4.0/components/carousel/
- ukazat strukturu
- pridat obalovatka z bootstrap stranky do tela
  <div class="panel__box panel__box--hero">
- nahradit <img> v priklade <article> tagmi
- pridat PREV NEXT
- pridat INDICATORS

TOOLTIP
=======
- vysvetlit pouzitie
- ukazat standardny tooltip nad (x)
- pridat "title" pre close button
<span class="popup__close" title="Click to close">

- ukazat bootstrap tooltip
- pridat tooltip pre close button
<span class="popup__close" data-toggle="tooltip" data-placement="top" title="Click to close">
- pridat JS
$('.popup__close').tooltip()
- ukazat ako pridat parametre pre delay
$('.popup__close').tooltip({
  delay: {
    show: 500,
    hide: 100
  }
});

Fixed nav
=========
1. chceme aby zahlavie bolo vzdy viditelne
2.
nav {
  position: fixed;
  width: 100%;
  z-index: 10;
}
3. header je schovany, padding zhora
header h1 {
  padding: 42px 10px 10px 10px;
}

Scroll top
==========
1. chceme aby Home tlacitko prescrolovalo stranku hore plynulo
2. upravime tlacitko
<li><a id="home" href="javascript: () => false">Home</a></li>
3. pridame handler
$('#home').on('click', () => {
  $('html, body').animate({ scrollTop: 0 }, 'slow');
});

Youtube Video
=============
1. chceme aby video tlacitko otvorilo okno s youtube
2. prerobit <a> Contact na
<a id="video" href="javascript: () => false">Video</a>
3. popridavat postupne riadky
popup.hide();
videoPopup.find('.popup__body').html(iframe);
videoPopup.show();

4. zatvaranie okna
main.removeClass('blur');
videoPopup.hide();

5. iframe ma okraj, zrusime ho v popup.css
.popup__body iframe {
    border: 0;
}
