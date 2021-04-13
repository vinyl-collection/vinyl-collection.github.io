// import { html } from '../../node_modules/lit-html/lit-html.js';
import { html, render } from 'https://unpkg.com/lit-html?module';
import { albumTemplate } from './catalog.js'

const registerTemplate = (onSubmit, records, errorMsg) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Searching...</h1>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            ${errorMsg ? html`<div class="form-group">
                <h2>${errorMsg}</h2>
            </div>` : ''}
            <div class="form-group">
                <label class="form-control-label">Search</label>
                <input class="${'form-control'}" id="email" type="text" name="input">
            </div>
            <div class="form-group">
                <label class="form-control-label">Search by</label>
                <select class="form-control" name="searchBy">
                    <option value="title">Title</option>
                    <option value="artist">Artist</option>
                    <option value="year">Year</option>
                </select>

            </div>

            <input type="submit" class="btn btn-primary" value="Search" />
        </div>
    </div>
    ${records ? records.map(albumTemplate) : 'No matches yet!'}
    `;



export async function searchPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)
        const input = formData.get('input')
        const searchBy = formData.get('searchBy')


        Parse.initialize("O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6", "PbgdreDcCM9RtMvcUnlZIHBNdcqUDCHTDqmMCbAX", "6MNeX81vbvRzRVZqMH4B0Jr11FmdiW6mEZWIG3BI"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
        Parse.serverURL = "https://parseapi.back4app.com/";
        const records = new Parse.Query('Records')
        records.equalTo(searchBy, input)

        const filtratedRecords = await records.find();

        ctx.render(registerTemplate(onSubmit, filtratedRecords));

    }
}