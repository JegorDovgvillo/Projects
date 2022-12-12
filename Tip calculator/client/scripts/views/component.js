import { parseCurrentURL } from '../helpers/utils';
class Component {
    constructor() {
        this.urlParts = parseCurrentURL();
    }
    async afterRender() { }
}

export default Component;