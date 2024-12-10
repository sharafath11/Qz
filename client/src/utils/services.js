import axios from 'axios';
export const BaseUrl="http://localhost:4000";
export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return { error: true, message };
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return { error: true, message };
  }
};
