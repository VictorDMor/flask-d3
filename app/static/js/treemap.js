var treemap = (function() {
    return {
        draw: draw,
        init: init,
    }

    var _name,
        _id,
        _size;

    function _getData() {
        var  data = []
        d3.json("static/flare.json", function(error, root) {
        if (error) throw error;
          for (i = 0; i < root.data.length; i++) {
            data[i] = {
              "year": root.data[i][0],
              "import_val": root.data[i][2],
              "export_val": root.data[i][3],
              "hs_id": root.data[i][root.data.length]
            }
          }
        });

        return data
    }

    function draw() {
        var visualization = d3plus.viz()
            .container("#viz")
            .data(_getData())
            .type(_name)
            .id(_id)
            .depth(1)
            .size(_size)
            .labels({"align": "left", "valign": "top"})
            .draw();
    }

    function init(){
        _name = "tree_map";
        _id = "hs_id";
        _size = "export_val";

        $('#size-selector').on('change', function(){
            _size = this.value;
            draw();
        });
    }

})();

$(document).ready(function() {
    treemap.init();
    treemap.draw();
});


