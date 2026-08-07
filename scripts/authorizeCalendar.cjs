const { google } = require('googleapis')
const http = require('http')
const path = require('path')
const fs = require('fs')

const credentials = require('../googleOAuthCredentials.json')
const clientInfo = credentials.installed || credentials.web

const oAuth2Client = new google.auth.OAuth2(
  clientInfo.client_id,
  clientInfo.client_secret,
  'http://localhost:3000/oauth2callback'
)

const SCOPES = ['https://www.googleapis.com/auth/calendar']

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',
})

console.log('\nAbre esta URL en tu navegador (con la cuenta schottalfredo@gmail.com) y autoriza el acceso:\n')
console.log(authUrl)
console.log('\nEsperando a que autorices...\n')

const server = http.createServer(async (req, res) => {
  if (req.url.indexOf('/oauth2callback') > -1) {
    const qs = new URL(req.url, 'http://localhost:3000').searchParams
    const code = qs.get('code')

    res.end('¡Listo! Ya puedes cerrar esta pestaña y regresar a la Terminal.')
    server.close()

    try {
      const { tokens } = await oAuth2Client.getToken(code)
      const tokenPath = path.join(__dirname, '..', 'googleCalendarToken.json')
      fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2))
      console.log('✓ Token guardado en googleCalendarToken.json')
      console.log('Ya puedes usar la API de Google Calendar desde el portal.')
      process.exit(0)
    } catch (err) {
      console.error('Error obteniendo el token:', err)
      process.exit(1)
    }
  }
}).listen(3000)