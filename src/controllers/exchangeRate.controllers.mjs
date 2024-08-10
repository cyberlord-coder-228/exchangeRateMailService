const API_LINK = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
const CURRENCY_CODE = 'USD';

async function getRate() {
  try {
    const currentRate = await fetch(API_LINK)
      .then(async (resp) => await resp.json())
      .then((arr) => arr.filter(el => el.cc === CURRENCY_CODE))
      .then((arr) => arr[0]['rate']);
    return currentRate;
  } catch(e) {
    console.error(e);
  }
}

async function sendRate(req, res) {
  try {
    const currentRate = await getRate();
    res.status(200).send(`${CURRENCY_CODE} is ${currentRate} UAH`);
  } catch(e) {
    console.error(e);
    res.status(409).send('Oops, something went wrong');
  }
}

export { getRate, sendRate };
