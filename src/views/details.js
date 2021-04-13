import {deleteItem } from '../api/data.js'
// import { html } from '../../node_modules/lit-html/lit-html.js';
import {html} from 'https://unpkg.com/lit-html?module';

const detailTemplate = (item, onDelete, isOwner) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Record Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img class="detailsImg" src="${item.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Artist: <span>${item.artist}</span></p>
        <p>Title: <span>${item.title}</span></p>
        <p>Released on: <span>${item.year}</span></p>
        ${isOwner ? html`
        <div>
            <a href=${`/edit/${item.objectId}`} class="btn btn-info">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
        </div>` : ''}
    </div>
</div>`;

function renderSongs(arr) {
    for (let i = 0; i <= arr.length; i++) {
        return i + 1 + '. ' + arr[i];
    }
}

export async function detailPage(ctx) {
    const id = ctx.params.id
    const item = await fetch('https://parseapi.back4app.com/classes/Records/' + id, {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',
            'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw'
        }
    })
    const userId = sessionStorage.getItem('userId')
    const album = await item.json()
    const isOwner = userId == album.ownerId;

    
    ctx.render(detailTemplate(album, onDelete, isOwner))

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this item?')
        if (confirmed) {
            await deleteItem(album.objectId)
            ctx.page.redirect('/')
        }
    }
}