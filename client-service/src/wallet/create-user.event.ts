export class CreateUserEvent {
  constructor(public readonly clientData: { document: string; name: string; email: string; phone: string }) {}
}
