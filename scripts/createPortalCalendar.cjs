const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')

const credentials = require('../googleOAuthCredentials.json')
const clientInfo = credentials.installed || credentials.web
const token = require('../googleCalendarToken.json')

const oAuth2Client = new google.auth.OAuth2(clientInfo.client_id, clientInfo.client_secret)
oAuth2Client.setCredentials(token)

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

async function crearCalendario() {
  const res = await calendar.calendars.insert({
    requestBody: {
      summary: 'Águilas CFC - Portal de Líderes',
      description: 'Calendario del portal interno. NO es tu calendario personal.',
      timeZone: 'America/Mexico_City',
    },
  })
  console.log('✓ Calendario creado')
  console.log('ID del calendario:', res.data.id)

  const configPath = path.join(__dirname, '..', 'portalCalendarId.txt')
  fs.writeFileSync(configPath, res.data.id)
  console.log('Guardado en portalCalendarId.txt')
}

crearCalendario().catch((err) => {
  console.error(err)
  process.exit(1)
})