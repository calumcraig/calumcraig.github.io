document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
        slug: form.slug.value,
        name: form.name.value,
        email: form.email.value,
        comment: form.comment.value,
    };

    const status = document.getElementById('comment-status');
    status.textContent = "Submitting…";

    const response = await fetch('https://api.github.com/repos/calumcraig/calumcraig.github.io/issues', {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.github+json',
        },
        body: JSON.stringify({
            title: `comment:${data.slug}`,
            body: JSON.stringify(data)
        })
    });

    if (response.ok) {
        status.textContent = "Submitted. Your comment will appear once approved.";
        form.reset();
    } else {
        status.textContent = "Error submitting comment.";
    }
});
