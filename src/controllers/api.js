import Axios from 'axios';

export default Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
