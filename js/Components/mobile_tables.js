window.addEventListener("load", function () {
  convertTablesForPhones();
  window.onresize = function () {
    convertTablesForPhones();
  };

  function convertTablesForPhones() {
    const tables = document.querySelectorAll("table");

    if (!!tables) {
      tables.forEach(function (table) {
        const headers = table.querySelectorAll("thead th");
        const dataRows = table.querySelectorAll("tr");
        const headersInData = table.querySelectorAll("tbody th");
        const simpleTable = checkIfSimpleTable(
          table,
          headers,
          dataRows,
          headersInData
        );

        // convert table if it is simple
        if (simpleTable) {
          let mobileTable = "";
          const tableId = `table-${Math.floor(Math.random() * 1000)}`;
          !!table.classList
            ? table.classList.add(tableId)
            : table.setAttribute("class", tableId);

          mobileTable += `<div id="table-mobile-${tableId}" class="card table-mobile">`;
          dataRows.forEach(function (row, index) {
            const dataCells = row.querySelectorAll("td");

            dataCells.forEach(function (cell, index) {
              mobileTable += `<div class="table-mobile-header"> ${headers[index].textContent} </div>
               <div class="table-mobile-content"> ${cell.textContent} </div>`;
            });
            if (index > 0 && index < dataRows.length - 1)
              mobileTable += "<div class='table-mobile-divider'></div>";
          });
          mobileTable += "</div>";
          table.outerHTML = table.outerHTML + mobileTable;

          window
            .getComputedStyle(
              document.getElementById("table-mobile-" + tableId)
            )
            .getPropertyValue("display") === "block"
            ? document
                .querySelector(`.${tableId}`)
                .classList.add("hide-from-sr")
            : document
                .querySelector(`.${tableId}`)
                .classList.remove("hide-from-sr");
        }
      });
    }
  }

  function checkIfSimpleTable(table, headers, dataRows, headersInData) {
    let integer = 0;

    if (headersInData.length) integer++;
    if (!!table && table.classList.contains("ui-datepicker-calendar"))
      integer++;

    headers.forEach(function (header) {
      if (header.hasAttribute("colspan") || header.hasAttribute("rowspan"))
        integer++;
    });

    dataRows.forEach(function (dataRows) {
      const dataCells = dataRows.querySelectorAll("td");
      if (dataRows.hasAttribute("colspan") || dataRows.hasAttribute("rowspan"))
        integer++;

      dataCells.forEach(function (td) {
        if (td.hasAttribute("colspan") || td.hasAttribute("rowspan")) integer++;
      });
    });
    return integer === 0 ? true : false;
  }
});
