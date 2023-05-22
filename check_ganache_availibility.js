const http = require('http');

function checkGanacheReady() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'ganache',
      port: 8545,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const payload = JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_accounts'
    });

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if(res.statusCode === 200) {
          resolve(data);
        } else {
          reject('Ganache server is not ready yet.');
        }
      });
    });

    req.on('error', (error) => {
      reject('Ganache server is not ready yet.');
    });

    req.write(payload);
    req.end();
  });
}

checkGanacheReady()
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

module.exports = checkGanacheReady;

