# Cvičení: Dotaz PATCH

Domácí úkol pro kurz JavaScript 2 od Czechitas.

## 1. Rozbalení položky

Ještě než se pustíme do dotazů typu PATCH, procvičíme si samotné překreslování komponenty `ListItem`. Budeme chtít přidat možnost položku seznamu rozbalit a zobrazit další ovládací prvky. Se serverem v tomto cvičení zatím komunikovat nebudeme.

- Založte si vlastní repozitář, který vyrobte ze šablony [projekt-nakupy-patch](https://github.com/Czechitas-podklady-WEB/projekt-nakupy-patch), tedy z aktuální verze naší aplikace *Nákupy*.

- Upravte vytváření hlavního DOM elementu v komponentě `ListItem` tak, že přidáme tlačítko pro rozbalení položky, tlačítka panelu nástrojů a detail položky.

```javascript
const element = document.createElement('div');
element.classList.add('list-item');
element.classList.add('list-item--expanded');
element.innerHTML = `
    <div class="list-item__toolbar">
      Tlačítka
    </div>
    <button class="icon-btn btn-tick${tickClass}"></button>
    <div class="list-item__body">
      <div class="list-item__product">${product}</div>
      <div class="list-item__amount">${amount} ${unit}</div>
    </div>
    <div class="list-item__detail">
      Detail položky
    </div>
    <div class="list-item__menu">
      <button class="icon-btn btn-menu"></button>
    </div>
  `;
```

Takto vytvoříme položku, která je rovnou rozbalená. Všechny položky ve všech seznamech budou nyní rozbalené.

![ukázka výsledku](https://kodim.cz/cms/assets/kurzy/daweb/js2/webpack/cv-dotaz-patch/cvlekce%3Erozbaleni-polozky/rozbaleno.png)

- Do komponenty `ListItem` přidejte *props* `xpanded`, pomocí které budeme chtít ovládat rozbalení položky. Když bude tato *props* mít hodnotu `true`, vytvořte hlavní element se třídou `.list-item--expanded`. V případě hodnoty `false` tuto třídu nepřidávejte.

- Nyní stačí vytvořit posluchač události pro tlačítko `.btn-menu`, který překreslí celou komponentu pomocí funkce `replaceWith` s opačnou hodnotou *props* `expanded`.

- Nyní by mělo být možné každou položku individuálně rozbalit nebo sbalit. Obsah panelu nástrojů a panel s detaily naplníme později.

## 2. Úprava položky

Navážeme na předchozí cvičení a umožníme u každé položky upravit název, množství nebo jednotku. K tomu bude potřeba do detailu položky přidat formulář a odeslat data z něj na server pomocí dotazu PATCH.

- Pokračujte v projektu z předchozího cvičení. Upravíme DOM element komponenty `ListItem` tak, že do detailu položky přidáme formulář pro editaci názvu, množství a jednotky. Jde o téměř stejný formulář, jako jsme už vytvořili při přidání nové položky.

```html
<div class="list-item__detail">
  <form>
    <div class="form-fields">
      <input class="field-input product-input" value="${product}" />
      <input class="field-input amount-input" value="${amount}" />
      <input class="field-input unit-input" value="${unit}" />
    </div>
    <div class="form-controls">
      <button class="btn-confirm">Potvrdit</button>
    </div>
  </form>
</div>
```html

- Vytvořte posluchač události obsluhující odeslání formuláře. Nejdříve si jen do konzole vypište data sebraná z formuláře.
- Do obsluhy události přidejte `fetch`, který pomocí metody PATCH odešle na server upravená data položky. Adresa položky je stejná jako při změně zaškrtnutí

```javascript
https://nakupy.kodim.app/api/me/week/:day/items/:id
```

Budeme odesílat JSON *body* ve stejném formátu, jako když jsme přidávali novou položku. Podívejte se do komponenty `ShopList` jaký tvar má mít *body* a odešlete jej stejným způsobem. Při aktualizaci položky si dejte pozor, abyste jí poslali všechny *props*, které potřebuje.
- Nyní byste měli být schopní měnit obsah položky pomocí vytvořeného formuláře.