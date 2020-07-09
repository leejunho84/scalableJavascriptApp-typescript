import '../scss/style.scss';
import Sandbox from './sandbox';

const sandbox = new Sandbox;
const body = document.getElementsByTagName('body')[0];
sandbox.moduleInitalize(body.innerHTML);
