export const convertDateISOToString = (dateISO) => {
  const date = new Date(dateISO);
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};
