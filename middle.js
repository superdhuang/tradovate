const predef = require("./tools/predef");
const meta = require("./tools/meta");
const p = require("./tools/plotting");

class Dmiddle{

  map(d) {
    return { middle: ((d.close() + d.open()) / 2) };
  }

}

module.exports = {
name: "middle",
      description: "middle price",
      calculator: Dmiddle,
      tags: ['SD Indicators'],
      plots: {
          middle: {title: 'middle'},
      },
      plotter: [ predef.plotters.dots('middle') ],
      schemeStyles: {
          dark: {
              middle: { color: 'gray'}
          }
      },
      inputType: meta.InputType.BARS
};
