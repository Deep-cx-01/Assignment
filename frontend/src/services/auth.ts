// Simple authentication service for demo purposes
// In a real application, this would integrate with your backend auth system

interface User {
  id: string;
  username: string;
  email: string;
}

class AuthService {
  private currentUser: User | null = null;
  private token: string | null = null;

  constructor() {
    // Check for existing token in localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      this.token = storedToken;
      this.currentUser = JSON.parse(storedUser);
    }
  }

  // Mock login function - in real app, this would call your backend
  async login(email: string, _password: string): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app, this would come from your backend
    const mockUser: User = {
      id: 'user-123',
      username: email.split('@')[0],
      email: email
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    this.currentUser = mockUser;
    this.token = mockToken;
    
    // Store in localStorage
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return mockUser;
  }

  // Mock logout function
  logout(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Get auth token
  getToken(): string | null {
    return this.token;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.token !== null;
  }

  // Auto-login for demo purposes
  autoLogin(): User {
    if (!this.isAuthenticated()) {
      const mockUser: User = {
        id: 'demo-user-123',
        username: 'DemoUser',
        email: 'demo@example.com'
      };
      
      const mockToken = 'demo-jwt-token';
      
      this.currentUser = mockUser;
      this.token = mockToken;
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
    
    return this.currentUser!;
  }
}

export const authService = new AuthService();
export default authService; 