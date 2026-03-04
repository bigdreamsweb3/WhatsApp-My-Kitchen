"use client"

import { useEffect, useState } from "react"
import { PAYMENT_ACCOUNT, PAYMENT_INSTRUCTIONS, BRAND_NAME, WHATSAPP_BASE_URL } from "../../lib/constants"

export default function PaymentClient({ amountParam, refParam }: { amountParam: string; refParam: string }) {
    const amount = amountParam || "0"
    const ref = refParam || "-"

    const [copied, setCopied] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    const [payerName, setPayerName] = useState("")
    const [payerPhone, setPayerPhone] = useState("")
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        let t: any
        if (copied) t = setTimeout(() => setCopied(false), 1200)
        return () => clearTimeout(t)
    }, [copied])

    async function copyAccount() {
        const text = `${PAYMENT_ACCOUNT.bankName} ${PAYMENT_ACCOUNT.accountNumber} (${PAYMENT_ACCOUNT.accountName})`
        await navigator.clipboard.writeText(text)
        setCopied(true)
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-white">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-black mb-4">Complete Payment</h1>
                <p className="text-sm text-muted-foreground mb-6">Reference: <span className="font-mono">{ref}</span></p>

                <div className="mb-4">
                    <div className="text-sm text-gray-600">Amount</div>
                    <div className="text-3xl font-black text-foreground">₦{Number(amount).toLocaleString()}</div>
                </div>

                <div className="mb-6">
                    <div className="text-sm text-gray-600">Pay to</div>
                    <div className="mt-2 flex items-center gap-3">
                        <div>
                            <div className="font-bold">{PAYMENT_ACCOUNT.accountName}</div>
                            <div className="text-sm text-gray-600">{PAYMENT_ACCOUNT.bankName} — {PAYMENT_ACCOUNT.accountNumber}</div>
                        </div>
                        <button onClick={copyAccount} className="ml-auto px-3 py-2 bg-primary text-primary-foreground rounded">{copied ? 'Copied' : 'Copy'}</button>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{PAYMENT_INSTRUCTIONS}</p>

                <div className="flex gap-3">
                    <a href="/" className="px-4 py-2 border rounded">Return to site</a>
                    <button onClick={() => setShowUpload(true)} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded">I paid — confirm</button>
                </div>

                {showUpload && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            setSubmitting(true)
                            try {
                                const message = `Hello ${BRAND_NAME}!\n\nPayment confirmation for reference: ${ref}\nAmount: ₦${Number(amount).toLocaleString()}\nPayer: ${payerName || "-"}\nPhone: ${payerPhone || "-"}\n\n(Please request the payment screenshot from the customer if needed.)`
                                window.open(`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`, "_blank")
                                setShowUpload(false)
                            } catch (err: any) {
                                alert("Failed to open WhatsApp: " + (err?.message || String(err)))
                            } finally {
                                setSubmitting(false)
                            }
                        }}
                        className="mt-6 space-y-3"
                    >
                        <div>
                            <label className="text-sm">Your name (optional)</label>
                            <input value={payerName} onChange={(e) => setPayerName(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded" />
                        </div>
                        <div>
                            <label className="text-sm">Phone (optional)</label>
                            <input value={payerPhone} onChange={(e) => setPayerPhone(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded" />
                        </div>

                        <div className="flex gap-2">
                            <button disabled={submitting} type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Send confirmation via WhatsApp</button>
                            <button type="button" onClick={() => setShowUpload(false)} className="px-4 py-2 border rounded">Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    )
}
