const postsWrapper = document.getElementById("posts");
const template = document.getElementById("post-template");
const loadBtn = document.getElementById("load-posts");
const form = document.getElementById('form');

async function httpRequest(method, url, data) {
//   return new Promise((resolve, reject) => {
    // const xhr = new XMLHttpRequest();

    // xhr.open(method, url);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.responseType = "json";

    // xhr.addEventListener("load", () => {
        // if (xhr.status >= 200 & xhr.status < 300) {
        //     resolve(xhr.response);
        // } else {
        //     reject(new Error('something went wrong'))
        // }
    // });

    // xhr.addEventListener('error', () => {
    //     reject(new Error('failed to send request'))
    // })

    // xhr.send(JSON.stringify(data));

//   });
    // const response = await fetch(url, {
    //     method: method,
    //     body: JSON.stringify(data)
    // });

    // return response.json();
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        if (response.status >= 200 & response.status < 300) {
            return response.json()
        } else {
            return response.json().then((data) => {
                console.log(data);
                throw new Error('something went wrong');
            })
        }
    }).catch((error) => {
        throw new Error('Something went wrong!');
    })
}

async function loadPosts() {
    try {
        const posts = await httpRequest(
            "GET",
            "https://jsonplaceholder.typicode.com/posts"
        );

        posts.forEach((post) => {
            const postElm = document.importNode(template.content, true);
            postElm.querySelector("h2").textContent = post.title;
            postElm.querySelector("p").textContent = post.body;
            postElm.querySelector('article').id = post.id;
            postsWrapper.append(postElm);
        });
    }catch(error) {
        console.log(error);
    }
}

async function storePost(title, body) {
  const post = {
    title: title,
    body: body,
    userId: Math.random().toFixed(3) * 1000000,
  };

  return await httpRequest(
    "POST",
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
}

loadBtn.addEventListener("click", loadPosts);


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value
    const body = document.getElementById('body').value;

    if (!title.trim() || !body.trim()) {
        alert('please fill all  required inputs')
        return;
    }

    storePost(title, body)
})

posts.addEventListener('click', (event) => {
    if(event.target.classList.contains('delete-post')) {
        const postId = event.target.closest('article').id;
        httpRequest('DELETE' , `https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
})