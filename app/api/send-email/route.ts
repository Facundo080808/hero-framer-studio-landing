import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, whatsapp, plan, message } = body
    
    // Formato de fecha en español
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const currentDate = new Date().toLocaleDateString('es-ES', options)

    const emailContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva solicitud de contacto</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #f7f9fc; color: #333333;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding: 40px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                <!-- Header con logo -->
                <tr>
                  <td style="padding: 35px 40px; text-align: center; background: linear-gradient(135deg, #3a36db 0%, #4c62df 100%); border-top-left-radius: 12px; border-top-right-radius: 12px;">
                    <img src="https://hero-framer-studio.com/logo-white.png" alt="Hero&Framer Studio" style="max-height: 60px; width: auto;" />
                  </td>
                </tr>
                
                <!-- Contenido principal -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #262d3d;">Nueva solicitud de contacto</h1>
                    <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 24px; color: #546182;">
                      Has recibido una nueva solicitud de contacto a través del formulario de la web. A continuación, se detallan los datos proporcionados:
                    </p>
                    
                    <!-- Información del contacto en un diseño más elegante -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: separate; border-spacing: 0 12px;">
                      <tr>
                        <td width="28%" style="vertical-align: top; padding-right: 15px; font-size: 14px; font-weight: 600; color: #546182;">Nombre:</td>
                        <td style="vertical-align: top; font-size: 15px; font-weight: 500; color: #262d3d; padding-bottom: 5px; border-bottom: 1px solid #eaeef5;">${name}</td>
                      </tr>
                      <tr>
                        <td width="28%" style="vertical-align: top; padding-right: 15px; font-size: 14px; font-weight: 600; color: #546182;">Email:</td>
                        <td style="vertical-align: top; font-size: 15px; font-weight: 500; color: #262d3d; padding-bottom: 5px; border-bottom: 1px solid #eaeef5;">
                          <a href="mailto:${email}" style="text-decoration: none; color: #3a36db;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td width="28%" style="vertical-align: top; padding-right: 15px; font-size: 14px; font-weight: 600; color: #546182;">Empresa:</td>
                        <td style="vertical-align: top; font-size: 15px; font-weight: 500; color: #262d3d; padding-bottom: 5px; border-bottom: 1px solid #eaeef5;">${company}</td>
                      </tr>
                      <tr>
                        <td width="28%" style="vertical-align: top; padding-right: 15px; font-size: 14px; font-weight: 600; color: #546182;">WhatsApp:</td>
                        <td style="vertical-align: top; font-size: 15px; font-weight: 500; color: #262d3d; padding-bottom: 5px; border-bottom: 1px solid #eaeef5;">
                          ${whatsapp ? `<a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" style="text-decoration: none; color: #3a36db;">${whatsapp}</a>` : 'No proporcionado'}
                        </td>
                      </tr>
                      <tr>
                        <td width="28%" style="vertical-align: top; padding-right: 15px; font-size: 14px; font-weight: 600; color: #546182;">Plan de interés:</td>
                        <td style="vertical-align: top; font-size: 15px; font-weight: 500; color: #262d3d; padding-bottom: 5px; border-bottom: 1px solid #eaeef5;">
                          <span style="display: inline-block; background-color: #e9efff; color: #3a36db; padding: 4px 12px; border-radius: 50px; font-size: 13px; font-weight: 600;">${plan}</span>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Mensaje en un contenedor destacado -->
                    <div style="margin-top: 30px; background-color: #f9fafc; border-radius: 8px; padding: 25px; border-left: 4px solid #3a36db;">
                      <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #262d3d;">Mensaje:</h3>
                      <p style="margin: 0; font-size: 15px; line-height: 24px; color: #546182;">${message}</p>
                    </div>
                    
                    <!-- Botón de acción -->
                    <div style="margin-top: 35px; text-align: center;">
                      <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #3a36db 0%, #4c62df 100%); color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 30px; border-radius: 6px; text-align: center;">Responder al contacto</a>
                    </div>
                  </td>
                </tr>
                
                <!-- Información adicional -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <div style="background-color: #f9fafc; border-radius: 8px; padding: 20px; margin-top: 30px;">
                      <p style="margin: 0; font-size: 14px; line-height: 22px; color: #546182;">
                        <strong style="color: #262d3d;">Fecha de recepción:</strong> ${currentDate}<br>
                        <strong style="color: #262d3d;">IP:</strong> ${req.headers.get('x-forwarded-for') || 'No disponible'}<br>
                        <strong style="color: #262d3d;">Fuente:</strong> Formulario de contacto - hero-framer-studio.com
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f2f5fa; padding: 25px 40px; text-align: center; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #546182;">
                      © ${new Date().getFullYear()} Hero&Framer Studio. Todos los derechos reservados.
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #8795af;">
                      <a href="https://hero-framer-studio.com" style="color: #3a36db; text-decoration: none;">hero-framer-studio.com</a>
                      &nbsp;|&nbsp;
                      <a href="https://hero-framer-studio.com/contacto" style="color: #3a36db; text-decoration: none;">Contacto</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    const result = await resend.emails.send({
      from: 'Hero&Framer Studio <info@landingpages.protoly.lat>',
      to: 'criquelme@perceivoai.agency',
      subject: `✨ Nueva solicitud de ${name} - ${plan}`,
      html: emailContent,
    })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}