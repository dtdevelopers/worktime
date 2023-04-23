import {create} from 'apisauce';
import {useAuthStore} from '../store';

const url = import.meta.env.VITE_API_URL || '';

const api = create({
  baseURL: import.meta.env.MODE === 'development' ? `${url}/api` : 'prod api',
  timeout: 30000,
});

api.addRequestTransform((request) => {
  const token = useAuthStore.getState().token;
  if (token && request && request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

export default api;
