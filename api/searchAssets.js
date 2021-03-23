const fetch = require('node-fetch');

const postData = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer api_key-euporie-b624d74c31c2ab3025bb1126de0206f8f281944d',
    },
    body: JSON.stringify(body)
  })

  return response.json();
}

module.exports = async (req, res) => {
  // get around cors preflight options request for local dev
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Content-Type': 'application/json'
  };
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers).end();
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (!req.body) {
    console.error(`Error no post body`);
    res.status(400).json({ error: 'Bad request' });
    return;
  }

  const { body } = req
  console.log('Body Data: ', body)
  try {
    res.send(await postData(`https://mediacenter.academyart.edu/api/v2/assets/search`, body))
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: error.message })
  }
}
