import { makeRandomNumber } from 'components/functions/random';

export default function makeAnimate() {
  const width = 100 - (480 * 100) / window.innerWidth;
  const height = 100 - (375 * 100) / window.innerHeight;
  const top = (55 * 100) / window.innerHeight;
  const bottom = window.innerHeight - 370;
  const node = document.getElementById('error-image-wrapper');
  if (node) {
    const animation = node.animate(
      [
        { top: '55px', left: '0' }, // 0
        { top: `${makeRandomNumber(top, height)}%`, left: `${makeRandomNumber(0, width / 2)}%` }, // 10%
        { top: `${makeRandomNumber(top, height)}%`, left: `${makeRandomNumber(0, width / 2)}%` }, // 20%
        { top: `${bottom}px`, left: `${makeRandomNumber(width / 2, width)}%` }, // 30%
        { top: `${makeRandomNumber(top, height)}%`, left: `${makeRandomNumber(width / 2, width)}%` }, // 40%
        { top: '55px', left: `${width}%` }, // 50%
        { top: `${makeRandomNumber(top, height)}%`, left: `${makeRandomNumber(width / 2, width)}%` }, // 60%
        { top: `${bottom}px`, left: `${makeRandomNumber(width / 2, width)}%` }, // 70%
        { top: `${makeRandomNumber(top, height)}%`, left: `${makeRandomNumber(0, width / 2)}%` }, // 80%
        { top: `${makeRandomNumber(top, height)}%`, left: `${makeRandomNumber(0, width / 2)}%` }, // 90%
        { top: '55px', left: '0' } // 100%
      ],
      {
        duration: 30000,
        delay: 0,
        easing: 'linear'
      }
    );
    animation.play();
    setTimeout(() => {
      makeAnimate();
    }, 30000);
  }
}
