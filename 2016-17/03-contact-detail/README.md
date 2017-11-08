# Contact Book 03
## Zobrazenie detailu kontaktu

Cvičenie je zamerané na pochopenie:
- popup okná v HTML/CSS
- ako získať dáta pre detail
- zobrazenie dát v popup okne
- on/off popup okna
- data atribút v html tagu

# Výuka

## 1. Čo chceme dnes spraviť
* Spustiť server 03
* Ukázať finálnu podobu zoznamu a popup okna

## 2. HTML & CSS prototyp popup okna
1. ukázať `final.html` vysvetliť čo je popup
2.	spustiť `index.html`, vysvetliť štruktúru
```html
<section class="popup contact-detail" id="contact-detail">
```
-	vysvetliť o čom je popup a akú techniku použiť
3.	odkomentujte `<header>`
 -	vysvetliť svg a prvý spôsob pripojenia = svg tagy
 -	v `popup.css` odkomentovať a vysvetliť (57) `/* stroke: #ffffff; */ `
4.	odkomentujte `<footer>`
 -	vysvetliť `<button>` tag a že do vnútra môže ísť mnoho iných tagov
 -	vysvetliť druhý typ pripojenia svg = img tag
 -	prejst v `popup.css` (122-123) `text-transform` a `float:left`
 -	vysvetliť prečo máme dočasne `clear:both` za `<footer>` - lebo float
5.	odkomentujte `<div class="contact-detail__text">`
 -	vysvetliť label / value princíp
 -	vysvetliť `display:table` (58), `table-cell` (71)
6.	`popup.css`
 -	odkomentujte vycentrovanie (8-10)
 -	zmeňte position na `absolute` (6)
 -	odkomentujte transormáciu, vysvetliť fintu -50% -50%
 -	zmeňte position na `fixed` (6), vysvetliť rozdiel
7.	odkomentujte tieňovanie v `popup.css` aby sa zvýraznil popup efekt (3-4)

## 3. src/js/app.js
* Vysvetliť že pridávame ďalší modul
```javascript
08 import {addressDetail} from 'address/addressDetail';
```

* a spúšťame jeho inicializáciu
```javascript
20 addressDetail.init();
```

## 4. src/js/addressList.js
* Vysvetliť `_bindItem` metódu
```javascript
element.on('click', (e) => {
    addressDetail.draw(e.currentTarget.dataset['id']);
});
```

* a jej napojenie pri vytváraní listu
```javascript
72 this._bindItem(newElement);
```

## 5. src/js/addressDetail.js
* Vysvetliť `_initElements` prečo uchovávavme dané selectory
* Vysvetliť `_initBindings` ako obsluhujeme tlačidlá
* Vysvetliť `draw` a prečo preskakujeme ak `id === this._lastId`
