# Contact Book 01
## Zobrazenie kontaktu, kopírovanie elementu.

Cvičenie je zamerané na pochopenie:
- ako postupovať pri realizácii zadania, rozdelenie na podúlohy: item, list, detail, editor
- single page website, plusy a mínusy
- fragmenty html stránky
- normalizácia CSS, bootstrap
- BEM názvoslovie tried v CSS
- palety farieb v CSS
- webfonty
- základy prehľadného UI
- jemné použitie: text/box-shadow, transition, transform, linear-gradient

# Výuka

## 1. Čo chceme dnes spraviť
* spustiť `final.html`
* ukázať finálnu podobu kontakt boxu s pár kópiami
* predviesť responzivitu

## 2. index.html
* študenti majú dispozícii `index.html` s kostrou kontakt boxu a `css/contact.css` s hotovým mobile first positioningom
* vysvetliť `css/normalize-reboot.css` z *Bootstrapu* a prečo sa používa
* vysvetliť `css/font.css` a ozrejmiť ako sa generuje webfont (Fontsquirell, grunt-fontgen, online...)
* pridať link na font.css

## 3. css/contact.css
* pomeniť farby podľa palety
* zmeniť font v `header h1` a pridať nejaký efekt s text-shadow
* pohrať sa s boxíkom kontaktu `.contact`, pridať tieň, transition
* vysvetliť pseudoselektor `:hover` a pridať iný tieň a transformáciu pre `.contact:hover`
* `.contact:hover .contact__name` vyskúšať si `linear-gradient`
* `.contact__force` ukázať ako preštýlovať časť nadpisu + na čo bude modifikátor `.contact__force--dark`

## 4. JS klonovanie prototypu
* pridať do `<div class="contact">` idečko `id="prototype"` a v css nastaviť
```css
#prototype {
    display: none;
}
```
* pár slov o *jQuery* a ako využíva CSS style selektory
* vysvetliť script na konci a spustiť v devtools console funkciu `clone()`
* doplniť nejaký cyklus aby sa zobrazilo 5 klonov kontaktu podľa `final.html` a vyskúšať responzivitu
