export default () => {
  const element = document.createElement('h1');
  let text = '>run proto<span class="blink">_</span>';
  element.innerHTML = text;
  return element;
};
