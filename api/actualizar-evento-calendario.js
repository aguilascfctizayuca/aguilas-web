import { google } from 'googleapis'
import { verificarUsuarioRegistrado } from './_lib/verificarAcceso.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const usuario = await verificarUsuarioRegistrado(req)
  if (!usuario) {
    return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' })
  }

  try {
    const { googleEventId, titulo, descripcion, fecha, horaInicio, horaFin, ubicacion } = req.body
    if (!fecha || !horaInicio) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' })
    }
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )
    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
    const inicio = `${fecha}T${horaInicio}:00`
    const fin = horaFin ? `${fecha}T${horaFin}:00` : `${fecha}T${horaInicio}:00`
    const evento = {
      summary: titulo,
      description: descripcion || '',
      location: ubicacion || '',
      start: { dateTime: inicio, timeZone: 'America/Mexico_City' },
      end: { dateTime: fin, timeZone: 'America/Mexico_City' },
    }
    let respuesta
    if (googleEventId) {
      respuesta = await calendar.events.update({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        eventId: googleEventId,
        requestBody: evento,
      })
    } else {
      respuesta = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: evento,
      })
    }
    return res.status(200).json({ googleEventId: respuesta.data.id })
  } catch (err) {
    console.error('Error actualizando evento en Google Calendar:', err)
    return res.status(500).json({ error: 'No se pudo actualizar el evento en el calendario' })
  }
}
