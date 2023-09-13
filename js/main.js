//default import
import postApi from "./api/postApi";
//named import
// import { getAllCities, getCityById } from "./api/cityApi";

console.log('Hello from main.js');

async function main() {
    // const response = await axiosClient.get('posts');
    try {
        const queryParams = {
            _page: 1,
            _limit: 5,
        }
        const response = await postApi.getAll(queryParams);
        console.log(response);
    } catch (error) {
        console.log('get all error: ', error);
    }
    
}

main();