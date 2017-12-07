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
- ukazat standardny tooltip
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
