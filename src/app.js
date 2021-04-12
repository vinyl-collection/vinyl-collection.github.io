import { render } from '../node_modules/lit-html/lit-html.js'
import page from "//unpkg.com/page/page.mjs";


import { loginPage } from './views/login.js'
import { mainPage } from './views/dashboard.js'
import { addPage } from './views/add.js'
import { detailPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { registerPage } from './views/register.js'
import { logout } from './api/api.js';

const main = document.querySelector('.container')


page('/', contextModerate, mainPage)
page('/add', contextModerate, addPage)
page('/login', contextModerate, loginPage)
//page('/register', contextModerate, registerPage)
page('/details/:id', contextModerate, detailPage)
page('/edit/:id', contextModerate, editPage)

setUserNav();

page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    sessionStorage.clear()
    setUserNav();
})
function contextModerate(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}