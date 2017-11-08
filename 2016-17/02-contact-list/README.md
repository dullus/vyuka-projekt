# Contact Book 02
## Zobrazenie zoznamu kontaktov z databázy uloženej na serveri.

Cvičenie je zamerané na pochopenie:
- čo je server a ako môže poskytovať dáta
- ako získať dáta dynamicky pomocou AJAX
- ako pracovať so získanými dátami
- advanced JS - moduly, bundling, building tools (Grunt)

# Inštalácia
### Prerequisties

* NodeJS 6.9+

Na novom PC bude potrebné ešte globálne doinštalovať

```shell
npm install -g grunt babel-cli
```

### Install

```shell
cd vyuka-projekt/02-contact-list
npm install
```

### Compile
Devel ES6 verzia s mapou pre DevTools
```shell
grunt dev
```

alebo produkčný ES5 bundle bez mapy
```shell
grunt
```

### Run
zadajte URL http://localhost:3000

### Demo REST api
- http://localhost:3000/api/address
- http://localhost:3000/api/address/101

### Demo dáta
súbor `server/fixtures/rest/sw.json`

# Výuka

## 1. Čo chceme dnes spraviť
* Spustiť server
* Ukázať finálnu podobu zoznamu

## 2. src/js/app.js

* vysvetliť `import`
* zakomentovať riadky
```javascript
07 import {addressListFinal} from 'address/addressListFinal';
19 addressListFinal.init();
```
* odkomentovať riadky
```javascript
06 import {addressList} from 'address/addressList';
18 addressList.init();
```
* rebuildnúť
```shell
grunt dev
```
* reload stránky

## 3. src/js/address/addressList.js

* vyvetliť OOP modul v ES6
* ukázať dáta http://localhost:3000/api/address/101
* vysvetliť kvázi model `const ADDRESS_FIELDS`
* vysvetliť `getList` a `drawList`
* odkomentovať druhý záznam v `drawList`
* postupne vysvetliť `_drawItem` a priebežne odkomentovávať `case` a položky v `const ADDRESS_FIELDS`
* nakoniec doimplementovať iteráciu v `drawList` podľa súboru `src/js/address/addressListFinal.js`
