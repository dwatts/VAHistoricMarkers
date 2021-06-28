const verticalOffset = {
    screenLength: 40,
    maxWorldLength: 2000,
    minWorldLength: 500
};

function getSiteColor(color) {
  return {
    type: "point-3d", 
    symbolLayers: [
      {
        type: "icon",
        material: {
          color: color
        },
        size: 4,
        outline: {
          color: "#404040",
          size: .5
        }
      }
    ],

    verticalOffset: verticalOffset,

    callout: {
      type: "line",
      color: [94,94,94],
      size: 1.5,
      border: {
        color: [250,250,250]
      }
    }
  };
}      

const signRenderer = {
    type: "unique-value",
    field: "Tag",
    uniqueValueInfos: [
        {
            value: "Black_History",
            symbol: getSiteColor(
                "#9e0142"
            )
        },
        {
            value: "Building_Places",
            symbol: getSiteColor(
                "#d53e4f"
            )
        },
        {
            value: "Civil_War",
            symbol: getSiteColor(
                "#f46d43"
            )
        },
        {
            value: "Colonial_Frontier",
            symbol: getSiteColor(
                "#fdae61"
            )
        },
        {
            value: "Commerce_Industry",
            symbol: getSiteColor(
                "#fee08b"
            )
        },{
            value: "Communities",
            symbol: getSiteColor(
                "#e6f598"
            )
        },
        {
            value: "Institutions",
            symbol: getSiteColor(
                "#abdda4"
            )
        },
        {
            value: "Native_American",
            symbol: getSiteColor(
                "#66c2a5"
            )
        },{
            value: "People",
            symbol: getSiteColor(
                "#3288bd"
            )
        },
        {
            value: "Revolution_1812",
            symbol: getSiteColor(
                "#5e4fa2"
            )
        }
    ]
};

const verticalOffsetTwo = {
    screenLength: 40,
    maxWorldLength: 2000,
    minWorldLength: 500
};

function getSiteColorTwo(icon) {
  return {
    type: "point-3d", 
    symbolLayers: [
      {
        type: "icon",
        resource: {
            href: icon
        },
        /*material: {
          color: color
        },*/
        size: 12,
        outline: {
          color: "white",
          size: 2
        }
      }
    ],

    verticalOffset: verticalOffsetTwo,

    callout: {
      type: "line",
      color: [0,0,0],
      size: 1.5,
      border: {
        color: [0,0,0]
      }
    }
  };
}      

const signRendererTwo = {
    type: "unique-value",
    field: "Tag",
    uniqueValueInfos: [
        {
            value: "Black_History",
            symbol: getSiteColorTwo (
                "img/Black_History.png"
            )
        },
        {
            value: "Building_Places",
            symbol: getSiteColorTwo(
                "img/Buildings_Places.png"
            )
        },
        {
            value: "Civil_War",
            symbol: getSiteColorTwo(
                "img/Civil.png"
            )
        },
        {
            value: "Colonial_Frontier",
            symbol: getSiteColorTwo(
                "img/Colonial.png"
            )
        },
        {
            value: "Commerce_Industry",
            symbol: getSiteColorTwo(
                "img/CommIndust.png"
            )
        },{
            value: "Communities",
            symbol: getSiteColorTwo(
                "img/Communities.png"
            )
        },
        {
            value: "Institutions",
            symbol: getSiteColorTwo(
                "img/Institutions.png"
            )
        },
        {
            value: "Native_American",
            symbol: getSiteColorTwo(
                "img/Native_American.png"
            )
        },{
            value: "People",
            symbol: getSiteColorTwo(
                "img/People.png"
            )
        },
        {
            value: "Revolution_1812",
            symbol: getSiteColorTwo(
                "img/Revolution.png"
            )
        }
    ]
};

const verticalOffsetThree = {
    screenLength: 20,
    maxWorldLength: 500,
    minWorldLength: 100
};

function getSiteColorThree(icon) {
  return {
    type: "point-3d", 
    symbolLayers: [
      {
        type: "icon",
        resource: {
            href: icon
        },
        /*material: {
          color: color
        },*/
        size: 19,
        outline: {
          color: "white",
          size: 2
        }
      }
    ],

    verticalOffset: verticalOffsetThree,

    callout: {
      type: "line",
      color: [0,0,0,1],
      size: 2,
      /*border: {
        color: "404040"
      }*/
    }
  };
}      

const signRendererThree = {
    type: "unique-value",
    field: "Tag",
    uniqueValueInfos: [
        {
            value: "Black_History",
            symbol: getSiteColorThree (
                "img/Black_History.png"
            )
        },
        {
            value: "Building_Places",
            symbol: getSiteColorThree(
                "img/Buildings_Places.png"
            )
        },
        {
            value: "Civil_War",
            symbol: getSiteColorThree(
                "img/Civil.png"
            )
        },
        {
            value: "Colonial_Frontier",
            symbol: getSiteColorThree(
                "img/Colonial.png"
            )
        },
        {
            value: "Commerce_Industry",
            symbol: getSiteColorThree(
                "img/CommIndust.png"
            )
        },{
            value: "Communities",
            symbol: getSiteColorThree(
                "img/Communities.png"
            )
        },
        {
            value: "Institutions",
            symbol: getSiteColorThree(
                "img/Institutions.png"
            )
        },
        {
            value: "Native_American",
            symbol: getSiteColorThree(
                "img/Native_American.png"
            )
        },{
            value: "People",
            symbol: getSiteColorThree(
                "img/People.png"
            )
        },
        {
            value: "Revolution_1812",
            symbol: getSiteColorThree(
                "img/Revolution.png"
            )
        }
    ]
};

const verticalOffsetFour = {
    screenLength: 20,
    maxWorldLength: 500,
    minWorldLength: 100
};

function getSiteColorFour(icon) {
  return {
    type: "point-3d", 
    symbolLayers: [
      {
        type: "icon",
        resource: {
            href: icon
        },
        /*material: {
          color: color
        },*/
        size: 25,
        outline: {
          color: "white",
          size: 2
        }
      }
    ],

    verticalOffset: verticalOffsetFour,

    callout: {
      type: "line",
      color: [0,0,0,1],
      size: 2,
      /*border: {
        color: "404040"
      }*/
    }
  };
}      

const signRendererFour = {
    type: "unique-value",
    field: "Tag",
    uniqueValueInfos: [
        {
            value: "Black_History",
            symbol: getSiteColorFour (
                "img/Black_History.png"
            )
        },
        {
            value: "Building_Places",
            symbol: getSiteColorFour(
                "img/Buildings_Places.png"
            )
        },
        {
            value: "Civil_War",
            symbol: getSiteColorFour(
                "img/Civil.png"
            )
        },
        {
            value: "Colonial_Frontier",
            symbol: getSiteColorFour(
                "img/Colonial.png"
            )
        },
        {
            value: "Commerce_Industry",
            symbol: getSiteColorFour(
                "img/CommIndust.png"
            )
        },{
            value: "Communities",
            symbol: getSiteColorFour(
                "img/Communities.png"
            )
        },
        {
            value: "Institutions",
            symbol: getSiteColorFour(
                "img/Institutions.png"
            )
        },
        {
            value: "Native_American",
            symbol: getSiteColorFour(
                "img/Native_American.png"
            )
        },{
            value: "People",
            symbol: getSiteColorFour(
                "img/People.png"
            )
        },
        {
            value: "Revolution_1812",
            symbol: getSiteColorFour(
                "img/Revolution.png"
            )
        }
    ]
};

/****County Renderers****/

const countyRenderOne = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: [255, 255, 255, 0],
      outline: {
        color: [0,0,0,0.25],
        width: 1,
        style: "solid"    
      }
    }
};

const countyRenderTwo = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: [255, 255, 255, 0],
      outline: {
        color: [0,0,0,0.4],
        width: 1,
        style: "solid"    
      }
    }
};

const countyRenderThree = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: [255, 255, 255, 0],
      outline: {
        color: [0,0,0,0.7],
        width: 1,
        style: "solid"    
      }
    }
};