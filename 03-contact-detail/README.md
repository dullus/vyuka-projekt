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
* podľa `final.html` vysvetliť štruktúru
```html
<section class="popup contact-detail" id="contact-detail">
```
* vysvetliť `data` atribút

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
