const productDOM = document.querySelector(".product");
const url = "https://www.course-api.com/javascript-store-single-product";

const fetchProduct = async () => {
  try {
    productDOM.innerHTML = `<h4 class="product-loading">Loading...</h4>`;
    // console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(id);
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    productDOM.innerHTML = `
            <p class="error">there was an error, please try again later</p>
          `;
  }
};

const displayProduct = (product) => {
  //img, title, company, price, color, description

  const {
    image,
    name: title,
    company,
    colors,
    description,
    price,
  } = product.fields;
  const { url: img } = image[0];
  const editedPrice = price / 100;
  const colorList = colors
    .map((color) => {
      return `<span class="product-color" style="background: ${color}"></span>`;
    })
    .join("");
  console.log(colorList);
  productDOM.innerHTML = `<div class="product-wrapper">
    <img src="${img}" class="img" alt="${title}" />
    <div class="product-info">
      <h3>${title}</h3>
      <h5>${company}</h5>
      <span>$${editedPrice}</span>
      <div class="colors">
        ${colorList}
      </div>
      <p>
        ${description}
      </p>
      <button class="btn">add to cart</button>
    </div>
  </div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
