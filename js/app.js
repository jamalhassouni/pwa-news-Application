const apikey = '85c36847b0824547b09be916bb261e75';
const main = document.querySelector('#main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSrouce = 'bbc-news';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSrouce;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);

    });

    if ("serviceWorker" in navigator) {
        try {

            navigator.serviceWorker.register('sw.js');
            console.log('Sw registered');
        } catch (e) {

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
     <div class="col-sm-4">
                    <div class="tr-section">
                        <div class="tr-post">
                            <div class="entry-header">
                                <div class="entry-thumbnail">
                                    <a href="#"><img class="img-fluid" src="${article.urlToImage}" alt="${article.title}"></a>
                                </div>
                                <!-- /entry-thumbnail -->
                            </div>
                            <!-- /entry-header -->
                            <div class="post-content">
                                <div class="author-post">
                                    <a href="#"><img class="img-fluid rounded-circle" src="images/user.png" alt="${article.author}"></a>
                                </div>
                                <!-- /author -->
                                <div class="entry-meta">
                                    <ul>
                                        <li><a href="#">${article.author}</a></li>
                                        <li>${article.publishedAt}</li>
                                    </ul>
                                </div>
                                <!-- /.entry-meta -->
                                <h2><a href="#" class="entry-title">${article.title}</a></h2>
                                <p>${article.description}</p>
                                <div class="read-more">
                                    <!-- /feed -->
                                    <div class="continue-reading pull-right">
                                        <a href="${article.url}">Continue Reading <i class="fa fa-angle-right"></i></a>
                                    </div>
                                    <!-- /continue-reading -->
                                </div>
                                <!-- /read-more -->
                            </div>
                            <!-- /.post-content -->
                        </div>
                        <!-- /.tr-post -->
                    </div>
                    <!-- /.tr-post -->
                </div>
                <!-- /col-sm-4 -->

    `;
}

$(document).ready(function() {
    /*============================================
    Scroll To Top
    ==============================================*/

    //When distance from top = 250px fade button in/out
    $(window).scroll(function() {
        if ($(this).scrollTop() > 250) {
            $('#scrollup').fadeIn(300);
        } else {
            $('#scrollup').fadeOut(300);
        }
    });

    //On click scroll to top of page t = 1000ms
    $('#scrollup').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });

});