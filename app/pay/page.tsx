import PaymentClient from "./PaymentClient"

export default function Page({ searchParams }: { searchParams: { amount?: string; ref?: string } }) {
    const amountParam = searchParams?.amount ?? "0"
    const ref = searchParams?.ref ?? "-"

    return <PaymentClient amountParam={amountParam} refParam={ref} />
}
