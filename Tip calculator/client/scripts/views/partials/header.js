import Component from '../../views/component';
import HeaderTemplate from '../../../templates/partials/header';
class Header extends Component {
    async render() {
        return await HeaderTemplate({
            englishVersion: localStorage.getItem('lang') == 'en' || localStorage.length == 1,
            russianVersion: localStorage.getItem('lang') == 'ru',
            page : this.urlParts.page
        });
    }

}

export default Header;
