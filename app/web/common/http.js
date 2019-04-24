import axios from 'axios'

const service = axios.create({
  baseURL: "/api",
  timeout: 15000
});

service.interceptors.response.use(
  response => {
    let data = response.data;
    switch (data.code) {
      case 200:
        return data.data;
      default:
        alert(data.message);
        break;
    }
    return Promise.reject('error')
  },
  error => {
    return Promise.reject('error');
  }
);
export class Http {

  static get(url, param) {
    return service({
      url: url,
      data: param,
      method: "get"
    });
  }

  static post(url, param) {
    return service({
      url: url,
      data: param,
      method: "post"
    });
  }
}
