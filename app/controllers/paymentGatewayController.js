const axios = require("axios");

let handleMainRequest = (req, res) => {
  // Perform Snap API request
  axios({
    // Below is the API URL endpoint
    url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from("SB-Mid-server-76-t6FTVJxwrAuzhVIOnKuU-").toString("base64")
      // Above is API server key for the Midtrans account, encoded to base64
    },
    data:
      // Below is the HTTP request body in JSON
      {
        transaction_details: {
          order_id: "order-csb-" + new Date().getTime(),
          gross_amount: req.body.price
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          first_name: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone
        }
      }
  }).then(
    (snapResponse) => {
      let snapToken = snapResponse.data.token;
      console.log("Retrieved snap token:", snapToken);
      // Pass the Snap Token to frontend, render the HTML page
      // res.send(getMainHtmlPage(snapToken, handleMainRequest));
      res.json({link: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}`})
    },
    (error) => {
      res.send(`Fail to call API w/ error ${error}`);
      console.log(error);
    }
  );
};

module.exports = {
   handleMainRequest,
};

