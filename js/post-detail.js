import dayjs from "dayjs";
import postApi from "./api/postApi";
import { registerLightbox, setTextContent } from "./utils";


function renderPostDetail(post) {
    if (!post) return;

    //render title
    setTextContent(document, '#postDetailTitle', post.data.title);
    
    //render description
    setTextContent(document, '#postDetailDescription', post.data.description);

    //render author
    setTextContent(document, '#postDetailAuthor', post.data.author);

    //render updateAt
    setTextContent(document, '#postDetailTimeSpan', dayjs(post.data.updateAt).format(' - DD/MM/YYYY HH:mm'));

    //render hero image
    const heroImage = document.getElementById('postHeroImage');
    if (heroImage) {
        heroImage.style.backgroundImage = `url("${post.data.imageUrl}")`;
    }

    heroImage.addEventListener('error', () => {
        heroImage.src = 'https://picsum.photos/id/26/4209/2769';
    });

    //render edit page link
    const editPageLink = document.getElementById('goToEditPageLink');
    if (!editPageLink) return;

    editPageLink.href = `/add-edit-post.html?id=${post.data.id}`;
    editPageLink.innerHTML = '<i class="fas fa-edit"></i> Edit Post';
}

(async () => {
    registerLightbox({
        modalId: 'lightBox',
        imgSelector: 'img[data-id="lightBoxImg"]',
        prevSelector: 'button[data-id="lightBoxPrev"]',
        nextSelector: 'button[data-id="lightBoxNext"]',
    });
    //get post id from URL
    //fetch post detail API
    //render post detail
    try {
        const searchParams = new URLSearchParams(window.location.search);
        const postId = searchParams.get('id');
        if (!postId) {
            console.log('post not found');
            return;
        }

        const post = await postApi.getById(postId);
        renderPostDetail(post);


    } catch (error) {
        console.log('failed to get post', error);
    }

})();