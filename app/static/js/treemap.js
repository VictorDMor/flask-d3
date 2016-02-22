var treemap = (function() {
  return {
    init: init
  }

  function init(){
    var treemap = {
      _name: "tree_map",
      _items: [],
      _id: "hs_id",
      _size: "export_val",
    }

    function graph_data(converted_data) {
      d3.json("static/flare.json", function(error, root) {
        if (error) throw error;
          for (i = 0; i < root.data.length; i++) {
            converted_data[i] = {
              "year": root.data[i][0],
              "import_val": root.data[i][2],
              "export_val": root.data[i][3],
              "hs_id": root.data[i][root.data.length] 
            }
          }
      });
      return converted_data
    }

    function graph_retrieval(graph_type) {
      var visualization = d3plus.viz()
      .container("#viz")
      .data(graph_data([]))
      .type(treemap._name)
      .id(treemap._id)
      .depth(1)
      .size(treemap._size)
      .labels({"align": "left", "valign": "top"})
      .draw();
    }

    graph_retrieval(treemap)
  }
})();

$(document).ready(function() {
  treemap.init();
});


