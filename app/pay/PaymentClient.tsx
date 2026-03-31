"use client"

import { useEffect, useState } from "react"
import {
  BRAND_NAME,
  PAYMENT_ACCOUNT,
  PAYMENT_INSTRUCTIONS,
  WHATSAPP_BASE_URL,
} from "../../lib/constants"

export default function PaymentClient({
  amountParam,
  refParam,
}: {
  amountParam?: string
  refParam?: string
}) {
  const [amount, setAmount] = useState(amountParam ?? "0")
  const [ref, setRef] = useState(refParam ?? "-")
  const [copied, setCopied] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [payerName, setPayerName] = useState("")
  const [payerPhone, setPayerPhone] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const formattedAmount = `\u20A6${Number(amount || 0).toLocaleString()}`

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    if (copied) {
      timeoutId = setTimeout(() => setCopied(false), 1200)
    }

    return () => clearTimeout(timeoutId)
  }, [copied])

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const nextAmount = params.get("amount")
      const nextRef = params.get("ref")

      if (nextAmount) setAmount(nextAmount)
      if (nextRef) setRef(nextRef)
    } catch {
      // Ignore non-browser environments.
    }
  }, [])

  async function copyAccount() {
    const text = PAYMENT_ACCOUNT.accountNumber

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()

      try {
        document.execCommand("copy")
        setCopied(true)
      } catch {
        // Ignore unsupported fallback copy failures.
      }

      textarea.remove()
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] p-6 text-[var(--color-foreground)]">
      <div className="w-full max-w-xl rounded-2xl bg-[var(--color-card)] p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-black">Complete Payment</h1>
        <p className="mb-6 text-sm text-[var(--color-muted-foreground)]">
          Reference: <span className="font-mono">{ref}</span>
        </p>

        <div className="mb-4">
          <div className="text-sm text-[var(--color-muted-foreground)]">Amount</div>
          <div className="text-3xl font-black text-[var(--color-foreground)]">
            {formattedAmount}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-[var(--color-muted-foreground)]">Pay to</div>
          <div className="mt-2 flex items-center gap-3">
            <div>
              <div className="font-bold">{PAYMENT_ACCOUNT.accountName}</div>
              <div className="text-sm text-[var(--color-muted-foreground)]">
                {PAYMENT_ACCOUNT.bankName} -{" "}
                <span className="font-mono">{PAYMENT_ACCOUNT.accountNumber}</span>
              </div>
            </div>
            <button
              onClick={copyAccount}
              className="ml-auto rounded bg-[var(--color-primary)] px-3 py-2 text-[var(--color-primary-foreground)]"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <p className="mb-4 text-sm text-[var(--color-muted-foreground)]">
          {PAYMENT_INSTRUCTIONS}
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="/" className="rounded border bg-transparent px-4 py-2">
            Return to site
          </a>
          <button
            onClick={() => setShowUpload(true)}
            className="rounded bg-brand-whatsapp px-4 py-2 text-white hover:bg-brand-whatsapp-hover"
          >
            I paid - confirm
          </button>
        </div>

        {showUpload && (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitting(true)

              try {
                const message =
                  `Hello ${BRAND_NAME}!\n\n` +
                  `Payment confirmation for reference: ${ref}\n` +
                  `Amount: ${formattedAmount}\n` +
                  `Payer: ${payerName || "-"}\n` +
                  `Phone: ${payerPhone || "-"}\n\n` +
                  "(Please request the payment screenshot from the customer if needed.)"

                window.open(
                  `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`,
                  "_blank",
                )
                setShowUpload(false)
              } catch (error: any) {
                alert("Failed to open WhatsApp: " + (error?.message || String(error)))
              } finally {
                setSubmitting(false)
              }
            }}
            className="mt-6 space-y-3"
          >
            <div>
              <label className="text-sm">Your name (optional)</label>
              <input
                value={payerName}
                onChange={(event) => setPayerName(event.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm">Phone (optional)</label>
              <input
                value={payerPhone}
                onChange={(event) => setPayerPhone(event.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                disabled={submitting}
                type="submit"
                className="rounded bg-green-600 px-4 py-2 text-white"
              >
                Send confirmation via WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="rounded border px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
