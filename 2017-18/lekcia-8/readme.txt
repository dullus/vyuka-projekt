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
