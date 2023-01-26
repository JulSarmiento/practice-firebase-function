require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1337d3a8b41090",
    pass: "b4e823b5a4ca09",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const {dest, name} = req.query;

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Lemon&family=Montserrat:wght@300;400;700&family=Roboto+Mono:wght@300;400;700&family=Roboto:ital,wght@0,300;0,700;1,400&display=swap" rel="stylesheet">
          <title>Document</title>
        
          <style>
            .header{
              padding: 0 5%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-direction: row;
            }
        
            .header img{
              width: 100px;
            }
        
            .header h2,  .main h1 {
              font-family: 'Lemon', cursive;
            }
          
            .title{
              font-size: 3rem;
              font-weight: 700;
              color: #000;
            }
            
            .main {
              height: 400px;
              padding: 0 5%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
        
            .footer {
              width: 100%; 
              display: flex;
              justify-content: center;
            }    
          
          </style>
        </head>
        <body>
        
          <header class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/fir-function-to-email.appspot.com/o/StudyCorn%20Dev%20Logo.png?alt=media&token=08a924f1-f461-4b16-9221-ee6423be4eb8" alt="">
            <h2>Holis ${name}</h2>
          </header>
        
          <main class="main">
            <h1>Muchas gracias!</h1>
            <p>
              Gracias por participar en la actividad y 
              acompañarme en mi camino de programadora. 
            </p>
          </main>
        
          <footer>
            <div class="footer">
              <img loading="lazy""
                src="https://firebasestorage.googleapis.com/v0/b/fir-function-to-email.appspot.com/o/Encabezado%20-%20email%20-%20StudyCorn%20Dev.png?alt=media&token=ab202d7a-671f-43b2-9278-092b7673586b">
            </div>
          </footer>
          
        </body>
        </html>
      `;

    const mailOptions = {
      from: "StudyCorn Dev",
      to: dest,
      subject: "Gracias por participar!",
      html, // email content in HTML
    };

    // returning email
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send(error.toString());
      }
      return res.send("Sended");
    });
  });
});
