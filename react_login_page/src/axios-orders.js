import axios from 'axios';

const instance = axios.create({
  baseURL: "https://react-my-burger-fcd53.firebaseio.com/"
})

export default instance