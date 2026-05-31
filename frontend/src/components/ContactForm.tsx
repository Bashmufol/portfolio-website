import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { submitContact } from '../lib/api'
import { Button } from './Button'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  subject: z.string().min(1, 'Subject is required').max(150),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be at most 2000 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const inputClasses =
  'w-full rounded-lg border border-slate-border bg-slate-muted/50 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 transition-colors focus:border-copper/50 focus:outline-none focus:ring-1 focus:ring-copper/30'

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle')
    try {
      const response = await submitContact(data)
      setSubmitStatus('success')
      setStatusMessage(response.message)
      reset()
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="glass flex flex-col items-center rounded-xl p-10 text-center">
        <CheckCircle2 size={48} className="mb-4 text-teal-glow" />
        <h3 className="text-xl font-semibold text-white">Message Sent</h3>
        <p className="mt-2 max-w-sm text-slate-400">{statusMessage}</p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setSubmitStatus('idle')}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass space-y-5 rounded-xl p-6 md:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
            Name
          </label>
          <input id="name" type="text" className={inputClasses} {...register('name')} />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>
          <input id="email" type="email" className={inputClasses} {...register('email')} />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-300">
          Subject
        </label>
        <input id="subject" type="text" className={inputClasses} {...register('subject')} />
        {errors.subject && (
          <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${inputClasses} resize-y`}
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      {submitStatus === 'error' && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {statusMessage}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
