/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
// const options = {
//   url: 'http://localhost:8000', // адрес
//   headers: { // произвольные заголовки, могут отсутствовать
//     'Content-type': 'application/json'
//   },
//   data: { // произвольные данные, могут отсутствовать
//     email: 'ivan@poselok.ru',
//     password: 'odinodin'
//   },
//   responseType: 'json', // формат, в котором необходимо выдать результат
//   method: 'GET', // метод запроса
//   /*
//     Функция, которая сработает после запроса.
//     Если в процессе запроса произойдёт ошибка, её объект
//     должен быть в параметре err.
//     Если в запросе есть данные, они должны быть переданы в response.
//   */
//   callback: (err, response) => {
//     console.log('Ошибка, если есть', err);
//     console.log('Данные, если нет ошибки', response);
//   }
// }

const createRequest = (options = {}) => {
  const request = new XMLHttpRequest();
  request.withCredentials = true;
  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
      options.callback(request.response.error, request.response);
    }
  });

  const setResponseType = () => {
    if (options.responseType) {
      request.responseType = options.responseType;
    }
  }
  const setRequestHeaders = () => {
    if (options.headers) {
      for (const header of Object.keys(options.headers)) {
        request.setRequestHeader(header, options.headers[header]);
      }
    }
  }

  // const error = null;

  if (options.method === 'GET') {
    let paramsString = options.url;
    if (options.data !== undefined && Object.keys(options.data).length > 0) {
      paramsString += '?';
      const dataKeys = Object.keys(options.data);
      for (let i = 0; i < dataKeys.length; i++) {
        if (i > 0) {
          paramsString += '&';
        }
        paramsString += `${dataKeys[i]}=${options.data[dataKeys[i]]}`;
      }
    }
    request.open(options.method, paramsString, true);
    setResponseType();
    setRequestHeaders();
    request.send();
  } else if (options.method) {
    request.open(options.method, options.url, true);
    setResponseType();
    setRequestHeaders();
    const formData = new FormData();
    if (options.data) {
      for (const key of Object.keys(options.data)) {
        formData.append(key, options.data[key]);
      }
    }
    request.send(formData);
  }

  return request;
};
