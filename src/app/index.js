import './app.css';
import component from './component';
import faker from 'faker';

const header = document.querySelector('header');
const article = document.getElementsByTagName('article')[0];
const logo = document.getElementById('wolf');

let wolf = require('./../public/assets/wolfang.svg');

header.appendChild(component());
logo.innerHTML = `<img src="${wolf}" alt="">`;

console.log(faker.fake('Hey ' + '{{name.firstName}} - {{hacker.phrase}}'));
