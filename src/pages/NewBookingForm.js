import React, { useState } from 'react';

function NewBookingForm() {
  const [formData, setFormData] = useState({
    accountName: "",
    sourceOrderId: "",
    sku: "",
    sourceItemId: "",
    componentCode: "",
    fetch: false,
    path: "",
    shipToName: "",
    companyName: "",
    address1: "",
    town: "",
    postcode: "",
    isoCountry: "",
    carrierCode: "",
    service: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can process the form data or send it to the server here
    console.log(formData);
  };

  return (
    <div>
      <h1>New Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Account Name:
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Source Order ID:
          <input
            type="text"
            name="sourceOrderId"
            value={formData.sourceOrderId}
            onChange={handleInputChange}
          />
        </label>

        <label>
          SKU:
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Source Item ID:
          <input
            type="text"
            name="sourceItemId"
            value={formData.sourceItemId}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Component Code:
          <input
            type="text"
            name="componentCode"
            value={formData.componentCode}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Fetch:
          <input
            type="checkbox"
            name="fetch"
            checked={formData.fetch}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Path:
          <input
            type="text"
            name="path"
            value={formData.path}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Ship To Name:
          <input
            type="text"
            name="shipToName"
            value={formData.shipToName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Address1:
          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Town:
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Postcode:
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleInputChange}
          />
        </label>

        <label>
          ISO Country:
          <input
            type="text"
            name="isoCountry"
            value={formData.isoCountry}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Carrier Code:
          <input
            type="text"
            name="carrierCode"
            value={formData.carrierCode}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Service:
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewBookingForm;
