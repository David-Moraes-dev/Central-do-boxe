
(() => {
  const {esc,load}=CentralCatalogo;
  load('central-do-boxe', ["Bandagens", "Luvas e kits", "Luvas de boxe", "MMA e treino", "Roupas de treino", "Academia e tatame"], products => {
    const markup=products.map(p=>`<article class="product-card"${p.anchor?` id="${esc(p.anchor)}"`:''}>
      <a class="product-image" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer sponsored"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.name)}" loading="lazy"></a>
      <div class="product-info"><p class="category">${esc(p.category)}</p><h3>${esc(p.name)}</h3><p class="description">${esc(p.description)}</p><p class="price">Consulte o preço na loja</p><a class="button" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer sponsored">Ver oferta</a></div></article>`).join('');
    document.querySelector('.product-grid').innerHTML=markup;
  });
})();
