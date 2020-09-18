      require([
        "esri/WebScene",
        "esri/views/SceneView",
        "esri/Basemap",  
        "esri/layers/FeatureLayer",
        "esri/renderers/SimpleRenderer",  
        "esri/Graphic",
        "esri/layers/ElevationLayer",
        "esri/layers/BaseElevationLayer",
        "esri/widgets/Home",
        "esri/widgets/Zoom",
        "esri/widgets/Expand",  
        "esri/widgets/NavigationToggle/NavigationToggleViewModel",  
        "esri/layers/SceneLayer",
        "esri/layers/WebTileLayer",
        "esri/widgets/Search",
        "esri/tasks/Locator",
        "esri/geometry/Polygon"
          
      ], function(WebScene, SceneView, Basemap, FeatureLayer, SimpleRenderer, Graphic, ElevationLayer, BaseElevationLayer, Home, Zoom, Expand, NavigationToggleVM, SceneLayer, WebTileLayer, Search, Locator, Polygon) {
        
          
        var ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({
          properties: {
            exaggeration: 3
          },
          load: function() {
            this._elevation = new ElevationLayer({
              url:
                "//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
            });
            this.addResolvingPromise(this._elevation.load());
          },
          fetchTile: function(level, row, col) {
            return this._elevation.fetchTile(level, row, col).then(
              function(data) {
                var exaggeration = this.exaggeration;
                for (var i = 0; i < data.values.length; i++) {
                  data.values[i] = data.values[i] * exaggeration;
                }
                return data;
              }.bind(this)
            );
          }
        });
          
        //Add Layers to Map and Set Popup Info//  
          
        const BH = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'Black_History'",
          visibility: true,
          popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentInfoBH(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentInfoBH(results) {
            var icon = "<img class='popIcon' alt='' src='img/Black_History.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>Black History</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement;
        }  
          
        const BP = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'Building_Places'",
          visibility: true,            
          popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentBP(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentBP(results) {
            var icon = "<img class='popIcon' alt='' src='img/Buildings_Places.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>Buildings & Places</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement; 
        }
        
        const CW = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'Civil_War'",
          visibility: true,            
          popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentCW(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentCW(results) {
            var icon = "<img class='popIcon' alt='' src='img/Civil.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>Civil War</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement;
        }  
          
        const CF = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'Colonial_Frontier'",
          visibility: true,            
            popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentCF(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentCF(results) {
            var icon = "<img class='popIcon' alt='' src='img/Colonial.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>Colonial  History</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement; 
        }
        
        const CI = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'Commerce_Industry'",
          visibility: true,            
            popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentCI(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentCI(results) {
            var icon = "<img class='popIcon' alt='' src='img/CommIndust.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>Industrial</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement; 
        }  
          
        const COMM = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'Communities'",
          visibility: true,            
            popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentComm(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentComm(results) {
            var icon = "<img class='popIcon' alt='' src='img/Communities.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>Cities & Counties</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement; 
        }
          
        const INST = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'Institutions'",
          visibility: true,            
            popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentInst(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentInst(results) {
            var icon = "<img class='popIcon' alt='' src='img/Institutions.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>Institutions</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement; 
        }
          
        const NA = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'Native_American'",
          visibility: true,            
            popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentNA(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentNA(results) {
            var icon = "<img class='popIcon' alt='' src='img/Native_American.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>Native American History</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement; 
        }
          
        const PEOPLE = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'People'",
          visibility: true,            
            popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentPEOPLE(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentPEOPLE(results) {
            var icon = "<img class='popIcon' alt='' src='img/People.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>People</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement; 
        }
          
        const REV = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VADHR_Signage/FeatureServer/0",
          renderer: signRenderer,
          definitionExpression: "NoLatLng <> 'FLAG' AND Tag = 'Revolution_1812'",
          visibility: true,            
            popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentREV(feature.graphic.attributes);
              },    
          },        
        });
          
        function setContentREV(results) {
            var icon = "<img class='popIcon' alt='' src='img/Revolution.png'/>";
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<table><tbody><tr><td>" + icon + "</td><td><h1>Revolution & War of 1812</h1></td></tr></tbody><table><h2>" + results.MarkerNme + "</h2><h3>" + results.SgnTxt1 + results.SgnTxt2 + results.SgnTxt3 + results.SgnTxt4 + results.SgnTxt5 + results.SgnTxt6 + "</h3><h4>" + results.SignLine + "</h4>";
            
            return popupElement; 
        }
          
        const smallLabel = {
              labelPlacement: "above-center",
              labelExpressionInfo: {
                value: "{NAME}"
              },
              symbol: {
                type: "label-3d",
                symbolLayers: [{
                  type: "text",
                  material: {
                    color: [0, 0, 0]
                  },
                  halo: {
                    color: [255, 255, 255, 0.7],
                    size: 1.5
                  },
                  font: {
                    family: "Montserrat",  
                    weight: "normal"
                  },
                  size: 8
                }],
                verticalOffset: {
                  screenLength: 100,
                  maxWorldLength: 3000,
                  minWorldLength: 1000
                },
                callout: {
                  type: "line",
                  size: .5,
                  color: [0, 0, 0, 0.9]
                }
              }
            };
          
          const largeLabel = {
              labelPlacement: "above-center",
              labelExpressionInfo: {
                value: "{NAME}"
              },
              symbol: {
                type: "label-3d",
                symbolLayers: [{
                  type: "text",
                  material: {
                    color: [0, 0, 0]
                  },
                  halo: {
                    color: [255, 255, 255, 1],
                    size: 1.5
                  },
                  font: {
                    family: "Montserrat",  
                    weight: "normal"
                  },
                  size: 12
                }],
                verticalOffset: {
                  screenLength: 100,
                  maxWorldLength: 4000,
                  minWorldLength: 1000
                },
                callout: {
                  type: "line",
                  size: .75,
                  color: [0, 0, 0, 1]
                }
              }
            }
          
        const vaCities = new FeatureLayer({
            url:"https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VA_Cities/FeatureServer",
            elevationInfo: {
              mode: "on-the-ground",
            },
            renderer: {
              type: "simple",
              symbol: {
                type: "point-3d", 
                symbolLayers: [{
                  type: "icon",
                  resource: {
                    primitive: "circle"
                  },
                  material: {
                    color: [0, 0, 0,0]
                  },
                  size: "4px"
                }]
              }
            },
            outFields: ["*"],
            screenSizePerspectiveEnabled: true,
            labelingInfo: [smallLabel]
          });
        
        const mapBaseLayerTwo = new WebTileLayer({
          urlTemplate: "https://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain/{level}/{col}/{row}.png",
          subDomains: ["a", "b", "c", "d"],
          copyright:
            'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ' +
            'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ' +
            'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ' +
            'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        });

        // Create a Basemap with the WebTileLayer. The thumbnailUrl will be used for
        // the image in the BasemapToggle widget.
        var stamen = new Basemap({
          baseLayers: [mapBaseLayerTwo],
          title: "Terrain",
          id: "terrain",
          thumbnailUrl: "https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png"
        });  
          
        const mapBaseLayer = new WebTileLayer({
          urlTemplate: "https://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain-background/{level}/{col}/{row}.png",   
          subDomains: ["a", "b", "c", "d"],  
          copyright:
            'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ' +
            'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ' +
            'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ' +
            'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        });

        // Create a Basemap with the WebTileLayer. The thumbnailUrl will be used for
        // the image in the BasemapToggle widget.
        var stamenBackground = new Basemap({
          baseLayers: [mapBaseLayer],
          title: "Terrain-Background",
          id: "terrain-background",
          thumbnailUrl: "https://stamen-tiles.a.ssl.fastly.net/terrain-background/10/177/409.png"
        });
          
        const mask = new FeatureLayer({
            url:"https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/VA_Mask/FeatureServer/0",
            visible: true,
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [255, 255, 255, 1],
                outline: {
                  // makes the outlines of all features consistently light gray
                  color: "#545955",
                  width: 1,
                  style: "solid"    
                }
              }
            }
        })  
        
        // Set Scene View
          
       var webscene = new WebScene({
            layers: [BH, BP, CW, CF, CI, COMM, INST, NA, PEOPLE, REV, mask, vaCities],
            ground: {
                layers: [new ExaggeratedElevationLayer()]
            },
            basemap: stamenBackground
        });
          
        webscene.ground.opacity = 1

        var view = new SceneView({
          container: "viewDiv",
          map: webscene,
          //viewingMode: "global",
          //qualityProfile: "high",
          alphaCompositingEnabled: true,
          popup: {
              collapseEnabled: false,
              featureNavigationEnabled: true, 
              dockOptions: {
                  buttonEnabled: false,
                  breakpoint: {
                      height: 1000,
                      width: 600
                  }
              } 
          },    
          environment: {
            background:{
                type: "color", 
                color: [0, 0, 0, 0]
            }, 
            atmosphereEnabled: false,
            starsEnabled: false
          },
          camera: {
            position: {
              latitude: 38.009900,
              longitude: -79.487581,    
              z: 850000
            },
            tilt: 0,
            heading: 0
          },
          constraints: {
              altitude: {
                min: 3000,
                max: 900000,
                tilt: 0
              },
              /*tilt: {
                  max: 75
              }*/
            }
        });
        
        view.popup.viewModel.actions = false;  
        
        /////////////////////Scale Dependent Renderers////////////////////////

        view.when().then(function() {     
                view.watch("scale", function(newValue) {
                if (newValue <= 72224) {
                    return [BH.renderer = signRendererFour, BP.renderer = signRendererFour, CW.renderer = signRendererFour, CF.renderer = signRendererFour, CI.renderer = signRendererFour, COMM.renderer = signRendererFour, INST.renderer = signRendererFour, NA.renderer = signRendererFour, PEOPLE.renderer = signRendererFour, REV.renderer = signRendererFour  ];
                } else if (newValue > 72224 && newValue <= 288895) {
                    return [BH.renderer = signRendererThree, BP.renderer = signRendererThree, CW.renderer = signRendererThree, CF.renderer = signRendererThree, CI.renderer = signRendererThree, COMM.renderer = signRendererThree, INST.renderer = signRendererThree, NA.renderer = signRendererThree, PEOPLE.renderer = signRendererThree, REV.renderer = signRendererThree];
                } else if (newValue > 288895 && newValue <= 1155581) {
                    return [BH.renderer = signRendererTwo, BP.renderer = signRendererTwo, CW.renderer = signRendererTwo, CF.renderer = signRendererTwo, CI.renderer = signRendererTwo, COMM.renderer = signRendererTwo, INST.renderer = signRendererTwo, NA.renderer = signRendererTwo, PEOPLE.renderer = signRendererTwo, REV.renderer = signRendererTwo];
                } else if (newValue > 1155581) {
                    return [BH.renderer = signRenderer, BP.renderer = signRenderer, CW.renderer = signRenderer, CF.renderer = signRenderer, CI.renderer = signRenderer, COMM.renderer = signRenderer, INST.renderer = signRenderer, NA.renderer = signRenderer, PEOPLE.renderer = signRenderer, REV.renderer = signRenderer];
                } else {
                    return [BH.renderer = signRenderer, BP.renderer = signRenderer, CW.renderer = signRenderer, CF.renderer = signRenderer, CI.renderer = signRenderer, COMM.renderer = signRenderer, INST.renderer = signRenderer, NA.renderer = signRenderer, PEOPLE.renderer = signRenderer, REV.renderer = signRenderer] ;
                }
            })
        });
        
        view.when().then(function() {
            view.watch("scale", function(newValue) {
            webscene.basemap = newValue <= 288895 ? stamen : stamenBackground;    
            })
        });
          
        view.when().then(function() {
            view.watch("scale", function(newValue) {
            vaCities.labelingInfo = newValue <= 288895 ? largeLabel : smallLabel;    
            })
        });  
    
        
        ///////////////Setup Catagory Buttons/////////////////  
          
        var layerButton1 = document.getElementById("black_history_button");

        layerButton1.addEventListener("click", function() {
            if (BH.visible == true) {
                BH.visible = false;
                $(".black_history").addClass('pressed', 0);
                $("#bh_name").addClass('pressed', 0);
            } else if (BH.visible == false) {
                BH.visible = true;
                $(".black_history").removeClass('pressed', 0);
                $("#bh_name").removeClass('pressed', 0);
            }
        });
          
        var layerButton2 = document.getElementById("building_button");

        layerButton2.addEventListener("click", function() {
            if (BP.visible == true) {
                BP.visible = false;
                $(".building").addClass('pressed', 0);
                $("#p_name").addClass('pressed', 0);
            } else if (BP.visible == false) {
                BP.visible = true;
                $(".building").removeClass('pressed', 0);
                $("#p_name").removeClass('pressed', 0);
            }
        });
          
        var layerButton3 = document.getElementById("civil_button");

        layerButton3.addEventListener("click", function() {
            if (CW.visible == true) {
                CW.visible = false;
                $(".civil").addClass('pressed', 0);
                $("#cw_name").addClass('pressed', 0);
            } else if (CW.visible == false) {
                CW.visible = true;
                $(".civil").removeClass('pressed', 0);
                $("#cw_name").removeClass('pressed', 0);
            }
        });  
          
        var layerButton4 = document.getElementById("colonial_button");

        layerButton4.addEventListener("click", function() {
            if (CF.visible == true) {
                CF.visible = false;
                $(".colonial").addClass('pressed', 0);
                $("#ch_name").addClass('pressed', 0);
            } else if (CF.visible == false) {
                CF.visible = true;
                $(".colonial").removeClass('pressed', 0);
                $("#ch_name").removeClass('pressed', 0);
            }
        });
          
        var layerButton5 = document.getElementById("indust_button");

        layerButton5.addEventListener("click", function() {
            if (CI.visible == true) {
                CI.visible = false;
                $(".indust").addClass('pressed', 0);
                $("#i_name").addClass('pressed', 0);
            } else if (CI.visible == false) {
                CI.visible = true;
                $(".indust").removeClass('pressed', 0);
                $("#i_name").removeClass('pressed', 0);
            }
        });
          
        var layerButton6 = document.getElementById("comm_button");

        layerButton6.addEventListener("click", function() {
            if (COMM.visible == true) {
                COMM.visible = false;
                $(".comm").addClass('pressed', 0);
                $("#cc_name").addClass('pressed', 0);
            } else if (COMM.visible == false) {
                COMM.visible = true;
                $(".comm").removeClass('pressed', 0);
                $("#cc_name").removeClass('pressed', 0);
            }
        });
          
        var layerButton7 = document.getElementById("instit_button");

        layerButton7.addEventListener("click", function() {
            if (INST.visible == true) {
                INST.visible = false;
                $(".instit").addClass('pressed', 0);
                $("#inst_name").addClass('pressed', 0);
            } else if (INST.visible == false) {
                INST.visible = true;
                $(".instit").removeClass('pressed', 0);
                $("#inst_name").removeClass('pressed', 0);
            }
        });
          
        var layerButton8 = document.getElementById("na_button");

        layerButton8.addEventListener("click", function() {
            if (NA.visible == true) {
                NA.visible = false;
                $(".na").addClass('pressed', 0);
                $("#na_name").addClass('pressed', 0);
            } else if (NA.visible == false) {
                NA.visible = true;
                $(".na").removeClass('pressed', 0);
                $("#na_name").removeClass('pressed', 0);
            }
        });    
          
        var layerButton9 = document.getElementById("people_button");

        layerButton9.addEventListener("click", function() {
            if (PEOPLE.visible == true) {
                PEOPLE.visible = false;
                $(".people").addClass('pressed', 0);
                $("#pe_name").addClass('pressed', 0);
            } else if (PEOPLE.visible == false) {
                PEOPLE.visible = true;
                $(".people").removeClass('pressed', 0);
                $("#pe_name").removeClass('pressed', 0);
            }
        });
    
        var layerButton10 = document.getElementById("rev_button");

        layerButton10.addEventListener("click", function() {
            if (REV.visible == true) {
                REV.visible = false;
                $(".rev").addClass('pressed', 0);
                $("#r_name").addClass('pressed', 0);
            } else if (REV.visible == false) {
                REV.visible = true;
                $(".rev").removeClass('pressed', 0);
                $("#r_name").removeClass('pressed', 0);
            }
        });    
          
          
          
        ///////////////Setup Map UI/////////////////
          
            var addSearch = new Search({
              view: view,
              includeDefaultSources: false,
              container: "addSearch",
              popupEnabled: false,   
              locationEnabled: false,   
              sources: [
                {
                  locator: new Locator({
                    url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" 
                  }),
                  filter: {
                        geometry: new Polygon({
                            "rings": [
                              [
                                [
                              -83.75976562499999,
                              36.54494944148322
                            ],
                            [
                              -75.772705078125,
                              36.491973470593685
                            ],
                            [
                              -75.750732421875,
                              37.16031654673677
                            ],
                            [
                              -75.16845703124999,
                              38.06539235133249
                            ],
                            [
                              -76.256103515625,
                              38.013476231041935
                            ],
                            [
                              -76.86035156249999,
                              38.41055825094609
                            ],
                            [
                              -76.6845703125,
                              38.831149809348744
                            ],
                            [
                              -77.607421875,
                              39.410733055084954
                            ],
                            [
                              -77.87109375,
                              39.30029918615029
                            ],
                            [
                              -78.431396484375,
                              39.58029027440865
                            ],
                            [
                              -78.837890625,
                              39.01918369029134
                            ],
                            [
                              -79.07958984375,
                              38.98503278695909
                            ],
                            [
                              -79.310302734375,
                              38.59970036588819
                            ],
                            [
                              -79.716796875,
                              38.7283759182398
                            ],
                            [
                              -80.474853515625,
                              37.63163475580643
                            ],
                            [
                              -81.23291015625,
                              37.405073750176925
                            ],
                            [
                              -81.650390625,
                              37.35269280367274
                            ],
                            [
                              -81.968994140625,
                              37.65773212628272
                            ],
                            [
                              -82.36450195312499,
                              37.45741810262938
                            ],
                            [
                              -82.99072265625,
                              37.020098201368114
                            ],
                            [
                              -83.70483398437499,
                              36.69485094156225
                            ],
                            [
                              -83.75976562499999,
                              36.54494944148322
                            ]
                              ]
                            ],
                            "spatialReference": {
                              "wkid": 4326
                            }
                          }) 
                    },
                  name: "Search by Address or Place",
                  placeholder: "Enter an Address or Place",
                  zoomScale: 15000,
                    resultSymbol: {
                        type: "simple-marker",  
                        style: "circle",
                        color: "#3288bd",
                        size: 15, 
                        outline: { 
                        color: "#9e0142",
                        width: 5 
                        }                  
                    }   
                }  
              ]
            });
          
            var wordSearch = new Search({
              view: view,
              includeDefaultSources: false,
              container: "wordSearch",
              popupEnabled: true,
              allPlaceholder: "Enter a Keyword",    
              locationEnabled: false,   
              sources: [
                {
                    layer: BH,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "Black History",
                },
                {
                    layer: BP,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "Places",
                },
                {
                    layer: CW,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "Civil War",
                },
                {
                    layer: CF,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "Colonial History",
                },
                {
                    layer: CI,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "Industrial History",
                },
                {
                    layer: COMM,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "Cities & Counties",
                },
                {
                    layer: INST,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "Institutions",
                },
                {
                    layer: NA,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "Native America History",
                },
                {
                    layer: PEOPLE,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "People",
                },
                {
                    layer: REV,
                    searchFields: ["MarkerNme","SgnTxt1","SgnTxt2","SgnTxt3","SgnTxt4","SgnTxt5","SgnTxt6"],
                    displayField: "MarkerNme",
                    exactMatch: false,
                    //placeholder: "Enter a District Name",
                    name: "Revolution & War of 1812",
                }  
              ]
            });
          
        wordSearch.on("select-result", function(){
            view.goTo({
                scale: 15000
            })
        });
          
        const infoElement = document.getElementById("infoDiv");
        
        var exandWidget = new Expand ({
            view: view,
            content: infoElement,
            expandIconClass: "esri-icon-question"
        });
          
       
          
        var homeBtn = new Home({
            view: view
        });  
          
        var zoom = new Zoom({
            view: view,
            layout: "horizontal"
        })  

        view.ui.add(homeBtn, "bottom-left");
          
        view.ui.add(exandWidget, "bottom-left");  
    
        view.ui.move("zoom", 'bottom-right');
        
        view.ui.remove("compass");  

        view.ui.move("navigation-toggle", "bottom-right"); 
                    
});
        
         


        
    
