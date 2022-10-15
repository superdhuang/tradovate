const predef = require("./tools/predef")
const { px, du, op } = require("./tools/graphics")

const MyLine2 = {
    //initializes the `state` parameter of the Drawing Tool.
    init() {
        return {/*any arbitrary state, this doesn't even have to be an object*/}
    },

    //graphic items to render associated with this Drawing Tool. The parameter object is
    //available to all of the DrawingToolImplementation functions.
    render({anchors, props, state, plots}) {
			        return {
            items: [
                //...
                {
                    tag: 'LineSegments',
                    key: 'middle',
                    lines: [
                        {
                            tag: 'Line',
                            a: anchors[2]
                                ? {
                                    x: anchors[0].x,
                                    y: du(anchors[0].y.value + upperDiff/2)
                                }
                                : anchors[0],
                            b: anchors[2]
                                ? {
                                    x: anchors[1].x,
                                    y: du(anchors[1].y.value + upperDiff/2)
                                }
                                : anchors[0]
                        }
                    ],
                    lineStyle: {
                        width: 2,
                        color: props.middle,
                        lineStyle: 3
                    },
                }
            ]
        }
    },

    //we can change our state parameter using update. A common use case would be to perform a big calculation
    //and store it in state only when necessary to improve performance and decrease resource usage.
    update({anchors, props, state, plots}) {
        if(someCondition) {
            return { newState: { value: 'myNewValue' } }
        }
    },

    //holding the SHIFT key over a drawing reveals its tooltip. We can determine how
    //the tooltips render with the toopltips function
    tooltips({anchors, props, state, plots}) {
        return [
            //DrawingTooltip items go here
        ]
    },

    //controls the X and Y coordinate space that is valid for the anchor at the matching position in the array.
    //anchors[0] will be allowed to move 10 units in the X axis, anchors[1] will be able to move 5 units in the Y axis.
    //If there is no X or Y value listed, there will be no restraint placed on the anchor's valid coords.
    anchorRestraints() {
        return [
            {/*zeroth position anchor*/x: 10 },
            {/*first position anchor*/y: 5 }
        ]
    },

    //controls the color of each anchor at the matching position in the array.
    //anchors beyond the index accounted for in this array will default to the tail color,
    //in this case 'blue'
		anchorStyles() {
        return [
            { color: props.lower },
            { color: props.lower },
            { color: props.upper }
        ]
    }
}

module.exports = {
    name: 'MyLine2',                         //a unique identifier for the tool
    description: 'My Line2',                //the UI displayed name of the tool
    drawing: MyLine2,                                //the object that implements DrawingToolImplementation
		params: {
        upper: predef.paramSpecs.color('#2d2'),
        middle: predef.paramSpecs.color('#999'),
        lower: predef.paramSpecs.color('#d22')
    },
    tags: ['My Tools'],                             //a way to group drawing tools in the UI
    maxN: 3                                         //the maximum number of anchors
}

