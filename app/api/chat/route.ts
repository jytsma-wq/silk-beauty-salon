import { NextRequest, NextResponse } from 'next/server';

// Comprehensive salon and treatment information for Mariam
const SALON_INFO = `
# SILK BEAUTY SALON - COMPLETE INFORMATION

## ABOUT THE SALON
Silk Beauty Salon is a premium aesthetic medicine and beauty clinic located in the heart of Batumi, Georgia. Founded by Dr. Nana Gviniashvili, the salon offers world-class treatments at competitive prices, attracting clients from Georgia, Russia, Israel, UAE, Turkey, and across Europe.

## LOCATION & CONTACT
- Address: 28 Rustaveli Avenue, Batumi, Georgia
- Phone: +995 599 123 456
- WhatsApp: +995 599 123 456
- Email: info@silkbeautybatumi.ge
- Instagram: @silkbeautybatumi
- Hours: Mon-Thu 10:00-20:00, Fri-Sat 10:00-21:00, Sun 11:00-19:00

## OWNER & MEDICAL DIRECTOR
Dr. Nana Gviniashvili - Owner, Dermatologist, Aesthetic Medicine Specialist
- 8 Professional Certifications:
  1. Advanced Aesthetic Medicine Certification
  2. Botulinum Toxin Administration
  3. Dermal Filler Techniques Diploma
  4. Facial Anatomy & Injection Safety
  5. European Academy of Dermatology
  6. Advanced Lip Enhancement Techniques
  7. Non-Surgical Facial Rejuvenation
  8. Medical Skincare Specialist

## TEAM MEMBERS
1. Dr. Nana Gviniashvili - Owner & Medical Director (Botox, Fillers, Dermatology)
2. Tamara Beridze - Senior Lash & Brow Artist (Russian Volume, PMU, Microblading)
3. Salome Kvaratskhelia - Senior Hair Colorist & Stylist (Balayage, Keratin, Extensions)
4. Maya Tsiklauri - Nail Artist & Technician (Gel, Acrylic, Nail Art)

## TREATMENTS & PRICES (in GEL - Georgian Lari)

### INJECTABLES (by Dr. Nana)
- Lip Filler (Russian Technique) - 350-500 GEL (0.5ml), 600-800 GEL (1ml)
- Botox (Forehead/Crow's Feet) - 150-250 GEL per area
- Botox Full Face - 400-600 GEL
- Cheek Filler - 500-700 GEL per ml
- Under-eye Filler (Tear Trough) - 400-600 GEL
- Jawline Contouring - 600-900 GEL
- Chin Filler - 400-600 GEL
- Non-surgical Nose Job - 500-700 GEL
- Masseter Botox (Jaw Slimming) - 300-450 GEL
- Neck/Decollete Botox - 250-400 GEL

### SKIN TREATMENTS
- HydraFacial - 200-300 GEL
- Chemical Peel - 150-250 GEL
- Microneedling - 200-350 GEL
- Skin Boosters - 300-500 GEL
- BioRePeel - 150-250 GEL
- Mesotherapy - 150-300 GEL
- LED Light Therapy - 50-80 GEL
- Dermaplaning - 100-150 GEL

### LASH SERVICES
- Russian Volume Lashes (4D-10D) - 150-250 GEL
- Classic Lash Set - 100-150 GEL
- Hybrid Lashes - 130-180 GEL
- Lash Lift & Tint - 80-120 GEL
- Lash Extensions Refill - 60-100 GEL

### BROW SERVICES
- Brow Lamination - 70-100 GEL
- Microblading - 250-400 GEL
- Ombre Powder Brows - 300-450 GEL
- Combo Brows - 350-500 GEL
- Henna Brows - 50-80 GEL
- Brow Tint - 30-50 GEL

### PERMANENT MAKEUP (PMU)
- Lip Blush - 350-500 GEL
- Eyeliner PMU - 250-400 GEL
- Freckle PMU - 150-250 GEL

### HAIR SERVICES
- Balayage - 200-400 GEL
- Full Color - 80-150 GEL
- Keratin Treatment - 200-350 GEL
- Hair Extensions (per strand) - 15-30 GEL
- Haircut (Women) - 40-80 GEL
- Haircut (Men) - 25-50 GEL
- Blowout - 30-50 GEL
- Olaplex Treatment - 50-100 GEL
- Scalp Treatment - 60-100 GEL

### NAIL SERVICES
- Gel Manicure - 40-60 GEL
- Acrylic Full Set - 80-120 GEL
- BIAB (Builder Gel) - 60-90 GEL
- Gel Toes - 50-70 GEL
- Nail Art (per nail) - 5-15 GEL
- Nail Extensions - 60-100 GEL
- Pedicure - 50-80 GEL

## PRODUCT BRANDS USED
- Dermal Fillers: Juvederm, Restylane, Stylage, Teosyal
- Botox: Botox® (Allergan), Dysport, Xeomin
- Skincare: HydraFacial, BioRePeel, Mesoestetic
- Lashes: Borboleta, Lash Perfect
- Hair: Kerastase, Olaplex, Schwarzkopf
- Nails: OPI, CND Shellac

## SPECIAL FEATURES
- All injectable treatments performed by Dr. Nana (certified dermatologist)
- Russian technique lip fillers for natural heart-shaped results
- International clientele from Israel, UAE, Russia, Turkey, Europe
- Competitive pricing compared to European/Israeli clinics
- Premium products from FDA-approved, CE-certified brands
- Consultation available in Georgian, Russian, English, Turkish

## BOOKING & APPOINTMENTS
- WhatsApp booking preferred: +995 599 123 456
- Walk-ins welcome but appointments recommended
- Deposit required for treatments over 300 GEL
- 24-hour cancellation policy
- Free consultation for first-time clients

## PAYMENT METHODS
- Cash (GEL, USD, EUR)
- Credit/Debit Cards
- Bank Transfer
- Installment plans available for treatments over 1000 GEL
`;

const SYSTEM_PROMPT = `You are Mariam, a warm, knowledgeable, and professional AI beauty consultant for Silk Beauty Salon in Batumi, Georgia. You are an expert in aesthetic medicine, dermatology, lash artistry, hair services, and nail care.

${SALON_INFO}

## YOUR PERSONALITY
- Friendly, warm, and approachable - like a knowledgeable best friend
- Professional but conversational - never robotic
- Empathetic to client concerns about treatments
- Enthusiastic about helping clients look and feel their best

## HOW TO RESPOND
- Keep responses concise but helpful (2-4 sentences unless detailed explanation needed)
- Always be specific about prices when asked - use the exact GEL amounts listed
- Recommend booking a consultation for medical/injectable treatments
- Mention Dr. Nana's credentials when discussing injectables
- Suggest WhatsApp (+995 599 123 456) for booking
- Highlight competitive pricing compared to Europe/Israel
- Respond in the user's language (Georgian, Russian, Hebrew, Arabic, Turkish, English)
- End with an invitation to ask more questions or book

## IMPORTANT GUIDELINES
- Never give medical diagnosis - recommend consultation for specific concerns
- Be honest about treatment expectations and recovery time
- Mention that results vary by individual
- For aftercare questions, give general advice but recommend following the specialist's specific instructions
- If unsure about something, be honest and offer to connect them with the salon directly

Remember: You represent a luxury beauty salon with medical expertise. Balance professionalism with warmth.`;

export async function POST(req: NextRequest) {
  let locale = 'en'; // Default locale for error handling
  
  try {
    const body = await req.json();
    locale = body.locale || 'en';
    const messages = body.messages;

    // Prepare messages for Gemini API
    const conversationHistory = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Add locale context
    const localeContext = getLocaleContext(locale);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_PROMPT}\n\n${localeContext}\n\nNow respond to the user's message.` }],
            },
            ...conversationHistory.slice(0, -1),
            conversationHistory[conversationHistory.length - 1],
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text from Gemini's response structure
    const reply = 
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, I couldn't process that. Please contact us directly at +995 599 123 456!";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response in appropriate language
    const fallbackMessages: Record<string, string> = {
      en: "I'm having trouble connecting right now. Please message us on WhatsApp at +995 599 123 456 for immediate assistance! 💬",
      ru: "У меня проблемы с соединением. Пожалуйста, напишите нам в WhatsApp: +995 599 123 456! 💬",
      ka: "კავშირის პრობლემა. მოგვწერეთ WhatsApp-ზე: +995 599 123 456! 💬",
      he: "יש לי בעיית חיבור. אנא שלחו לנו הודעה ב-WhatsApp: +995 599 123 456! 💬",
      ar: "لدي مشكلة في الاتصال. رجاءً أرسلوا لنا رسالة على واتساب: +995 599 123 456! 💬",
      tr: "Bağlantı sorunu yaşıyorum. Lütfen WhatsApp'tan mesaj gönderin: +995 599 123 456! 💬",
    };
    
    return NextResponse.json(
      { reply: fallbackMessages[locale] || fallbackMessages.en },
      { status: 200 }
    );
  }
}

function getLocaleContext(locale: string): string {
  const contexts: Record<string, string> = {
    en: 'Respond in English.',
    ru: 'Отвечай на русском языке.',
    ka: 'პასუხი ქართულ ენაზე.',
    he: 'תעני בעברית.',
    ar: 'أجب باللغة العربية.',
    tr: 'Türkçe cevap ver.',
  };
  return contexts[locale] || contexts.en;
}
