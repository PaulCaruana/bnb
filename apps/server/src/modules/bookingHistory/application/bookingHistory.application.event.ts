export namespace BookingHistoryApplicationEvent {
  export namespace BookingHistoryCreated {
    export const key = 'bookingHistory.application.bookingHistory.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
