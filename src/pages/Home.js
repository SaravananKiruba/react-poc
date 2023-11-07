import React from 'react';

function Home() {
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
  }

  return (
    <div className="p-4">
      {dashboardData ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <p>Account Name: {dashboardData.destination.name}</p>
            <p>Source Order ID: {dashboardData.orderData.sourceOrderId}</p>
          </div>
          <h3 className="text-xl font-bold mt-4">Shipment Information</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            <p>Ship To: {dashboardData.orderData.shipments[0].shipTo.name}</p>
            <p>Company Name: {dashboardData.orderData.shipments[0].shipTo.companyName}</p>
            <p>Address: {dashboardData.orderData.shipments[0].shipTo.address1}, {dashboardData.orderData.shipments[0].shipTo.town}, {dashboardData.orderData.shipments[0].shipTo.postcode}, {dashboardData.orderData.shipments[0].shipTo.isoCountry}</p>
            <p>Carrier: {dashboardData.orderData.shipments[0].carrier.code}</p>
            <p>Service: {dashboardData.orderData.shipments[0].carrier.service}</p>
          </div>
        </div>
      ) : (
        <p className="text-center mt-4">Loading data...</p>
      )}
    </div>
  );
}

export default Home;
