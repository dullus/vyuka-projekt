# Contact Book 05
## Pridanie, mazanie kontaktu

Cvičenie je zamerané na pochopenie:
- potrdzovaci popup ano / nie
- odosielanie suboru cez formulár



# Výuka

## 1. Čo chceme dnes spraviť
* Spustiť server 05
* Ukázať finálnu podobu

## 2. Postup

### Vymazanie kontaktu
1. Ukazat `index.html` a v nom potvrdzovaci popup
```html
<section class="popup contact-delete" id="contact-delete">
```

2. Ukazat v `app.js` pridanie noveho modulu `addressDelete`

3. Prejst funkctionalitu `addressDelete.js`, znovupouzitelnost `_closePopup`.

4. Ukazat napojenie **delete** buttonu v `addressDetail.js` (8, 42, 65)

### Pridanie kontaktu - button
1. Odkomentovat v `index.html` **Add** button (19-24)

2. Ukazat znovupouzitelnost stylu v `popup.css` class `.popup__button` (od 93)

3. Skusit zmenit button na `fixed` a okruhly. Cele robit v *DevTools* a vysledok prekopirovat do novej triedy v nejakom css.

### Pridanie kontaktu - formular

1. Ukazat v `index.html` pridanie
```html
<input type="hidden" name="picture" value="" />
<input type="file" name="new-picture" accept="image/*" />
```
(156-157) vysvetlit naco nam je tam hidden (serialize nevie "file")

2. Vysvetlit obtiaznost stylovania takeho elementu v `edit.css` (164-193)
a mozne alternativy

3. Prejst zmeny v `addressEdit.js`
 * (24-25) nove kostanty
 * (32) vysvetlit **placeholder.jpg**
 * (97-99) **FormItem** pre picture
 * (167-173) zistovanie ci pridavame obrazok
 * (180,186) promise chaining
 * (191-200) dalsi ajax call pre poslanie obrazku

4. Vysvetlit rozdiel medzi klasickym form submitom a JS driven submitom
 * v nasom forme nemame input/button typu *submit*
 * bezne postupy ako JS ovladat submit
 * `ajax.js` pridany **upload** cez `POST multipart/form-data` (48)
