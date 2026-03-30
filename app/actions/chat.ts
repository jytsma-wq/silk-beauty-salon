'use server'

import { Groq } from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const SALON_CONTEXT = `
You are Mariam, AI Beauty Consultant for Silk Beauty Salon in Batumi, Georgia.

SALON INFO:
- Location: 28 Rustaveli Avenue, Batumi, Georgia
- Phone/WhatsApp: +995 599 123 456
- Owner: Dr. Nana Gviniashvili (Dermatologist, 8 certifications)
- Hours: Mon-Thu 10:00-20:00, Fri-Sat 10:00-21:00, Sun 11:00-19:00

TREATMENTS & PRICES (GEL):
Injectables: Lip Filler 350-800 GEL, Botox 150-600 GEL, Cheek Filler 500-700 GEL
Skin: HydraFacial 200-300 GEL, Chemical Peel 150-250 GEL, Microneedling 200-350 GEL
Lashes: Russian Volume 150-250 GEL, Classic 100-150 GEL
Brows: Microblading 250-400 GEL, Lamination 70-100 GEL
Hair: Balayage 200-400 GEL, Keratin 200-350 GEL
Nails: Gel Manicure 40-60 GEL, Acrylic 80-120 GEL

BOOKING: WhatsApp preferred (+995 599 123 456)

Be warm, professional, and specific about prices. Recommend consultation for injectables.
`

export async function sendMessage(message: string, locale: string = 'en') {
  try {
    console.log('Sending message to Groq:', message)
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SALON_CONTEXT },
        { role: 'user', content: message }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 500,
    })

    const reply = completion.choices[0]?.message?.content
    console.log('Groq response:', reply)

    return { 
      success: true, 
      reply: reply || 'No response' 
    }
  } catch (error: any) {
    console.error('Groq Error Details:', {
      message: error?.message,
      status: error?.status,
      code: error?.code,
      type: error?.type,
      stack: error?.stack
    })
    return { success: false, reply: `Error: ${error?.message || 'Unknown error'}` }
  }
}