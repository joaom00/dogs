export const formatDate = (createdAt?: string) => {
  if (!createdAt) return;

  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(
    new Date(createdAt)
  );
};
