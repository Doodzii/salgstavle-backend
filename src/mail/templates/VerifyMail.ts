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
          color: #666666;
          font-size: 20px;
          line-height: 1.0;
          margin-bottom: 15px;
        }

        .verification-code {
          font-size: 28px;
          font-weight: bold;
          color: #ff5d5d;
          display: inline-block;
          padding: 10px 20px;
          background-color: #FFFFFF;
          border-radius: 5px;
          border: 2px solid #9f9f9f;
        }
        
      </style>

    </head>

    <body>
      <p class="header">Engangskode til Salgstavlen</p>
      <p>
        Denne kode kan kun bruges én gang og udløber om 15 minutter:
      </p>
      <p>
        <span class="verification-code">${code}</span>
      </p>
      <p>
        Hvis du ikke har foretaget denne anmodning, bedes du ignorere denne mail.
      </p>
    </body>
</html>
`
}

export default verifyMail;

