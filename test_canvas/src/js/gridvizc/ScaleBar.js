//@ts-check

/**
 * @author Julien Gaffuri
 */
export class ScaleBar {

    constructor(scale, maxLengthPix) {

        //compute nice length

        //screen pixel size, in m
        const pixelPhysicalSizeM = (25.4 / 96) * 0.001

        const pixelSizeM = scale * pixelPhysicalSizeM

        const maxLengthM = maxLengthPix * pixelSizeM

        const niceLengthM = niceScaleBarLength(maxLengthM)

        const niceLengthPixel = niceLengthM[0] / pixelSizeM

        //division
        const scaleBarStartDigit = niceLengthM[1]
        const divisionMinLengthPixel = 50;

        const computeDivisionNumber = () => {
            //the scale bar is already too small to be divided
            if (niceLengthPixel < divisionMinLengthPixel) return 1;

            let subLP = 0;

            //try dividing by the scaleBarStartDigit
            subLP = niceLengthPixel / scaleBarStartDigit;
            if (subLP < divisionMinLengthPixel) {
                //try dividing by 2
                if (niceLengthPixel / 2 < divisionMinLengthPixel) return 2;
                return 1;
            }

            //try dividing by the scaleBarStartDigit * 2
            subLP = niceLengthPixel / scaleBarStartDigit / 2;
            if (subLP < divisionMinLengthPixel) return scaleBarStartDigit;

            //try dividing by the scaleBarStartDigit * 4
            subLP = niceLengthPixel / scaleBarStartDigit / 4;
            if (subLP < divisionMinLengthPixel) return 2 * scaleBarStartDigit;

            //try dividing by the scaleBarStartDigit * 5
            subLP = niceLengthPixel / scaleBarStartDigit / 5;
            if (subLP < divisionMinLengthPixel) return 4 * scaleBarStartDigit;

            //TODO these three previous steps could be handled into a loop, with some recursion mechanism. It would however be good to limit the number of divisions, or to hierarchise them.

            return 5 * scaleBarStartDigit;
        }
        const divisionNumber = computeDivisionNumber()


        /*

{
  const y = 40;
  const xMargin = 20;
  const height = 100;

  //the container rectangle, in gray
  const svg = d3
    .create("svg")
    .attr("width", maxLengthPix + 2 * xMargin)
    .attr("height", height)
    .style("background-color", "#eee");

  const sbStrokeWidth = 2;
  const sbWidth = 15;

  //main scale bar line
  const scaleBar = svg
    .append("rect")
    .attr("x", xMargin)
    .attr("y", y)
    .attr("width", niceLengthPixel)
    .attr("height", sbWidth)
    .style("fill", "white")
    .style("stroke", "black")
    .style("stroke-width", sbStrokeWidth);

  //first tick text
  const tickStrokeWidth = 3;
  svg
    .append("text")
    .attr("x", xMargin)
    .attr("y", y - 7)
    .text(getLabel(0, false));

  //division
  if (divisionNumber > 1) {
    const divisionWidth = niceLengthPixel / divisionNumber;

    //division rectangles
    for (let i = 0; i < divisionNumber; i++) {
      const isOdd = i % 2;
      svg
        .append("rect")
        .attr("x", xMargin + i * divisionWidth)
        .attr("y", y + (isOdd ? sbWidth / 2 : 0))
        .attr("width", divisionWidth)
        .attr("height", sbWidth / 2)
        .style("fill", "black")
        .style("stroke", "none");
    }

    //tick texts
    for (let i = 1; i < divisionNumber; i++) {
      svg
        .append("text")
        .attr("x", xMargin + i * divisionWidth)
        .attr("y", y - 7)
        .text(getLabel((niceLengthM[0] / divisionNumber) * i, false))
        .style("text-anchor", "middle");
    }
  } else {
    //no division
    scaleBar.style("fill", "black");
  }

  //last tick text
  svg
    .append("text")
    .attr("x", niceLengthPixel + xMargin)
    .attr("y", y - 7)
    .text(getLabel(niceLengthM[0], true))
    .style("text-anchor", "end");

  //scale text, below the bar
  svg
    .append("text")
    .attr("x", niceLengthPixel / 2 + xMargin)
    .attr("y", y + 40)
    .text("Scale: 1:" + scale.toLocaleString())
    .style("text-anchor", "middle");

  return svg.node();
}


*/
    }



}




const niceScaleBarLength = function (scaleBarLength) {
    //compute the 'nice' power of ten
    const pow10 = Math.pow(
        10,
        Math.floor(Math.log(scaleBarLength) / Math.log(10))
    );

    //check if 5 times this value fits
    if (5 * pow10 <= scaleBarLength) return [5 * pow10, 5];

    //check if 3 times this value fits
    if (3 * pow10 <= scaleBarLength) return [3 * pow10, 3];

    //check if 2 times this value fits
    if (2 * pow10 <= scaleBarLength) return [2 * pow10, 2];

    //returns the power of ten
    return [pow10, 1];
}


//TODO: Labels can have different units on a same scale bar... It should not happen.
const getLabel = function (valueM, withUnit = true) {
    //mm
    if (valueM < 0.01)
        return (valueM * 1000).toLocaleString() + (withUnit ? " mm" : "");
    //cm
    if (valueM < 1)
        return (valueM * 100).toLocaleString() + (withUnit ? " cm" : "");
    //m
    if (valueM < 1000)
        return (valueM * 1).toLocaleString() + (withUnit ? " m" : "");
    //km
    return (valueM / 1000).toLocaleString() + (withUnit ? " km" : "");
}

