// 01.Blog

document.addEventListener('DOMContentLoaded', function () {
  const articlesPerLoad = 4;
  let currentLoadedArticles = 0;
  let allArticlesData = [];

  function fetchArticles() {
    fetch('https://dashboard.taufiqproject.my.id/blogs')
      .then((response) => response.json())
      .then((data) => {
        allArticlesData = data;
        displayArticles(currentLoadedArticles, articlesPerLoad);
        setupCategoryFilter();
      })
      .catch((error) => console.error('Error fetching articles:', error));
  }

  function truncateText(text, limit) {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  }

  function displayArticles(startIndex, count) {
    const blogContainer = document.getElementById('blog-container');
    const loadMoreContainer = document.querySelector('.load-more-container');

    const endIndex = Math.min(startIndex + count, allArticlesData.length);

    for (let i = startIndex; i < endIndex; i++) {
      const article = allArticlesData[i];
      const truncatedContent = truncateText(article.content, 25);
      const truncatedTitle = truncateText(article.title, 5);
      const firstCategory = article.category[0];

      const articleHTML = `
    <div class="blog-post-box">
        <div class="blog-post-img">
            <a href="blog-single.html?id=${article.slug}">
            <img src="https://gudrtdnruivalvgpfens.supabase.co/storage/v1/object/public/taufiqproject/blog/${article.image}" style=" width: 320px height: 100%" alt="${article.title}" loading="lazy" />
            </a>
            <div class="blog-post-category">
                <a href="#">${firstCategory}</a> <!-- Gunakan kategori pertama -->
            </div>
        </div>
        <div class="blog-post-caption">
            <p class="mb-2">Posted on ${new Date(article.date).toDateString()}</p>
            <h2><a class="link-decoration" href="blog-single.html?id=${article.slug}">${truncatedTitle}</a></h2> <!-- Gunakan judul yang telah dipotong -->
            <a class="button button-sm button-outline-dark mt-2" href="blog-single.html?id=${article.slug}">Read more</a>
        </div>
    </div>
  `;

      blogContainer.insertAdjacentHTML('beforeend', articleHTML);
    }

    if (endIndex < allArticlesData.length) {
      const remainingArticles = allArticlesData.length - endIndex;
      const loadMoreHTML = `
    <p class="load-more-info">+${remainingArticles} more articles available</p>
  `;
      loadMoreContainer.innerHTML = loadMoreHTML;
      document.getElementById('load-more-btn').style.display = 'block';
    } else {
      loadMoreContainer.innerHTML = '';
      document.getElementById('load-more-btn').style.display = 'none';
    }
  }

  function loadMoreArticles() {
    currentLoadedArticles += articlesPerLoad;
    displayArticles(currentLoadedArticles, articlesPerLoad);
  }
  fetchArticles();
  document.getElementById('load-more-btn').addEventListener('click', loadMoreArticles);
});

//   02.Blog-Single
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function displayArticleDetails(articleSlug) {
  fetch('https://dashboard.taufiqproject.my.id/blogs')
    .then((response) => response.json())
    .then((data) => {
      const article = data.find((article) => article.slug === articleSlug);
      if (article) {
        const articleDetails = `
          <div class="section-box">
              <div class="row g-4">
                <div class="col-12 col-xl-4">
                  <h6 class="mono-heading mb-0">Posted by:</h6>
                  <p>${article.author}</p>
                </div>
                <div class="col-12 col-xl-4">
                  <h6 class="mono-heading mb-0">Category:</h6>
                  <p>${article.category}</p>
                </div>
                <div class="col-12 col-xl-4">
                  <h6 class="mono-heading mb-0">Posted on:</h6>
                  <p>${new Date(article.date).toDateString()}</p>
                </div>
              </div>
              <!-- end row -->

              <div class="mt-4">
                <h1>${article.title}</h1>
              </div>

              <div class="row g-4 mt-2">
                <div class="col-12">
                  <img class="border-radius" src="https://gudrtdnruivalvgpfens.supabase.co/storage/v1/object/public/taufiqproject/blog/${article.image}" alt="${article.title}" loading="lazy" />
                </div>
                <div class="col-12">
                  <h4 class="fw-medium">Article Content</h4>
                  <p>
                    ${article.content}
                  </p>
                </div>
              </div>
              <!-- end row -->

              <!-- Tags -->
              <ul class="list-inline-pills mt-5">
                ${article.category.map((category) => `<li><a href="#">#${category}</a></li>`).join(' ')}
              </ul>
            </div>
        `;
        const blogDetailsContainer = document.querySelector('.blog-details-container');
        blogDetailsContainer.insertAdjacentHTML('beforeend', articleDetails);
      } else {
        const errorDetails = '<p>Article not found.</p>';
        const blogDetailsContainer = document.querySelector('.blog-details-container');
        blogDetailsContainer.insertAdjacentHTML('beforeend', errorDetails);
      }
    })
    .catch((error) => console.error('Error fetching articles:', error));
}

const articleSlug = getURLParameter('id');
if (articleSlug) {
  displayArticleDetails(articleSlug);
}
