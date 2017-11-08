# Contact Book 04
## Editácia kontaktu

Cvičenie je zamerané na pochopenie:
- ako získať dáta pre edit
- zobrazenie dát v popup okne
- ako pracuje `<form>`
- validácia údajov formulára

# Výuka

## 1. Čo chceme dnes spraviť
* Spustiť server 04
* Ukázať finálnu podobu popup okna editácie

## 2. Postup
1. ukázať `final.html` vysvetliť čo je `<form>`

2. prepnúť final verziu
 - zakomentovať `addressEditFinal` v `app.js` a odkomentovať `addressEdit` (8-9)
 - zakomentovať `addressEditFinal` v `addressDetail.js` a odkomentovať `addressEdit` (7-8)

3. spustiť `index.html`, vysvetliť štruktúru
```html
<section class="popup contact-edit" id="contact-edit">
```
4. otvoriť `addressEdit.js` a vysvetliť
 - extends
 - framework na validáciu údajov

5. vyskúšať si zmenu v "name"

6. odkomentovať v `index.html` button (155-158)

7. skúsiť poslať validné dáta v "name"
 - skontrolovať v shelli čo dostal server
 - vysvetliť ako sa prekreslil zoznam aj detail v `_submitSuccess()`

8. skúsiť poslať nevalidné dáta v "name"

9. zavrieť okno a znovu otvoriť na editáciu
 - vysvetliť preco chybová hláška ostala

10. CSS sibling selector v `edit.css` (120-122)
  - schovanie chybovej hlášky pri znouotvorení okna s errorom, odkomentuj (117)

11. Odkomentovať inputy v `index.html` (108-130) a príslušné `FormItem` v `addressEdit.js` (53-85)

12. Vysvetliť `<select>` a `<textarea>`
 - v našom prípade `<select>` nepotrebuje validátor a teda ani `FormItem`
 - v `index.html` (131-150) a príslušné `FormItem` v `addressEdit.js` (86-97)
