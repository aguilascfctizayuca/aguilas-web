import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  try {
    const { googleEventId } = req.body

    if (!googleEventId) {
      return res.status(200).json({ ok: true })
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )
    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId: googleEventId,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    // Si el evento ya no existe en Calendar (código 410 o 404), no es un error real.
    if (err.code === 410 || err.code === 404) {
      return res.status(200).json({ ok: true })
    }
    console.error('Error eliminando evento de Google Calendar:', err)
    return res.status(500).json({ error: 'No se pudo eliminar el evento del calendario' })
  }
}