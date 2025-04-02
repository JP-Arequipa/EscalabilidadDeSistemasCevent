export class messageOfRequest {
  static logCompletionMessage(): void {
    console.log('Please complete all fields before submitting');
  }

  static logEventCreationError(response: any): void {
    console.error('Error creating the event:', response);
  }

  static logUnexpectedError(error: any): void {
    console.error('Unexpected error creating the event:', error);
  }
}
