const amazonClientId = import.meta.env.VITE_AMAZON_CLIENT_ID;
const amazonSecret = import.meta.env.VITE_AMAZON_SECRET;
const sellerId = import.meta.env.VITE_SELLER_ID;
const marketplaceId = import.meta.env.VITE_MARKETPLACE_ID;
const sellerEndpoint = import.meta.env.VITE_SELLER_ENDPOINT;
const awsRegion = import.meta.env.VITE_AWS_REGION;
const refreshToken = import.meta.env.VITE_REFRESH_TOKEN;


async function getAccessToken(refreshToken, clientId, clientSecret) {
  const encodedParams = new URLSearchParams();
  encodedParams.append('grant_type', 'refresh_token');
  encodedParams.append('refresh_token', refreshToken);
  // encodedParams.append('refresh_token', encodeURIComponent(refreshToken));
  encodedParams.append('client_id', clientId);
  encodedParams.append('client_secret', clientSecret);
  try{
    const response = await fetch('https://api.amazon.com/auth/o2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodedParams,
    });
  
    const data = await response.json();
    return data?.access_token;
  } catch(error){
    console.log("Fetch Access Token failed")
    throw error
  }
}

async function getProductDetails(sku, accessToken) {
  // Implement the call to the SP-API endpoint to get the product details.
  try{
    const marketplaceIds = [marketplaceId]
    const response = await fetch('http://localhost:3000/get-amazon-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sku,
        marketplaceIds,
        accessToken,
        sellerId
      }),
    });
  
    const data = await response.json();
    console.log(response)
    return data;
  } catch(error){
    console.error("error", error)
    throw error
  }
}

export async function fetchProductDetails(sku) {
  try {
    const accessToken = await getAccessToken(refreshToken, amazonClientId, amazonSecret);
    const productDetails = await getProductDetails(sku, accessToken);
    return productDetails;
  } catch (error) {
    throw error;
  }
}