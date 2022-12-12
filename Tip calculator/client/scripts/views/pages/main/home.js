import Component from '../../../views/component';
import HomeTemplate from '../../../../templates/pages/main/home';
class Home extends Component {
    async render() {
        return await HomeTemplate({
            englishVersion: localStorage.getItem('lang') == 'en' || localStorage.length == 1,
            russianVersion: localStorage.getItem('lang') == 'ru'
        });
    }
    async afterRender() {
        this.setActions();

    }
    setActions() {
        const buttonGetResault = document.getElementsByClassName('check__calculation')[0],
            buttonLanguage = document.getElementsByClassName('translate')[0],
            formCheck = document.getElementsByClassName('check')[0],
            currency = document.getElementsByClassName('check__currency')[0],
            modalWindow = document.getElementsByClassName('modal-window')[0];
        modalWindow.style.display = 'none';

        buttonLanguage.addEventListener('click', this.translateAll);
        buttonGetResault.addEventListener('click', this.checkCalculation.bind(this, currency, modalWindow));

        formCheck.addEventListener('mouseover', this.firstPrompt.bind(this, currency));
        formCheck.addEventListener('mouseover', this.secondPrompt);

    }
    validationForm(currency) {
        const inputCheckAmount = document.getElementsByClassName('check__amount')[0],
            inputServiceLevel = document.getElementsByClassName('check__level')[0],
            inputAmountPersons = document.getElementsByClassName('check__persons')[0],
            priceTemplate = /^[1-9][0-9]{1,3}(\.[0-9]{1,2})?$/,
            priceTemplateForRub = /^[1-9][0-9]{1,4}(\.[0-9]{1,2})?$/,
            personsTemplate = /^[1-9][0-9]?$/;
        if (currency.value == 'RUB') {
            if (priceTemplateForRub.test(inputCheckAmount.value) && personsTemplate.test(inputAmountPersons.value) && inputServiceLevel.value != 'choose') {
                this.result = ((inputCheckAmount.value * inputServiceLevel.value) / inputAmountPersons.value).toFixed(2);
            } else if (!priceTemplateForRub.test(inputCheckAmount.value)) {
                inputCheckAmount.style.outlineColor = 'red';
                inputCheckAmount.focus();
                inputCheckAmount.value = '';
            }
        } else {
            if (priceTemplate.test(inputCheckAmount.value) && personsTemplate.test(inputAmountPersons.value) && inputServiceLevel.value != 'choose') {
                this.result = ((inputCheckAmount.value * inputServiceLevel.value) / inputAmountPersons.value).toFixed(2);
            } else if (!priceTemplate.test(inputCheckAmount.value)) {
                inputCheckAmount.style.outlineColor = 'red';
                inputCheckAmount.focus();
                inputCheckAmount.value = '';
            }
        }
        if (!personsTemplate.test(inputAmountPersons.value)) {
            inputAmountPersons.style.outlineColor = 'red';
            inputAmountPersons.focus();
            inputAmountPersons.value = '';
        } else if (inputServiceLevel.value == 'choose') {
            inputServiceLevel.style.outlineColor = 'red';
            inputServiceLevel.focus();
        }
    }


    checkCalculation(currency, modalWindow) {
        this.validationForm(currency, modalWindow, this.result);
        if (this.result) {
            modalWindow.style.display = 'block';
            localStorage.getItem('lang') == 'en' || localStorage.length == 1 ?
                modalWindow.innerText = `Tipping per person: ${this.result}${currency.value}` :
                modalWindow.innerText = `Чаевых с человека: ${this.result}${currency.value}`;
        }
    }

    translateAll(buttonLanguage) {

        if (localStorage.getItem('lang') == 'en' || localStorage.length == 1) {
            localStorage.setItem('lang', 'ru');
            buttonLanguage.value = 'RU';
        } else {
            localStorage.setItem('lang', 'en');
            buttonLanguage.value = 'EN';
        }
        location.reload();
    }
    firstPrompt(currency) {
        let tooltipHtmlCurrency,
            tooltipElemCurrency,
            target = event.target;
        if (currency.value == 'RUB') {
            tooltipHtmlCurrency = target.dataset.userInputHelpCheckRub;
        } else {
            tooltipHtmlCurrency = target.dataset.userInputHelpCheck;
        }
        if (!tooltipHtmlCurrency) {
            return;
        }
        tooltipElemCurrency = document.createElement('div');
        tooltipElemCurrency.className = 'userInputHelpCheck';
        tooltipElemCurrency.innerHTML = tooltipHtmlCurrency + currency.value;
        document.body.append(tooltipElemCurrency);

        let coordinates = target.getBoundingClientRect();
        let left = coordinates.left + (target.offsetWidth - tooltipElemCurrency.offsetWidth) / 2;

        if (left < 0) left = 0;
        let top = coordinates.top - tooltipElemCurrency.offsetHeight - 5;
        if (top < 0) {
            top = coordinates.top + target.offsetHeight + 5;
        }

        tooltipElemCurrency.style.left = `${left}px`;
        tooltipElemCurrency.style.top = `${top}px`;
        document.onmouseout = () => {

            if (tooltipElemCurrency) {
                tooltipElemCurrency.remove();
            }
        };
    }
    secondPrompt() {
        let tooltipHtmlPersons,
            tooltipElemPersons,
            target = event.target;

        tooltipHtmlPersons = target.dataset.userInputHelpPersons;

        if (!tooltipHtmlPersons) {
            return;
        }

        tooltipElemPersons = document.createElement('div');
        tooltipElemPersons.className = 'userInputHelpPersons';
        tooltipElemPersons.innerHTML = tooltipHtmlPersons;
        document.body.append(tooltipElemPersons);

        let coordinates = target.getBoundingClientRect();

        let left = coordinates.left + (target.offsetWidth - tooltipElemPersons.offsetWidth) / 2;

        if (left < 0) left = 0;

        let top = coordinates.top - tooltipElemPersons.offsetHeight - 5;

        if (top < 0) {
            top = coordinates.top + target.offsetHeight + 5;
        }

        tooltipElemPersons.style.left = `${left}px`;
        tooltipElemPersons.style.top = `${top}px`;
        document.onmouseout = () => {

            if (tooltipElemPersons) {
                tooltipElemPersons.remove();
            }
        };
    }
}

export default Home;


