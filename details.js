  const apiURL = "https://diwserver.vps.webdock.cloud/products";

function createSkeletonCard() {
    return `
    <div class="row">
    <div class="col-md-5">
    <h1>Detalhes do Produto</h1>
    <img alt="Imagem do Produto" class="foto">
  </div>
      <div class="col-md-7 caixa">
        <h2></h2>
        <p></p>
        <p></p>
        <button id="add-to-cart-btn" class="btn btn-dark">Adicionar ao Carrinho</button>
      </div>
    </div>

  `;
}

function createProductCard(product) {
    return `

        <div class="col-md-7 col-sm-12 lala">
          <h1>Detalhes do Produto</h1>
          <img src="${product.image}" alt="Imagem do Produto" class="foto">
        </div>
        <div class="col-md-7 col-sm-12 caixa">
          <h2>${product.title}</h2>
          <p>${product.category}</p>
          <p>Preço: R$ ${product.price}</p>
          <button id="add-to-cart-btn" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Adicionar ao Carrinho</button>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Produto adicionado ao carrinho!</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 10px;">
            <label for="quantity" style="margin-bottom: 10px;">Quantidade:</label>
            <input type="number" id="quantity" name="quantity" min="1" max="10" value="1">
          </div> 
          <p class="small-text" style="margin-top: 10px;">Divida de até 12x sem juros</p>
          <p class="small-text">5% OFF com PIX</p>
          <p class="small-text"><a href="#">Ver meios de pagamento e promoções</a></p>
          <p class="small-text"><a href="#">Saiba os prazos de entrega e as formas de envio.</a></p>
          <p class="small-text">Estoque disponível</p>
          <p class="small-text">Devolução grátis. Você tem 7 dias a partir da data de </p>
          <p class="small-text"> recebimento.
          <p class="small-text">Compra Garantida. Abre em uma nova janela, receba</p>
          <p class="small-text"> o produto que está esperando ou devolvemos o
          <p class="small-text"> dinheiro. </p>
          <p class="small-text">12 meses de garantia de fábrica.</p>
        </div>
    
      
    `;
  }
  

  
async function fetchProducts(searchTerm = '') {
  try {
    const urlParams = new URLSearchParams(location.search);
    const productId = urlParams.get('id');
    const data = await fetch(`${apiURL}/${productId}`).then(res => res.json());
    console.table(data);
    return data?.products || data;
  } catch (error) {
    renderError();
    console.error(error);
  }
}


async function displayProducts(searchTerm = '') {
    const product = await fetchProducts(searchTerm);
    const productsDiv = $('.container');
    productsDiv.append(createProductCard(product));

}

function renderSkeletons(skeletonQuantity) {
    const productsDiv = $('#products');
    for (let i = 0; i < skeletonQuantity; i++) {
        productsDiv.append(createSkeletonCard());
    }
}

function renderError() {
    const productsDiv = $('#products');
    productsDiv.empty();
    productsDiv.append(`
    <div class="col-12">
      <h2 class="text-center">Erro no servidor. Tente novamente.</h2>
    </div>
  `);
}

displayProducts()
  
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function() {

  const searchTerm = document.getElementById('searchInput').value;

  
  window.location.href = 'pesquisa.html?search=' + searchTerm;
});