export namespace AccommodationApplicationEvent {
  export namespace AccommodationCreated {
    export const key = 'accommodation.application.accommodation.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
