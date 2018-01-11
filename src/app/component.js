export default (text = '>_hello world!') => {
  const element = document.createElement('h1');

  element.innerHTML = text;

  return element;
};
