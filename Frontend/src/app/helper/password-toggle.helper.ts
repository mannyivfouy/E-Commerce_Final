export class PasswordToggleHelper {
  showPassword: boolean = false;

  toggle(): void {
    this.showPassword = !this.showPassword;
  }

  getType(): 'text' | 'password' {
    return this.showPassword ? 'text' : 'password';
  }
}
