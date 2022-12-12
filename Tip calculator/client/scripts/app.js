import '../style/styles';
import { parseCurrentURL } from './helpers/utils';
import Header from './views/partials/header';
import Footer from './views/partials/footer';
import Home from './views/pages/main/home';
import About from './views/pages/about';
import Error404 from './views/pages/error404';

const Routes = {
    '/': About,
    '/main': Home
};

function router() {
    (async() => {
        const headerContainer = document.getElementsByClassName('container__header')[0],
            contentContainer = document.getElementsByClassName('container__content')[0],
            header = new Header();

        const urlParts = parseCurrentURL(),
            pagePath = `/${urlParts.page || ''}`,
            page = Routes[pagePath] ? new Routes[pagePath]() : new Error404();

        headerContainer.innerHTML = await header.render();

        contentContainer.innerHTML = await page.render();
        await page.afterRender();
    })();
}

(async() => {
    const footerContainer = document.getElementsByClassName('container__footer')[0],
        footer = new Footer();

    footerContainer.innerHTML = await footer.render();
})();

module.hot ? module.hot.accept(router()) : (window.onload = router);
window.onhashchange = router;