import Component from '../../views/component';
import FooterTemplate from '../../../templates/partials/footer';
class Footer extends Component {
    async render() {
        return await FooterTemplate({
            englishVersion: localStorage.getItem('lang') == 'en' || localStorage.length == 1,
            russianVersion: localStorage.getItem('lang') == 'ru'
        });
    }
}

export default Footer;
