const predef = require("./tools/predef");
const meta = require("./tools/meta");

class Ddelta{

  map(d) {
    return (d.close() - d.open());
  }

}

module.exports = {
name: "delta",
      description: "delta(close - open)",
      calculator: Ddelta,
      tags: ['SD Indicators'],
      inputType: meta.InputType.BARS
};
