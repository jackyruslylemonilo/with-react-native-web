const fetch = require('node-fetch');

(async () => {
  while(true) {
    console.log('Fetching');
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    await fetch('https://staging-web-rnd.lemonilo.com/');
    console.log('Fetching Done');
  }
})();

