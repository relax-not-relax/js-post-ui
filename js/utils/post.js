//default import
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { setTextContent, truncate } from "./common";

//to use fromNow function
dayjs.extend(relativeTime)

//named import
// import { getAllCities, getCityById } from "./api/cityApi";

export function createPostElement(post) {
    if (!post) return;

    //find and clone template
    const postTemplate = document.getElementById('postTemplate');
    if (!postTemplate) {
        console.log('not found postTemplate');
        return;
    }

    const liElement = postTemplate.content.firstElementChild.cloneNode(true);
    if (!liElement) {
        console.log('not found li');
        return;
    }

    //update title, description, author, thumbnail
    // const titleElement = liElement.querySelector('[data-id="title"]');
    // if (titleElement) titleElement.textContent = post.title;
    setTextContent(liElement, '[data-id="title"]', post.title);
    setTextContent(liElement, '[data-id="description"]', truncate(post.description, 100));
    setTextContent(liElement, '[data-id="author"]', post.author);

    const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
    if (thumbnailElement) {
        thumbnailElement.src = post.imageUrl;

        thumbnailElement.addEventListener('error', () => {
            thumbnailElement.src = 'https://picsum.photos/id/26/4209/2769';
        });

    };

    //calculate timestamp
    // dayjs(post.updatedAt).fromNow()
    setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updatedAt).fromNow()}`);


    //attach event
    //go to post detail when click on div.post-item
    const divElement = liElement.firstElementChild;
    if (!divElement) return;

    divElement.addEventListener('click', () => {
        window.location.assign(`post-detail.html?id=${post.id}`);
    });

    return liElement;

}

export function renderPostList(elementId, postList) {
    if (!Array.isArray(postList.data)) {
        console.log('null');
        return;
    }

    const ulElement = document.getElementById(elementId);
    if (!ulElement) return;

    //clear current list
    ulElement.textContent = '';

    postList.data.forEach((post, idx) => {
        const liElement = createPostElement(post);
        ulElement.appendChild(liElement);
    });
}