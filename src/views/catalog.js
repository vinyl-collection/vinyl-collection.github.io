import {html} from 'https://unpkg.com/lit-html?module';


const catalogTemplate = (albums, count) => html`
<section id="catalog-page" class="content catalogue">
    
    ${albums.length == 0 ? html`
    <h3 class="no-articles">No albums yet</h3>` 
: albums.map(albumTemplate)}
<h1>${albums.length} out of ${count} Albums</h1>
</section>`;

export const albumTemplate = (album) => html`
<a class="article-preview" href="/details/${album.id}">
<article>
    <h3>Artist: <span>${album.get('artist')}</span></h3>
    <p>Title: <span>${album.get('title')}</span></p>
</article>
</a>`;

export async function catalogPage(ctx){
    Parse.initialize("O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6", "PbgdreDcCM9RtMvcUnlZIHBNdcqUDCHTDqmMCbAX"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";
    const records = new Parse.Query('Records')
     records.select('title', 'artist', 'objectId')
     let count = await records.count()
     let limit = 10
     records.descending('createdAt')
     records.limit(limit)
     const allRecords = await records.find()
     
     ctx.render(catalogTemplate(allRecords, count))
     limit += 2
   // window.onscroll = yHandler;
    
  async  function yHandler(){
        let container = document.querySelector('.container')
        let contentHeight = container.offsetHeight;
        let yOffset = window.pageYOffset;
        let y = yOffset + window.innerHeight;
        if(y >= contentHeight){
            records.limit(limit)
            const allRecords = await records.find()
            ctx.render(catalogTemplate(allRecords, count))
            limit++
        }
    }

}