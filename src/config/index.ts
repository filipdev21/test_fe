export default {
  api:
    `${import.meta.env.VITE_API_SERVER}/api/v1` ||
    'http://localhost:8080/api/v1',
  server: import.meta.env.VITE_API_SERVER || 'http://localhost:8080'
};
