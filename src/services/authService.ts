import type { User } from '../types';

export interface DBUser extends User {
  password?: string;
}

class AuthService {
  private getUsers(): DBUser[] {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch (e) {
      console.error('Error reading users from localStorage:', e);
      return [];
    }
  }

  private saveUsers(users: DBUser[]): void {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to localStorage:', e);
    }
  }

  /**
   * Checks if an email is registered in the database.
   */
  public emailExists(email: string): boolean {
    const users = this.getUsers();
    return users.some(u => u.email.toLowerCase() === email.toLowerCase());
  }

  /**
   * Validates user credentials.
   * Returns the user object if valid, or null otherwise.
   */
  public validateCredentials(email: string, passwordField: string): DBUser | null {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;
    
    // If user has a password set, enforce check
    if (user.password && user.password !== passwordField) {
      return null;
    }
    return user;
  }

  /**
   * Registers a new user with an optional password.
   */
  public registerUser(name: string, email: string, passwordField?: string): DBUser {
    const users = this.getUsers();
    
    // Return existing user if already present (auto-registration behavior)
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (passwordField && !existing.password) {
        existing.password = passwordField;
        this.saveUsers(users);
      }
      return existing;
    }

    const newUser: DBUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password: passwordField
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  /**
   * Updates a user's password.
   */
  public updatePassword(email: string, newPassword: string): boolean {
    const users = this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index === -1) return false;

    users[index].password = newPassword;
    this.saveUsers(users);
    return true;
  }

  /**
   * Auto-seeds Milton Manuel account for testing
   */
  public seedTestUser(): void {
    const email = 'miltonmanuel222@gmail.com';
    if (!this.emailExists(email)) {
      this.registerUser('Milton Manuel', email, '123456');
    }
  }

  /**
   * Sends a real recovery email using EmailJS service API,
   * falling back to FormSubmit if EmailJS is not configured.
   */
  public async sendRecoveryEmail(email: string, code: string): Promise<boolean> {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const isEmailJSConfigured = 
      publicKey && 
      publicKey !== 'YOUR_PUBLIC_KEY' && 
      publicKey !== 'your_public_key_here' && 
      serviceId && 
      serviceId !== 'service_default' && 
      serviceId !== 'your_service_id_here' &&
      templateId && 
      templateId !== 'template_default' && 
      templateId !== 'your_template_id_here';

    if (isEmailJSConfigured) {
      console.log('Tentando enviar email de recuperação via EmailJS...');
      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_email: email,
              to_name: email.split('@')[0],
              recovery_code: code,
              project_name: 'Kalandula Learning'
            },
          }),
        });

        if (response.ok) {
          console.log('Email enviado com sucesso via EmailJS.');
          return true;
        }
        
        const errText = await response.text();
        console.error('Erro de envio via EmailJS:', errText);
      } catch (error) {
        console.error('Falha ao enviar email via EmailJS:', error);
      }
      console.log('Tentando enviar email via FormSubmit fallback...');
    } else {
      console.log('EmailJS não configurado ou chaves padrão detectadas. Enviando via FormSubmit...');
    }

    // Fallback to FormSubmit (free, zero-config dynamic email relay)
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'Código de Recuperação - Kalandula Learning',
          _honey: '',
          message: `Olá!\n\nO seu código de recuperação de senha para o Kalandula Learning é: ${code}\n\nIntroduza este código na plataforma para redefinir a sua senha.\n\nAtenciosamente,\nEquipa Kalandula Learning`,
        }),
      });

      if (response.ok) {
        console.log('Email de recuperação enviado com sucesso via FormSubmit.');
        return true;
      }
      const errText = await response.text();
      console.error('Erro de envio via FormSubmit:', errText);
      return false;
    } catch (error) {
      console.error('Falha ao enviar email via FormSubmit:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
