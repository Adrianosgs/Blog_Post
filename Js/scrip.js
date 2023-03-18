
async function lerPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...';

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if (json.length > 0) {
        postArea.innerHTML = '';

        for (let i in json) {
            let htmlPost = `<div><h1>${json[i].title}</h1><p>${json[i].body}</p><hr/></div>`;
            postArea.innerHTML += htmlPost;
        }

    } else {
        postArea.innerHTML = 'Nenhum post no momento';
    }
}

async function addNewPost(title, text) {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'constent-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                text,
                userId: 2
            })
        }

    );
    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';

    lerPosts();
}

let inserirBt = document.querySelector('#inserirBt');
inserirBt.addEventListener('click', newPost);

function newPost() {
    let title = document.querySelector('#titleField').value;
    let text = document.querySelector('#bodyField').value;

    if (title && text) {
        addNewPost(title, text);
    } else {
        alert('Preencha os campos');
    }
}


lerPosts();