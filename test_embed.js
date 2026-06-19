const https = require('https');

function checkEmbed(videoId) {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/embed/${videoId}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (data.includes('playabilityStatus":{"status":"ERROR"')) {
          resolve({ id: videoId, embeddable: false });
        } else if (data.includes('UNPLAYABLE')) {
          resolve({ id: videoId, embeddable: false });
        } else {
          resolve({ id: videoId, embeddable: true });
        }
      });
    }).on('error', () => resolve({ id: videoId, embeddable: false }));
  });
}

async function test() {
  const ids = [
    'S9uPNppGsGo', // Guanabara Python
    '8mei6uVttho', // Guanabara Algoritmos
    'kM1K9LpX_84', // Rocketseat
    'vEwqndwKpdc', // Filipe Deschamps
    'ZtMzB5CoekE', // HTML5 e CSS3
    'Vw9ZqXECBvw', // Diolinux
    '15p7k2dGz-I', // Boson Treinamentos
    '0mYq5LrCQcg', // Mario Souto (DevSoutinho)
    'n5B8iUqO_rY', // Fabio Akita
    'n7bL2tP3XfQ', // Codigo Fonte TV
    'm-rM5aI2k1o', // Lucas Montano
    'fQfEqv0V9OQ', // Rafaella Ballerini
    'P5P9h9b69E4', // Rocketseat
  ];
  
  for (const id of ids) {
    const res = await checkEmbed(id);
    console.log(`${res.id} - Embeddable: ${res.embeddable}`);
  }
}

test();
