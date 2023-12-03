var table
function initTable(url) {
  table = $("#addressBook").DataTable({
    ajax: {
      url,
      dataSrc: function (json) {
        const data = [];
        for (const type in json) {
          for (char in json[type]) {
            data.push(...json[type][char].map((item) => ({ ...item, type })));
          }
        }
        data.forEach(
          (item) => (item.title_filter = item.title.replace(/[,”’]/g, ""))
        );
        return data;
      },
    },
    columns: [
      {
        data: {
          _: "title",
          filter: "title_filter",
        },
      },
      { data: "address" },
      { data: "type" },
    ],
    paging: false,
    dom: '<"row"<"col-sm-12 col-md-6"f><"col-sm-12 col-md-6"i>><"row"t>',
  });
  $("#addressBook_filter").css({ float: "left" });
  $("#addressBook_info").css({ float: "right" });
}

function updateTable(url){
    table.ajax.url(url).load();
}
