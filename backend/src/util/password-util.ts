export class PasswordUtils {
  public static checkPasswordLength(password: string): boolean {
    const regex = new RegExp('(?=.*[0-9])(?=.*[A-Z]).{8,}');
    return regex.test(password);
  }
}
