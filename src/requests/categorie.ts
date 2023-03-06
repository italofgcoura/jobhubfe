import api from '../client';

const listCategories = async () => {
  const categories = await api.get('/categories');

  return categories.data;
};

export { listCategories };
