    const predef = require("./tools/predef")
    const { px, du, op } = require("./tools/graphics")
    
    const AdamT = {
        //initializes the `state` parameter of the Drawing Tool.
        init() {
            return {/*any arbitrary state, this doesn't even have to be an object*/}
        },
    
        //graphic items to render associated with this Drawing Tool. The parameter object is
        //available to all of the DrawingToolImplementation functions.
        render({anchors, props}) {
            const yDiff = anchors[1].y.value - anchors[0].y.value
            const endPos = anchors[0].y.value - (yDiff)
            //console.log(anchors[0])
            
               return {
                items: [
                    
                    {
                        tag: 'LineSegments',
                        key: 'lower',
                        lines: [
                            {
                                tag: 'Line',
                                a: {
                                    x: anchors[0].x,
                                    y: du(endPos)
                                },
                                b: {
                                    x: anchors[1].x,
                                    y: du(endPos)
                                }
                            }
                        ],
                        lineStyle: {
                            lineStyle: 5,
                            width: 2,
                            color: props.lower
                        }
                    },
                    {
                        tag: 'LineSegments',
                        key: 'upper',
                        lines: [
                            {
                                tag: 'Line',
                                a: {
                                        x: anchors[0].x,
                                        y: anchors[1].y
                                    },
                                b: anchors[1] 
                            }
                        ],
                        lineStyle: {
                            width: 2,
                            color: props.upper
                        }
                    },
                    {
                        tag: 'LineSegments',
                        key: 'middle',
                        lines: [
                            {
                                tag: 'Line',                            
                                a: anchors[0],
                                b: {
                                    x: anchors[1].x,
                                    y: anchors[0].y
                                }
                            }
                        ],
                        lineStyle: {
                            width: 2,
                            color: props.middle,
                            lineStyle: 1
                        }
                    },
                    {
                        tag: 'Text',
                        key: 'MiddlePrice',
                        point: anchors[0],
                        text: ''+anchors[0].y.value,
                        textAlignment: 'rightAbove',
                        style: {fontSize: 12, fontWeight: 'bold', fill:'white'}
                    },
                    {
                        tag: 'Text',
                        key: 'UpperPrice',
                        point: {
                            x: anchors[0].x,
                            y: anchors[1].y
                            },
                        text: ''+anchors[1].y.value,
                        textAlignment: 'rightAbove',
                        style: {fontSize: 12, fontWeight: 'bold', fill:'white'}
                    },
                    {
                        tag: 'Text',
                        key: 'LowerPrice',
                        point: {
                            x: anchors[0].x,
                            y: du(endPos)
                            },
                        text: ''+endPos,
                        textAlignment: 'rightAbove',
                        style: {fontSize: 12, fontWeight: 'bold', fill:'white'}
                    }
                ]
            }
        },
    
        //we can change our state parameter using update. A common use case would be to perform a big calculation
        //and store it in state only whn necessary to improve performance and decrease resource usage.
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
                {
                coord: anchors[0],      //coord tells the tooltip where to render in chart space. An anchor's point is a typical choice
                alignment: {            //the alignment tells the tooltip how to align itself 
                    tag: 'predef',
                    x: 'left',
                    y: 'above'         
                },
                items: [
                    {
                        content: "My Line",
                    },
                    {
                        content: {
                            delta: ((anchors[1].y.value - anchors[0].y.value) > 0 )?
                            anchors[1].y.value - anchors[0].y.value
                            :anchors[0].y.value - anchors[1].y.value
                        }
                    }
                ]
            }
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
    		anchorStyles({props}) {
            return [
                { color: props.lower },
                { color: props.lower },
                { color: props.uper }
            ]
        }
    }
    
    module.exports = {
        name: 'AdamT',                         //a unique identifier for the tool
        description: 'AdamT',                //the UI displayed name of the tool
        drawing: AdamT,                                //the object that implements DrawingToolImplementation
    		params: {
    		noshow: predef.paramSpecs.color('black'),
            upper: predef.paramSpecs.color('yellow'),
            middle: predef.paramSpecs.color('white'),
            lower: predef.paramSpecs.color('yellow')
        },
        tags: ['My Tools'],                             //a way to group drawing tools in the UI
        maxN: 2                                         //the maximum number of anchors
    }
    

