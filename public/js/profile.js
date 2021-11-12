const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#comment-title').value.trim();
    const topic = document.querySelector('#comment-topic').value.trim();
    const context = document.querySelector('#comment-context').value.trim();

    if (title && topic && context) {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({ title, topic, context }),
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
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete comment');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);

// document
//     .querySelector('.comment-list')
//     .addEventListener('click', delButtonHandler);
