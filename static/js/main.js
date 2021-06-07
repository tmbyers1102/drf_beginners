const root = document.getElementById('root');

document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const author = document.getElementById('author');
    createPost(title.value, content.value, author.value);
    title.value = '';
    content.value = '';
    author.value = '';
})

function createPost(title, content, author) {
    const data = {
        method: "POST",
        headers: {
            'content-type': "application/json"
        },
        body: JSON.stringify({
            title, content, author
        })
    }
    fetch('/api/posts/create/', data)
    .then(() => {
        getPostList();
    })
    .catch(err => {
        console.error(err);
    })
}



// this gets the data
function getPostList() {
    fetch('/api/posts/')
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        clearChildren(root);
        renderPosts(data);
    })
    .catch(err => {
        console.error(err);
    })
}

// this sort of ties getPostList with renderPost
function renderPosts(data) {
    return data.map(post => {
        renderPost(post);
    })
}

// this allows us to switch document.createElement to createNode in renderPost
function createNode(element) {
    return document.createElement(element);
}

// this allows us to switch div.appendChild(title) to append(div, title)
function append(parent, el) {
    return parent.appendChild(el);
}

function clearChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}


// this displays the data
function renderPost(post) {
    const div = createNode('div');
    div.className = 'post-item';
    const link = createNode('a');
    link.href = `/posts/${post.id}/`;
    const title = createNode('h2');
    append(link, title);

    const content = createNode('p');
    const publishDate = createNode('span');
    const lastUpdated = createNode('span');
    const author = createNode('small');
    
    author.innerText = `    |  written by ${post.author}`;
    title.innerText = post.title;
    append(title, author);

    content.innerText = post.content;
    publishDate.innerText = `Published: ${new Date(post.publish_date).toUTCString()}`;
    lastUpdated.innerText = `Last Updated: ${new Date(post.update).toUTCString()}`;

    append(div, link);
    append(div, content);
    append(div, publishDate);
    append(div, lastUpdated);
    append(root, div);
}


getPostList()