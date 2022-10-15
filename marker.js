const predef = require("./tools/predef")

const MyLine = {
    //initializes the `state` parameter of the Drawing Tool.
    init() {
        return {/*any arbitrary state, this doesn't even have to be an object*/}
    },

    //graphic items to render associated with this Drawing Tool. The parameter object is
    //available to all of the DrawingToolImplementation functions.
    render({anchors, props, state, plots}) {
         return {
            items: [
                {
                    tag: 'LineSegments',
                    key: 'marker',
                    lines: [
                        {
                            tag: 'Line',
                            a: anchors[0],
                            b: { x: anchors[1].x, y: anchors[0].y },
                            infiniteEnd: true,
                            infiniteStart: true,
                        }
                    ],
                    lineStyle: {
				        lineStyle: 5,
                        lineWidth: 1,
                        color: '#050'
                    }
                },
								{
									 tag: 'Text',
									 key: 'targetPrice',
									 point: anchors[1],
    								 text: ''+anchors[0].y.value,
									 textAlignment: 'rightAbove',
									 style: {fontSize: 12, fontWeight: 'bold', fill:'white'}
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
        ]
    },

    //controls the color of each anchor at the matching position in the array.
    //anchors beyond the index accounted for in this array will default to the tail color,
    //in this case 'blue'
    anchorStyles() {
        return [
            {/*zeroth position anchor*/color: 'red' },
            {/*first position anchor*/color: 'blue' },
        ]
    }
}

module.exports = {
    name: 'HMarker',                         //a unique identifier for the tool
    description: 'Mark target',                //the UI displayed name of the tool
    drawing: MyLine,                                //the object that implements DrawingToolImplementation
    params: {                                       //like indicators, these are user defined parameters
        maxPeriod: predef.paramSpecs.period(14)
    },
    tags: ['My Tools'],                             //a way to group drawing tools in the UI
    minN: 2,                                        //the minimum number of anchors
    maxN: 2                                         //the maximum number of anchors
}
