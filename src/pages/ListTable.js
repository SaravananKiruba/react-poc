import React from 'react';

function ListTable() {
  const dashboardData = {
    "destination": {
      "name": "accountName"
    },
    "orderData": {
      "sourceOrderId": "1234512345",
      "items": [
        {
          "sku": "Business Cards",
          "sourceItemId": "1234512346",
          "components": [
            {
              "code": "Content",            
              "fetch": true,
              "path": "http://www.w2psite.com/businessCard.pdf"
            }
          ]
        }
      ],
      "shipments": [
        {
          "shipTo": {
            "name": "John Doe",
            "companyName": "Acme",
            "address1": "1234 Main St.",
            "town": "Capitol",
            "postcode": "12345",
            "isoCountry": "US"
          },
          "carrier":{
            "code": "fedex",
            "service": "ground"
          }
        }
      ]
    }
  };

  return (
    <div>
      <h1>List of Tables</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Account Name</td>
            <td>{dashboardData.destination.name}</td>
          </tr>
          <tr>
            <td>Source Order ID</td>
            <td>{dashboardData.orderData.sourceOrderId}</td>
          </tr>
          <tr>
            <td>SKU</td>
            <td>{dashboardData.orderData.items[0].sku}</td>
          </tr>
          <tr>
            <td>Source Item ID</td>
            <td>{dashboardData.orderData.items[0].sourceItemId}</td>
          </tr>
          <tr>
            <td>Component Code</td>
            <td>{dashboardData.orderData.items[0].components[0].code}</td>
          </tr>
          <tr>
            <td>Fetch</td>
            <td>{dashboardData.orderData.items[0].components[0].fetch ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Path</td>
            <td>{dashboardData.orderData.items[0].components[0].path}</td>
          </tr>
          <tr>
            <td>Ship To Name</td>
            <td>{dashboardData.orderData.shipments[0].shipTo.name}</td>
          </tr>
          <tr>
            <td>Company Name</td>
            <td>{dashboardData.orderData.shipments[0].shipTo.companyName}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{`${dashboardData.orderData.shipments[0].shipTo.address1}, ${dashboardData.orderData.shipments[0].shipTo.town}, ${dashboardData.orderData.shipments[0].shipTo.postcode}, ${dashboardData.orderData.shipments[0].shipTo.isoCountry}`}</td>
          </tr>
          <tr>
            <td>Carrier Code</td>
            <td>{dashboardData.orderData.shipments[0].carrier.code}</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>{dashboardData.orderData.shipments[0].carrier.service}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ListTable;
