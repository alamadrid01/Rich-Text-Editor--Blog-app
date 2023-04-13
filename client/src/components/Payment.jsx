import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCardNumberChange = (e) => {
    let formattedCardNumber = formatCardNumber(e.target.value);
    setCardNumber(formattedCardNumber);
  };

 const handleExpiryChange = (e) => {
   let value = e.target.value;
   if (value.length === 2 && value.indexOf("/") === -1) {
     value += "/";
   }
   setExpiry(value);
 };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);


    if(cardNumber === "5399 1234 5678 9010" && expiry === "12/25" && cvv === "123"){
        alert("nice")
        setIsLoading(false);
    }else{
        alert("false")
    }
  };
  
 const formatCardNumber = (cardNumber) => {
   let formattedNumber = cardNumber.replace(/[^0-9]/g, "");
   formattedNumber = formattedNumber.replace(/(\d{4})/g, "$1 ");
   return formattedNumber.trim();
 };


  return (
    <div className="px-0 lg-px-5 xl:max-w-10xl xl:mx-auto pb-20">
      <Navbar />
      <div className="max-w-md mx-auto mt-4">
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cardNumber"
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="expiry"
            >
              Expiry
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiry"
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cvv"
              type="password"
              placeholder="123"
              value={cvv}
              onChange={handleCvvChange}
            />
          </div>
          <div className="flex items-center justify-between">
            {isLoading ? (
              <button
                className="bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled
              >
                Loading ...
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Pay Now
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
