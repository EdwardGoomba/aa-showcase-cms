const fetch = require('node-fetch');

const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer api_key-euporie-b624d74c31c2ab3025bb1126de0206f8f281944d',
    },
  })

  return response.json();
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    res.send(await getData('https://mediacenter.academyart.edu/api/v2/folders/list/'))
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: error.message })
  }
}
