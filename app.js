const apikey = '85c36847b0824547b09be916bb261e75';
const main = document.querySelector('main');


window.addEventListener('load', e => {
    updateNews();

});

async function updateNews() {

    const res = await fetch(`https://newsapi.org/v1/articles?source=techcrunch&apikey=${apikey}`);
    const json = await res.json();


    main.innerHTML = json.articles.map(createArticle).join("\n");

}


function createArticle(article) {
    return `
        <div class="article">
        <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}">
        <p>${article.description}</p>
         </a>
         </div>
	`;
}