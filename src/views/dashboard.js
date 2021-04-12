import { html } from '../../node_modules/lit-html/lit-html.js';
import { getRecords } from '../api/data.js'



const dashboardTemplate = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to my collection</h1>
        <p>Select record for more details.</p>
    </div>
</div>
<div class="row space-top">
    ${data.map(itemTemplate)}
</div>`

const itemTemplate = (item) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src="${item.img}" />
            <p>${item.title}</p>
            <footer>
                <p>Released: <span>${item.year} year</span></p>
            </footer>
            <div>
                <a href=${`/details/${item.objectId}`} class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`;

export async function mainPage(ctx) {

    const response = await fetch('https://parseapi.back4app.com/classes/Records', {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',
            'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw'
        }
    })
    const data = await response.json();
    

    ctx.render(dashboardTemplate(Object.values(data)[0]))
}