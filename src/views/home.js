// import { html } from '../../node_modules/lit-html/lit-html.js';
import { html } from 'https://unpkg.com/lit-html?module';


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
            <img src="${item.get('img')}" />
            <p>${item.get('title')}</p>
            <footer>
                <p>Released: <span>${item.get('year')} year</span></p>
            </footer>
            <div>
                <a href=${`/details/${item.id}`} class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`;

export async function homePage(ctx) {

    Parse.initialize("O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6", "PbgdreDcCM9RtMvcUnlZIHBNdcqUDCHTDqmMCbAX"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";
    const records = new Parse.Query('Records')
    // records.select('img', 'title', 'year')
    let limit = 4
    records.descending('createdAt')
    records.limit(limit)
    limit += 2
    const allRecords = await records.find()
   
    ctx.render(dashboardTemplate(allRecords))
    
        async function yHandler() {
            let container = document.querySelector('.container')
            let contentHeight = container.offsetHeight;
            let yOffset = window.pageYOffset;
            let y = yOffset + window.innerHeight;
            
            if (y >= contentHeight) {
                records.limit(limit)
                const allRecords = await records.find()
                ctx.render(dashboardTemplate(allRecords))
                limit++
            }
            return
        }
        
        window.onscroll = yHandler;
}