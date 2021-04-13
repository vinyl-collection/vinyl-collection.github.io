import {html} from 'https://unpkg.com/lit-html?module';


const catalogTemplate = (albums) => html`
<section id="catalog-page" class="content catalogue">
<h1>All Albums</h1>

${albums.length == 0 ? html`
<h3 class="no-articles">No albums yet</h3>` 
: albums.map(albumTemplate)}
</section>`;

export const albumTemplate = (album) => html`
<a class="article-preview" href="/details/${album.objectId}">
<article>
    <h3>Artist: <span>${album.artist}</span></h3>
    <p>Title: <span>${album.title}</span></p>
</article>
</a>`;

export async function mainPage(ctx){
    const response = await fetch('https://parseapi.back4app.com/classes/Records', {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',
            'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw'
        }
    })
    const data = await response.json();
    

    ctx.render(catalogTemplate(Object.values(data)[0]))
}