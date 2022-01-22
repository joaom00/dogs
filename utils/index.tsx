export function messageMapper(message: string) {
  switch (message) {
    case 'Database error saving new user':
      return 'Nome de usuário já existe';
    case 'Invalid login credentials':
      return 'Credenciais Inválidas';
    default:
      return 'Algo deu errado';
  }
}
