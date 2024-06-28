export namespace ContactApplicationEvent {
  export namespace ContactCreated {
    export const key = 'contact.application.contact.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
