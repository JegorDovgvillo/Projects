import Component from '../../views/component';
import AboutTemplate from '../../../templates/pages/about';
class About extends Component {
    async render() {
        return await AboutTemplate({
            englishVersion: localStorage.getItem('lang') == 'en' || localStorage.length == 1,
            russianVersion: localStorage.getItem('lang') == 'ru'
        });
    }
    async afterRender() {
        this.setActions();
    }
    setActions() {
        const buttonLanguage = document.getElementsByClassName('translate')[0];
        buttonLanguage.addEventListener('click', this.translateAll);
    }
    translateAll(buttonLanguage) {

        if (localStorage.getItem('lang') == 'en' || localStorage.length == 1) {
            localStorage.setItem('lang', 'ru');
            buttonLanguage.value = 'RU';
        } else if (localStorage.getItem('lang') == 'ru') {
            localStorage.setItem('lang', 'en');
            buttonLanguage.value = 'EN';
        }
        location.reload();
    }
}

export default About;