import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )
    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    const ahora = new Date().toISOString()

    const respuesta = await calendar.events.list({
      calendarId: process.env.GOOGLE_PASTORAL_CALENDAR_ID,
      timeMin: ahora,
      maxResults: 30,
      singleEvents: true,
      orderBy: 'startTime',
    })

    const eventos = (respuesta.data.items || []).map((ev) => ({
      id: ev.id,
      titulo: ev.summary || '(Sin título)',
      descripcion: ev.description || '',
      ubicacion: ev.location || '',
      inicio: ev.start?.dateTime || ev.start?.date,
      fin: ev.end?.dateTime || ev.end?.date,
    }))

    return res.status(200).json({ eventos })
  } catch (err) {
    console.error('Error leyendo Agenda Pastoral:', err)
    return res.status(500).json({ error: 'No se pudo cargar la agenda pastoral' })
  }
}