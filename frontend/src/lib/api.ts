export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactSuccessResponse {
  message: string
}

function normalizeFormspreeId(raw: string | undefined): string | undefined {
  if (!raw?.trim()) return undefined

  const value = raw.trim()

  // Accept full URL or path: https://formspree.io/f/abc123 → abc123
  const fromUrl = value.match(/formspree\.io\/f\/([a-zA-Z0-9]+)/)?.[1]
  if (fromUrl) return fromUrl

  // Plain form ID only
  if (/^[a-zA-Z0-9]+$/.test(value)) return value

  return undefined
}

function getFormspreeEndpoint(): string {
  const formId = normalizeFormspreeId(import.meta.env.VITE_FORMSPREE_FORM_ID)

  if (!formId) {
    throw new Error(
      'Contact form is not configured. Add VITE_FORMSPREE_FORM_ID to frontend/.env (form ID only, e.g. hjsdsdsu), then restart the dev server (npm run dev).',
    )
  }

  return `https://formspree.io/f/${formId}`
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactSuccessResponse> {
  const response = await fetch(getFormspreeEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      _replyto: payload.email,
      _subject: `[Portfolio Contact] ${payload.subject}`,
      subject: payload.subject,
      message: payload.message,
    }),
  })

  const data = (await response.json().catch(() => ({}))) as {
    ok?: boolean
    error?: string
    errors?: { message?: string; code?: string }[]
  }

  if (!response.ok) {
    const fieldError = data.errors?.[0]?.message
    throw new Error(fieldError ?? data.error ?? 'Failed to send message. Please try again.')
  }

  return {
    message: 'Thank you for reaching out. I will get back to you soon.',
  }
}
