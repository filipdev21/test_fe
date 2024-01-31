import axios from 'axios';
import config from '@config';

axios.defaults.baseURL = config.api;
axios.defaults.headers.common.authorization = `Bearer ${window.localStorage.getItem(
  'product_token'
)}`;
