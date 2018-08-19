const apikey = '85c36847b0824547b09be916bb261e75';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSrouce = 'the-washington-post';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSrouce;

    sourceSelector.addEventListener('change',e => {
        updateNews(e.target.value);      

    });
});

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json();


    sourceSelector.innerHTML = json.sources
        .map(src => `<option value="${src.id}">${src.name}</option>`)
        .join('\n');
}


async function updateNews(source = defaultSrouce) {

    const res = await fetch(`https://newsapi.org/v1/articles?source=${source}&apikey=${apikey}`);
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