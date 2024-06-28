export namespace AvailabilityApplicationEvent {
  export namespace AvailabilityCreated {
    export const key = 'availability.application.availability.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
