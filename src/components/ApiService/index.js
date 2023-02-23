import axios from 'axios';


let axiosConfig = {
   headers: {
      'Content-Type': 'application/json;charset=UTF-8',
   }
};


export function getData() {
   const url = 'https://www.mocky.io/v2/5d1ef97d310000552febe99d';
   return axios.get(url, axiosConfig).then(res => res.data).catch((error) => {
      if (error.response) {
         return error.response; // => the response payload 
      }
   });
}