import axios from 'axios';
import { EventCategory } from '@/utils/interfaces/Categories';

export const fetchCategories = async (
  category?: EventCategory,
): Promise<EventCategory[]> => {
  try {
    const params = category
      ? {
          keyWord: category.keyWord,
          phrase: category.phrase,
          color: category.color,
        }
      : {};

    const response = await axios.get<EventCategory[]>('/api/categories/', {
      params,
    });

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Invalid response format');
      return [];
    }
  } catch (error: any) {
    console.error('Error fetching categories:', error.message || error);
    return [];
  }
};
