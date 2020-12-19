export { default as Prism } from "prismjs";
export { default as input } from "~ellx-hub/lib/components/Input/index.js";
export { default as select } from "~ellx-hub/lib/components/Select/index.js";
export { default as highlight } from "~matyunya/output";
export { default as Prism } from "prismjs";
import "/index.css";

import headlong from "~matyunya/headlong";

headlong();

const shapes = {
  triangle: (ctx) => {
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  },
  square: (ctx) => {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  },
  circle: (ctx) => {
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.fill();
  }
}

export const draw = props => ({
  ...props,
  __EllxMeta__: {
    component: class {
      constructor(props) {
        console.log({ props });
        this.update(props);
      }
      update(props) {
        this.props = props;
      }
      render(node) {
        const { shape, color } = this.props;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = color;

        if (shapes[shape]) {
          shapes[shape](ctx);
        }

        node.appendChild(canvas);

        console.log({ shape });
        console.log({ctx,canvas})
      }
    }
  }
});

export const themes = [
  "prism", "dark", "funky", "okaidia", "coy", "twilight", "tomorrow"
];

const s = document.createElement('link');
s.setAttribute('type', 'text/css');
s.setAttribute('rel', 'stylesheet');
document.head.appendChild(s);

export function applyTheme(name) {
  name = name === "prism" ? "prism" : "prism-" + name;

  s.setAttribute('href', 'https://prismjs.com/themes/' + name + '.css');
}

export function mySum2(...args) {
  return args.reduce((acc, cur) => acc + cur, 0);
}

export function mySum3(...args) {
  return args.reduce((acc, cur) => Number(acc) + Number(cur), 0);
}
