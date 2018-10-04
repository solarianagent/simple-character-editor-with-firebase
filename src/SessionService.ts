class SessionService {
  private userId: string;

  public setUserId(userId:string) {
    this.userId = userId;
  }

  public getUserId(): string {
    return this.userId;
  }
}

export default new SessionService();