export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactSuccessResponse {
  message: string
}

export interface ContactErrorResponse {
  message: string
  errors?: Record<string, string>
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactSuccessResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as ContactSuccessResponse | ContactErrorResponse

  if (!response.ok) {
    const error = data as ContactErrorResponse
    if (error.errors) {
      const firstError = Object.values(error.errors)[0]
      throw new Error(firstError ?? error.message)
    }
    throw new Error(error.message ?? 'Failed to send message')
  }

  return data as ContactSuccessResponse
}
