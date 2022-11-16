const predef = require("./tools/predef");
const meta = require("./tools/meta");

class Ddelta{

  map(d) {
    return (d.open() - d.close());
  }

}

class DLowShadow{
    map(d) {
        return (
            ((d.close() < d.open())?d.close():d.open()) - d.low())
    }
}

module.exports = {
name: "Shadow",
      description: "Lower Shadow Size",
      calculator: DLowShadow,
      tags: ['SD Indicators'],
      inputType: meta.InputType.BARS
};
