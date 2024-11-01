var table
const copyIcon = '<img width="12" height="12" src="https://img.icons8.com/ios-glyphs/30/copy-2.png" alt="copy-2"/>'

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
        render: function (data, type, row) {
          return `<button type="btn" class="btn btn-outline-secondary"">${copyIcon}</button>`;
        }
      },
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

  table.on('click', 'tbody tr', function () {
    let data = table.row(this).data();
    const strToClipboard = data.title + ' ' + data.address

    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val(strToClipboard).select();
    document.execCommand("copy");
    $temp.remove();
  });
  
  $("#addressBook_filter").css({ float: "left" });
  $("#addressBook_info").css({ float: "right" });
}

function updateTable(url) {
  table.ajax.url(url).load();
}
