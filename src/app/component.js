export default (text = 'Hello World!') => {
  const element = document.createElement('h1');

  element.innerHTML = text;

  return element;
};
