const invModel = require("../models/inventory-models")
const Util = {}
exports.renderVehicleDetails = (vehicle) => {
  return `
    <html>
      <head>
        <title>${vehicle.make} ${vehicle.model}</title>
        <style>
          /* Estilos responsivos aquí */
          .container {
            display: flex;
            flex-direction: column;
          }
          @media(min-width: 768px) {
            .container {
              flex-direction: row;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
          <div>
            <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
            <p>Price: $${vehicle.price.toLocaleString()}</p>
            <p>Mileage: ${vehicle.mileage.toLocaleString()} miles</p>
            <!-- Más detalles aquí -->
          </div>
        </div>
      </body>
    </html>
  `;
};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

module.exports = Util
/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach(vehicle => { 
      grid += '<li>';
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' details"><img src="' + vehicle.inv_thumbnail + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += '<hr />';
      grid += '<h2>';
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>';
      grid += '</h2>';
      grid += '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
      grid += '</div>';
      grid += '</li>';
    });
    grid += '</ul>';
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
}
