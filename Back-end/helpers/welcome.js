module.exports = (data) => {
    return `
    <p style="text-align: center;"><strong><span style="font-size: 17px;">Thank you for joining us 😃</span></strong></p>
    <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Dear ${data.name},</p>
    <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Thank you for registering on ${data.appname}. We are happy to have you.</p>
    <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>enjoy.</p>
    <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; vertical-align: baseline; background: transparent; text-size-adjust: none; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 19px !important; font-weight: 300 !important; line-height: 30px !important;'><a href="${data.url}">Continue to browse</a></p>
    <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><br></p>
    `;
  };
  