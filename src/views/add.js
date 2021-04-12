import { html } from '../../node_modules/lit-html/lit-html.js';
import { addItem } from '../api/data.js'

const createTemplate = (onSubmit) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Artist</label>
                <input class="form-control valid" id="new-make" type="text" name="artist">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Title</label>
                <input class="form-control is-valid" id="new-model" type="text" name="title">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year">
            </div>

        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-description">Songs List</label>
                <input class="form-control" id="new-description" type="text" name="songs">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
    </div>
</form>`;

export async function addPage(ctx) {
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target)

        const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

        if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == '')) {
            return alert('Missing fields!')
        }


        const vinyl = {
            artist: data.artist,
            year: data.year,
            title: data.title,
            img: data.img,
            ownerId: sessionStorage.getItem('userId')
        }

        const response = await fetch('https://parseapi.back4app.com/classes/Records', {
            method: 'post',
            headers: {
                'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',
                'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vinyl)
        })

        ctx.page.redirect('/')
    }
}