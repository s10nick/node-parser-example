var d3 = require("d3"),
    cloud = require("../assets/d3-cloud.js");

var layout = cloud()
    .size([500, 500])
    .words([ 
      { text: 'data', size: 511 },
      { text: 'mining', size: 408 },
      { text: 'learning', size: 59 },
      { text: 'software', size: 45 },
      { text: 'machine', size: 39 },
      { text: 'analysis', size: 38 },
      { text: 'information', size: 37 },
      { text: 'knowledge', size: 37 },
      { text: 'discovery', size: 32 },
      { text: 'olap', size: 26 },
      { text: 'this', size: 26 },
      { text: 'patterns', size: 25 },
      { text: 'deductor', size: 23 },
      { text: 'from', size: 23 },
      { text: 'language', size: 23 },
      { text: 'that', size: 22 },
      { text: 'isbn', size: 21 },
      { text: 'with', size: 21 },
      { text: 'which', size: 19 },
      { text: 'text', size: 19 } 
    ])
    // .words([
    //   "Hello", "world", "normally", "you", "want", "more", "words",
    //   "than", "this"].map(function(d) {
    //   return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    // }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

layout.start();

function draw(words) {
  d3.select("body").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}
