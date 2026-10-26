
(() => {
  const {esc,load}=CentralCatalogo;
  const grid=document.querySelector('.product-grid');
  const filters=document.getElementById('categorias-boxe');
  const count=document.getElementById('resultado-filtro-boxe');
  const order=['Luvas de boxe','Bandagens','Luvas e kits','Sacos de pancada','Cuidados com equipamentos','Protetores bucais','Manoplas'];
  let selected='';
  function cards(){return [...grid.querySelectorAll('.product-card')];}
  function category(card){return card.querySelector('.category')?.textContent.trim()||'';}
  function applyFilter(){
    let shown=0;
    for(const card of cards()){card.hidden=Boolean(selected&&category(card)!==selected);if(!card.hidden)shown++;}
    for(const button of filters.querySelectorAll('button'))button.setAttribute('aria-pressed',String(button.dataset.category===selected));
    count.textContent=shown===1?'1 produto':`${shown} produtos`;
  }
  function refreshFilters(){
    const present=new Set(cards().map(category).filter(Boolean));
    if(selected&&!present.has(selected))selected='';
    const categories=[...order.filter(c=>present.has(c)),...[...present].filter(c=>!order.includes(c)).sort()];
    const focused=document.activeElement;
    const restoreFocus=filters.contains(focused)?focused.dataset.category:null;
    filters.replaceChildren();
    for(const name of ['',...categories]){
      const button=document.createElement('button');button.type='button';button.dataset.category=name;button.textContent=name||'Todos';button.setAttribute('aria-pressed',String(name===selected));filters.append(button);
    }
    filters.hidden=false;count.hidden=false;applyFilter();
    if(restoreFocus!==null){const target=[...filters.querySelectorAll('button')].find(b=>b.dataset.category===restoreFocus)||filters.querySelector('button');target?.focus();}
  }
  filters.addEventListener('click',event=>{const button=event.target.closest('button');if(!button||!filters.contains(button))return;selected=button.dataset.category;applyFilter();});
  // Também inicializa sobre os cards de reserva, sem depender de fetch/file://.
  refreshFilters();
  load('central-do-boxe', ["Bandagens", "Luvas e kits", "Luvas de boxe", "Sacos de pancada", "Cuidados com equipamentos", "Protetores bucais", "Manoplas"], products => {
    const markup=products.map(p=>`<article class="product-card"${p.anchor?` id="${esc(p.anchor)}"`:''}>
      <a class="product-image" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer sponsored"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.name)}" loading="lazy"></a>
      <div class="product-info"><p class="category">${esc(p.category)}</p><h3>${esc(p.name)}</h3><p class="description">${esc(p.description)}</p><p class="price">Consulte o preço na loja</p><a class="button" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer sponsored">Ver oferta</a></div></article>`).join('');
    grid.innerHTML=markup;
    refreshFilters();
  });
})();
