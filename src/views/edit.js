// import { html } from '../../node_modules/lit-html/lit-html.js';
import { html } from 'https://unpkg.com/lit-html?module';

const editTemplate = (album, onSubmit) => html`<div class="row space-top">
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
                <input class="form-control valid" id="new-make" type="text" name="artist" .value=${album.artist}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Title</label>
                <input class="form-control is-valid" id="new-model" type="text" name="title" .value=${album.title}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" .value=${album.year}>
            </div>

        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-description">Songs List</label>
                <input class="form-control" id="new-description" type="text" name="songs" .value=${album.songs}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" .value=${album.img}>
            </div>
        </div>
        <input type="submit" class="btn btn-primary" value="Edit" />
    </div>
</form>`;

export async function editPage(ctx) {
    const id = ctx.params.id
    const item = await fetch('https://parseapi.back4app.com/classes/Records/' + id, {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',
            'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw'
        }
    })
    const album = await item.json()

    ctx.render(editTemplate(album, onSubmit))

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target)

        const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

        if (Object.entries(data).filter(([k, v]) => k != 'songs').some(([k, v]) => v == '')) {
            return alert('Missing fields!')
        }

        const songs = data.songs.split(',');
        
        if (!(typeof songs[0].charAt(0) === Number ) && !(songs[0].charAt(1) == '.' || songs[0].charAt(2) == '.')){

            console.log('in');
            for (let i = 0; i < songs.length; i++) {
                const song = i + 1 + '. ' + songs[i]
                songs[i] = song
            }
        }

        const vinyl = {
            artist: data.artist,
            year: data.year,
            title: data.title,
            img: data.img,
            songs: songs,
            ownerId: sessionStorage.getItem('userId')
        }
        // const response = await fetch('https://parseapi.back4app.com/classes/Records/' + id, {
        //     method: 'put',
        //     headers: {
        //         'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',
        //         'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(vinyl)
        // })
        Parse.initialize("O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6", "PbgdreDcCM9RtMvcUnlZIHBNdcqUDCHTDqmMCbAX"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
        Parse.serverURL = "https://parseapi.back4app.com/";
        const query = new Parse.Query('Records');
        query.get(id).then((object) => {
            object.set('artist', data.artist);
            object.set('title', data.title);
            object.set('year', data.year);
            object.set('img', data.img);
            object.set('ownerId', sessionStorage.getItem('userId'));
            object.set('songs', songs);
            object.save()
        })
        ctx.page.redirect('/details/' + album.objectId)
    }
}