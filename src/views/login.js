// import { html } from '../../node_modules/lit-html/lit-html.js';
import {html, render} from 'https://unpkg.com/lit-html?module';
import { login } from '../api/data.js'

const loginTemplate = (onSubmit, errorMsg, invalidEmail, invalidPass) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
        ${errorMsg ? html`<div class="form-group">
            <h2>${errorMsg}</h2>
        </div>` : ''}
    </div>

</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Username</label>
                <input class="${'form-control' + (invalidEmail ? ' is-invalid' : '')}" id="email" type="text"
                    name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="${'form-control' + (invalidPass ? ' is-invalid' : '')}" id="password" type="password"
                    name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
`;

export async function loginPage(ctx) {

    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email')
        const password = formData.get('password')

        if (email == '' || password == '') {
            return ctx.render(loginTemplate(onSubmit, 'All fields are required!', email == '', password == ''))
        }
        await login(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/');
    }

}