export class Chat {
  public chatClass: string;
  public imagePath: string;
  public time: string;
  public messages: string[];

  constructor(
    chatClass: string,
    imagePath: string,
    time: string,
    messages: string[]
  ) {
    this.chatClass = chatClass;
    this.imagePath = imagePath;
    this.time = time;
    this.messages = messages;
  }
}
