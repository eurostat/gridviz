let viewer;
let selectedGrid = "europe5km"

addMouseEvents()
initializeViewer()

function addMouseEvents() {
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        let btn = $("#menu-toggle-icon")
        btn.toggleClass("fa-chevron-right");
        btn.toggleClass("fa-chevron-left");
    });

    //TOC layer toggles

    //europe 1km
    $("#europe1km").click(function (e) {
        e.preventDefault();

        if (selectedGrid !== "europe1km") {
            $(`#${selectedGrid}`).toggleClass("selected");
            selectedGrid = "europe1km";
            $("#europe1km").toggleClass("selected");
            //set new gridData on viewer
            viewer.colorField("Population")
            viewer.gridData([
                {
                    url: "../../../../assets/csv/Europe/1km/pop_1km.csv",
                    cellSize: 1.1
                }
            ])
            viewer.center([4369, 3230]) //move camera to new data
            viewer.zoom(50)
        }
    });

    //europe 2km
    $("#europe2km").click(function (e) {
        e.preventDefault();

        if (selectedGrid !== "europe2km") {
            $(`#${selectedGrid}`).toggleClass("selected");
            selectedGrid = "europe2km";
            $("#europe2km").toggleClass("selected");
            //set new gridData on viewer
            viewer.colorField("value")
                .zerosRemoved(3)
                .colorScheme("interpolateTurbo")
                .gridData([
                    {
                        url: "../../../../assets/csv/Europe/2km/pop_2km.csv",
                        cellSize: 2.1
                    }
                ])
                .center([4369, 3230])
                // .zoom(50)
                .legend({ "title": "Total population per 2 km²" })
        }
    });

    //europe 5km
    $("#europe5km").click(function (e) {
        e.preventDefault();

        if (selectedGrid !== "europe5km") {
            $(`#${selectedGrid}`).toggleClass("selected");
            selectedGrid = "europe5km";
            $("#europe5km").toggleClass("selected");
            //set new gridData on viewer
            viewer.colorField("Population")
                .zerosRemoved(3)
                .colors(null)
                .thresholdValues(null)
                .colorScheme("interpolateTurbo")
                .gridData([
                    {
                        url: "../../../assets/csv/Europe/5km/3035/pop_grid_5km_incl_uninhab.csv",
                        cellSize: 5
                    }
                ])
                .center([4369, 3230])
                .legend({ "title": "Total population per 5 km²" })
        }
    });

    //netherlands 100m
    $("#netherlands100m").click(function (e) {
        e.preventDefault();
        if (selectedGrid !== "netherlands100m") {
            $(`#${selectedGrid}`).toggleClass("selected");
            selectedGrid = "netherlands100m";
            $("#netherlands100m").toggleClass("selected");
            //set new gridData on viewer
            viewer.colorField("Inhabitants").gridData([{
                url: "../../../assets/csv/Netherlands/100m/NL_census.csv",
                cellSize: 1.1,
            }])
                .center([1421, 4546])
                .zerosRemoved(2)
                .placenamesEPSG(28992)
                .placenamesCountry("NL")
                .placenameThresholds({ //"scale": population
                    "1500": 100000,
                    "1250": 100000,
                    "1000": 50000,
                    "500": 10000,
                    "250": 500
                })
                .colors(["#2d50a0", "#6487c3", "#aab9e1", "#f0cd91", "#e6a532", "#d76e2d", "red"])
                .thresholdValues([10, 20, 40, 80, 200, 300, 900])
                .legend({ "title": "Total Inhabitants per 100m² (2018)" })
        }
    });

    //croatia 1km
    $("#croatia1km").click(function (e) {
        e.preventDefault();
        if (selectedGrid !== "croatia1km") {
            $(`#${selectedGrid}`).toggleClass("selected");
            selectedGrid = "croatia1km";
            $("#croatia1km").toggleClass("selected");
            //set new gridData on viewer
            viewer.colorField("NIGHTS_TOT")
                .zerosRemoved(null)
                .gridData([
                    {
                        url: "../../../assets/csv/Croatia/croatia_tourism_grid.csv",
                        cellSize: 1000
                    }
                ])
                .center([4755000, 2369000])//EPSG=3035
                .zoom(500000) //initial camera Z value
                // .nuts2json(true) //loads borders topojson
                // .nuts2jsonCountry("HR") //filter nuts2json
                // .placenamesCountry("HR") //filter placenames
                .placenameThresholds({ //"scale": population
                    "450000": 200000,
                    "200000": 10000,
                    "100000": 5000,
                    "10000": 5000,
                    "1000": 500
                })
                .legend({ "title": "Total tourist nights per km² (2017)" })
        }
    });


    //france 1km
    $("#france1km").click(function (e) {
        e.preventDefault();
        if (selectedGrid !== "france1km") {
            $(`#${selectedGrid}`).toggleClass("selected");
            selectedGrid = "france1km";
            $("#france1km").toggleClass("selected");
            //set new gridData on viewer
            viewer.colorField("Ind")
                .gridData([{
                    url: "../../../assets/csv/France/1km/2015_Ind.csv",
                    cellSize: 1100
                }])
                .placenameThresholds({ //"scale": population
                    "1000000": 100000,
                    "300000": 50000,
                    "150000": 30000,
                    "100000": 500,
                })
                .center([3709000, 2624000])//EPSG=3035
                .legend({ "title": "Census data" })
            // .nuts2json(true)
            // .nutsLevel(3)
            // .nuts2jsonCountry("FR")
            // .nuts2jsonEPSG(3035)
        }
    });




}

function initializeViewer() {
    $("#europe5km").toggleClass("selected");
    let containerNode = document.getElementById("viz-container");
    //default viewer config
    viewer = gridviz.viewer()
        .container(containerNode)
        .gridData([
            {
                url: "../../../assets/csv/Europe/5km/3035/pop_grid_5km_incl_uninhab.csv",
                cellSize: 5
            }
        ])
        .zerosRemoved(3)
        .colorField("Population")  // csv column which you wish to visualize
        .nuts2json(false) //loads borders topojson
        .center([4369, 3230])//EPSG=3035
        .height(containerNode.offsetHeight)
        .width(containerNode.offsetWidth)
        .backgroundColor("#000")
        .borderColor("#ffffff")
        .loadingIcon("ellipsis")
        .legend({
            type: "continuous",
            height: 350,
            title: "Total population per 5 km² (2011)",
            titleWidth: 130,
            cells: 15
        })
        .sourcesHTML("Source: <a target='__blank' href='https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/population-distribution-demography/geostat'>GEOSTAT</a>")
        .build()
}