document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const author = document.getElementById('author');
})

// this gets the data
function getPostList() {
    fetch('/api/posts/')
    .then(res => res.json())
    .then(data =>{
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

// this displays the data
function renderPost(post) {
    const root = document.getElementById('root')
    const div = createNode('div');
    div.className = 'post-item';
    const title = createNode('h2');
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

    append(div, title);
    append(div, content);
    append(div, publishDate);
    append(div, lastUpdated);
    append(root, div);
}


getPostList()