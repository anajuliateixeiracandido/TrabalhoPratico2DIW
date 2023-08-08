const apiURL = "https://diwserver.vps.webdock.cloud/products";


function createSkeletonCard() {
  return `
    <div class="col-lg-4 col-md-6">
      <div class="card card-skeleton">
        <div class="card-body">
          <div class="img">
          <h5 class="card-title"></h5>
          <p class="card-text category"></p>
          <p class="card-text price"></p>
          <button>Compre aqui</button>
        </div>
      </div>
    </div>
  `;
}

function createProductCard(product) {
  return `
    <div class="product-card" data-category="${product.category}">
      <div class="card">
        <img class="card-img-top" src="${product.image}" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text category">${product.category}</p>
          <p class="card-text price">${product.price} USD</p>
          <a href="details.html?id=${product.id}"> <button  class="btn btn-outline-dark">Clique aqui</button> </a>
        </div>
      </div>
    </div>
  `;
}


async function fetchProducts(searchTerm = '') {
  try {
    const url = getUrl(searchTerm, 25);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data?.products || data;
  } catch (error) {
    renderError();
    console.error(error);
  }
}


getUrl = (searchTerm, pageItems = 12) => {
  if (searchTerm) {
    return `${apiURL}/search?query=${searchTerm}`
  }
  return `${apiURL}?page_items=${pageItems}`
}


async function displayProducts(searchTerm = '') {
  const products = await fetchProducts(searchTerm);
  const productsDiv = $('#products');
  console.table(products)
  productsDiv.empty();
  if (products?.length) {
    products.forEach(function (product) {
      productsDiv.append(createProductCard(product));
    });
  } else {
    productsDiv.append(`
      <div class="col-12">
        <h5 class="text-center">Nenhum produto encontrado.</h2>
      </div>
    `);
  }
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




renderSkeletons(6);
displayProducts();
