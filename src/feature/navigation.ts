import { NavigateFunction } from "react-router"

export default class NavigationService {
  private static navigate: NavigateFunction | null = null

  static setNavigate(navigate: NavigateFunction) {
    this.navigate = navigate
  }

  static navigateToLogin() {
    if (this.navigate) {
      this.navigate("/auth/login")
    } else {
      window.location.href = "/auth/login"
    }
  }
}
