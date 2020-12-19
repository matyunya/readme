---
title: Notebook Is A Better Readme
nav: false
---

# Notebook Is A Better Readme

[Source code](https://ellx.io/matyunya/readme/index.md), [repo](https://github.com/matyunya/readme), [published version](http://matyunya-readme.ellx.app/)

A lot of the times newcomers to open source projects are kindly asked to contribute to readme or documentation before they can do any *real* work. Same thing starting a new job. Many smaller projects get their readme as an afterthought. We also tend to forget to keep readme/documentation up-to-date rendering them even more confusing.

> I'd been writing my project for over a year and hoping to get help, buy-in, and collaboration. Then I realized that I hadn't updated my Readme since starting out, and it was out of date, and, frankly sucked. It was not convincing, and it was the first thing that devs saw when assessing my project!
>
> <cite>[forgotmypw17](https://news.ycombinator.com/item?id=25224053)</cite>

This quote comes from a Hacker News thread about [Readme Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html) (great read, by the way!). The name implies you should write your readme _before writing any code_. I'd like to extend that idea for things that work inside browser.

## Readme can execute the code it's describing

What if reader could interact with the code, try different modes and values while following the general narrative of the document? Contrived example:

<div class="font-mono text-sm p-4 dark:text-blue-300 dark:border-blue-300 text-blue-900 border-blue-900 border my-8">

## DRAW

-----------------

### Introduction

__Draw__ is a library for drawing shapes of different colors. It can draw squares, triangles and circles in red, green and blue.

### Installation

<div class="border font-mono text-xs p-4 my-4">

npm install my-draw-library

</div>

### Demo

#### Color
(red, green, or blue)
{ color = select({ value: "--", options: ["--", "red", "green", "blue"] }) }

#### Shape
(triangle, circle or square)
{ shape = select({ value: "--", options: ["--", "circle", "square", "triangle"] }) }

{ draw({ color, shape })}

Grab the code below to draw the shape you've selected.

<div class="border font-mono text-xs p-4 my-4">

import draw from "my-draw-library";

draw({ color: "{ color }", shape: "{shape}" });

</div>

</div>

This approach should work for most libraries that have text or graphic output. Too often I find myself installing an npm package, going through all the instructions only to find that it's not what I need. I only wish I learned it sooner! In case GitHub README.md I'm already looking at a page rendered inside the browser so it could run the package code along with proper sandboxing.

Now, GitHub offers GitHub Pages with Jekyll or other static-site generator but I see two major drawbacks here:

- __It isn't standard.__

Good thing about GitHub readmes is that they are absolutely consistent in how they look and feel and their content to some extent. To illustrate the problem please take a look at the Prism.js' [GitHub Pages](https://prismjs.com/). (I think it's a great library, just an example). I was trying to find how to highlight the DOM node with the import statement [above](#usage) but that page made me feel _right away_ that it won't be easy to find what I need. Instead I want to know where to look before I even open the page. It should be noted that setting up static site generator is extra work not many are willing and able to do.

<img loading="lazy" class="w-full mt-4 shadow" src="https://i.ibb.co/w4qLGbX/Screenshot-2020-12-18-at-16-45-47.png" alt="Prism.js GitHub Pages" border="0">
<div class="a font-mono text-xs mt-2 mb-4 text-gray-900">
  <a href="https://prismjs.com/">Prism.js GitHub Pages</a>
</div>

On the other hand their [README.md](https://github.com/PrismJS/prism) is lacking in favor or the GitHub Pages site, I assume.

<img loading="lazy" class="w-full mt-4 shadow" src="https://i.ibb.co/6Dcy8fN/Screenshot-2020-12-18-at-17-49-59.png" alt="Prism.js readme" border="0">
<div class="a font-mono text-xs mt-2 mb-4 text-gray-900">
  <a href="https://github.com/PrismJS/prism">Prism.js GitHub README.md</a>
</div>

Can we have the best of both worlds?

<div class="font-mono text-sm p-4 dark:text-blue-300 dark:border-blue-300 text-blue-900 border-blue-900 border my-8">

# Prism

[![npm](https://img.shields.io/npm/dw/prismjs.svg)](https://www.npmjs.com/package/prismjs)

Prism is a lightweight, robust, and elegant syntax highlighting library. It's a spin-off project from [Dabblet](https://dabblet.com/).

You can learn more on [prismjs.com](https://prismjs.com/).

[Why another syntax highlighter?](https://lea.verou.me/2012/07/introducing-prism-an-awesome-new-syntax-highlighter/#more-1841)

[More themes for Prism!](https://github.com/PrismJS/prism-themes)

## Demo

Theme:
{ theme = select({ value: "prism", options: themes })}

String:

{ value = input({ value: 'const prismjs = test === 42 || 43', size: 4 }) }

Output:

{ highlight(value) }

...

</div>

- __GitHub Pages is not Markdown.__

There is no standard way to write such a readme/documentation page. We didn't always have README.md and GitHub Flavored Markdown, yet today it is such a commodity no one notices the improvement it brought at a _very low cost to maintainers_.

Now, I've been working on a [tool](https://ellx.io) combining notebook, spreadsheet and "app-builder" type of thing, pretty far from the wants I've described above, when one day I found myself writing readmes precisely this way! The page you're reading right now is Markdown with that extra syntax. Check this out:

```
// Demo code for Prism.js
Theme:
{ theme = select({ value: "prism", options: themes })}

{ applyTheme(theme) }

String:
{ value = input({ value: 'const prismjs = test === 42 || 43', size: 4 }) }

Output:
{ highlight(value) }
```

Expressions inside curly braces are spreadsheet cells so any changes in their state are applied on any depending nodes. It is like Excel without grid and addresses. `select` and `input` functions are simple wrappers around html select and input tags, and `highlight` is a Prism.js wrapper component. This file you're reading is `index.md`, by Ellx convention it shares scope with `index.js` so all of the mentioned functions are being exported by it.

These few ideas combined together provide a very concise way to write readme and write library code in general. It becomes the sort of instant TDD while the development process is being documented in the readme as you go along. I tried this approach with [headlong](https://ellx.io/matyunya/headlong/index.md) recently. First, describe intent, add the demo code as if it's a test.

<div class="font-mono text-sm p-4 dark:text-blue-300 dark:border-blue-300 text-blue-900 border-blue-900 border my-8">

## Sum

This library will export function `mySum` returning sum of its arguments

{ mySum(1, 2, 3) }

</div>

Then write a function.

<div class="font-mono text-sm p-4 dark:text-blue-300 dark:border-blue-300 text-blue-900 border-blue-900 border my-8">

## Sum

This library exports function `mySum` returning sum of its arguments:

1 + 2 + 3 = { mySum2(1, 2, 3) }

```
{ mySum2(1, 2, 3) }
```
</div>

Then add controls to play around, search for edge cases, or combine with other functions. Rinse and repeat. (actually discoved a bug in a one-line sum function 🤦‍♀️)

<div class="font-mono text-sm p-4 dark:text-blue-300 dark:border-blue-300 text-blue-900 border-blue-900 border my-8">

## Sum

This library exports function `mySum` returning sum of its arguments:

{ a = input({ type: "number", label: "a", value: 1 }) }
{ b = input({ type: "number", label: "b", value: 2 }) }
{ c = input({ type: "number", label: "c", value: 3 }) }

{a} + {b} + {c} = { mySum3(a, b, c) }

```
{ a = input({ type: "number", label: "a", value: 1 }) }
{ b = input({ type: "number", label: "b", value: 2 }) }
{ c = input({ type: "number", label: "c", value: 3 }) }

{a} + {b} + {c} = { mySum3(a, b, c) }
```
</div>

Most importantly, the readme is executing the very code it is sharing repository with, not the latest or whatever version published to npm. This turns readme into a function of its code, thus keeping at least the executed code part ever up-to-date.

Please [try it](https://ellx.io) for yourself, join our [Discord](https://discord.com/invite/K4cQMaQ), or drop me a line at [maxim@ellxoft.com](mailto:maxim@ellxoft.com) if you're interested in this kind of readme for your project or library!
