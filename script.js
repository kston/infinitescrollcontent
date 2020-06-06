const postContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');
const cancel = document.getElementById('cancel');

let limit = 4;
let page = 1;

async function FetchPosts() {
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await resp.json();

  return data;
}

async function showPostDOM() {
  const posts = await FetchPosts();

  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>

    `;
    postContainer.appendChild(postEl);
  });
}

function showLoad() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPostDOM();
    }, 200);
  }, 1000);
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

showPostDOM();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoad();
  }
});

filter.addEventListener('input', filterPosts);
cancel.addEventListener('click', () => {
  location.reload();
});
