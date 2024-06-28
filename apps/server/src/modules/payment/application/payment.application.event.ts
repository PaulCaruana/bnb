export namespace PaymentApplicationEvent {
  export namespace PaymentCreated {
    export const key = 'payment.application.payment.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
