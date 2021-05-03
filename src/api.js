const baseURL = `https://api.openweathermap.org/data/2.5/forecast`;
const API_KEY = '123456789000000000hdhdhd';

export const makeGetRequest = (params) => {
  const queryString = new URLSearchParams({
		...params,
		appid: API_KEY,
  });
  
  const url = `${baseURL}?${queryString}`;

  return fetch(url);
};