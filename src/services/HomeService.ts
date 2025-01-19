import axios from 'axios';

const API_BASE_URL = 'https://core-561394753846.asia-south2.run.app/api/v1/oh/homes/';

export async function fetchHomesData() {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    //const data = response.data;
    //console.log("data", data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching homes data:', error);
    return [];
  }
}
