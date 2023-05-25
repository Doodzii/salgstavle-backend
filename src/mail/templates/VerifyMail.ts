import config from "../../config";

const verifyMail = (code: String) => {
    return `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          padding: 20px;
        }
        
        .header {
            font-size: 30px;
        }

        p {
          color: #3b3b3b;
          font-size: 20px;
          line-height: 1.0;
          margin-bottom: 15px;
        }

        .verify-button {
          width: 500px;
          height: 60px;
          font-size: 25px;
          background-color: #d64141;
          color: rgb(255, 255, 255);
          border: 0px;
          cursor: pointer;
          border-radius: 20px;
        }
        
        .footer {
          color: red;
        }

      </style>

    </head>

    <body>
      
      <p class="header">🎯 Verificer din email</p>
      <p>
        Denne mail er gyldig i 15 minutter
      </p>

      <a href="${config.frontend_url}/verify?code=${code}" target="_blank">
        <button class="verify-button">Verificér mail</button>
      </a>
      
      <p>
        Hvis du ikke har foretaget denne anmodning, bedes du ignorere denne mail.
      </p>

      <div class="footer">
        <p style="color: red; font-size: 17px;"><i><b>
          Salgstavlen
        </b></i></p>
      </div>

    </body>
</html>
`
}

export default verifyMail;

