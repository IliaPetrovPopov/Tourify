import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const data = {
      email,
      password,
    };

    const response = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data,
    });

    if (response.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    return result;
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if (response.data.status === 'success') {
      location.assign('/');
    }
  } catch (error) {
    showAlert('error', 'Error logging out! Try again...');
  }
};
