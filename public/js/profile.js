const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#comment-title').value.trim();
    const topic = document.querySelector('#comment-context').value.trim();

    if (title && topic) {
        const response = await fetch(`/api/post`, {
            method: 'POST',
            body: JSON.stringify({ title, topic }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create comment');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id-del');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete comment');
        }
    }
};

document.querySelector('.new-comment-form');
document.addEventListener('submit', newFormHandler);

document.querySelector('.comment-list');
document.addEventListener('click', delButtonHandler);

