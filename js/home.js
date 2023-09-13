//default import
import postApi from "./api/postApi";
import { initPagination, initSearch, renderPostList, renderPagination } from "./utils";
//named import
// import { getAllCities, getCityById } from "./api/cityApi";

async function handleFilterChange(filterName, filterValue) {

    try {
        //update query params
        const url = new URL(window.location);
        url.searchParams.set(filterName, filterValue);

        //reset page if needed
        if (filterName === 'title_like') url.searchParams.set('_page', 1)

        history.pushState({}, '', url);

        //fetch API
        //re-render post list
        const { data } = await postApi.getAll(url.searchParams);
        renderPostList(data);
        renderPagination('pagination', data);
    } catch (error) {
        console.log('Failed to fetch post list', error);
    }

}

//main
(async () => {
    // const response = await axiosClient.get('posts');
    try {
        const url = new URL(window.location);

        //update search params if needed
        if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
        if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

        history.pushState({}, '', url);
        const queryParams = url.searchParams;

        //attach click event for links
        initPagination({
            elementId: 'pagination',
            defaultParams: queryParams,
            onChange: (page) => handleFilterChange('_page', page),
        });
        initSearch({
            elementId: 'searchInput',
            defaultParams: queryParams,
            onChange: (value) => handleFilterChange('title_like', value),
        });

        //render post list based URL params
        //const queryParams = new URLSearchParams(window.location.search);
        //set default query params is not existed
        const { data } = await postApi.getAll(queryParams);
        renderPostList('postList', data);
        renderPagination('pagination', data);


    } catch (error) {
        console.log('get all error: ', error);
    }
})();