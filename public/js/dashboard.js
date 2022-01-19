const newFormHandler = async (event) => {
    event.preventDefault();

    const post_title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post-content').value.trim();

    if (post_title && post_text) {
        console.log(post_title);
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ post_title, post_text }),
            headers: {
                'Content-Type': 'application/json',
            },

        });
        console.log(response);
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id-del')) {
        const id = event.target.getAttribute('data-id-del');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('.post-list')
    .addEventListener('click', updateButtonHandler);