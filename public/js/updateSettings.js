import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updatePassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const response = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (response.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} changed successfully!`);
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    return result;
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
