export function fetchProductItemPage(productLink) {
  const apiUrl = `/api/v1/products/${productLink}`.toLowerCase();
  return fetch(apiUrl, {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchProducts() {
  return fetch('api/v1/products', {
    method: 'GET'
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    })
    .then(data => {

      return data;
    });
}

export function fetchExclusiveProducts() {
  return fetch('api/v1/products?exclusive=true', {
    method: 'GET'
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ username }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {

      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchCart() {
  return fetch('/api/v1/cart', {
    method: 'GET'
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function addToCart(product, selectedSize, quantity) {
  return fetch('/api/v1/cart', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      productId: product.id,
      quantity,
      selectedSize,
      imageUrl: product.imageUrl,
      brandName: product.brandName,
      productName: product.productName,
      sku: product.sku,
      price: product.price
    }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(() => Promise.reject({ error: 'not-logged-in-cart' }))
        .then(err => Promise.reject(err));
    });
}

export function fetchRemoveCartItem(itemId) {
  return fetch(`/api/v1/cart/${itemId}`, {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}


export function fetchSaveShippingAddress(username, shippingAddress) {
  return fetch('/api/v1/address', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username, ...shippingAddress }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {

      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchCheckout(cardDetails) {
  return fetch('/api/v1/checkout', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(cardDetails),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchAccount() {
  return fetch('/api/v1/account', { method: 'GET' })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

