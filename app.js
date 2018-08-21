const apikey = '85c36847b0824547b09be916bb261e75';
const main = document.querySelector('#main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSrouce = 'the-washington-post';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSrouce;

    sourceSelector.addEventListener('change',e => {
        updateNews(e.target.value);      

    });

    if("serviceWorker" in navigator) {
       try {

       	navigator.serviceWorker.register('sw.js');
         console.log('Sw registered');     
       } catch(e) {

         console.log('Sw unregistered');     

       }
    }

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
         <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 deal deal-block">
                <div class="item-slide">
                    <div class="box-img">
                        <img src="${article.urlToImage}" alt="${article.title}" />
                        <div class="text-wrap">
                            <h4><span class="deal-data"><span class="glyphicon glyphicon-calendar"></span> ${article.publishedAt}</span></h4>
         
                            <div class="view-now-c">
                                <a href="${article.url}">View Now</a>
                            </div>
                        </div>
                    </div>
                    <div class="slide-hover">
                        <div class="text-wrap">
                            <p>${article.description}</p>
                            <h4><span class="deal-data"><span class="glyphicon glyphicon-calendar"></span> ${article.publishedAt}</span></h4>
                            
                            <div class="view-now-c">
                                <a href="${article.url}">View Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	`;
}