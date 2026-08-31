/**
REQ-01 · Modelo de libro
Crear la estructura de datos que represente un libro utilizando TypeScript.

El libro deberá contener como mínimo:

id
title
author
year
Criterios de aceptación:

Existe una interfaz o tipo Book.
Las propiedades tienen tipos explícitos.
El código compila correctamente con TypeScript.
 */
export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

/**
 * Datos necesarios para crear un libro. No incluye `id` porque el `id`
 * lo genera la capa de persistencia (Repository), no el cliente.
 */
export type CreateBookDTO = {
  title: string;
  author: string;
  year: number;
};

/**
 * Datos aceptados para una actualización parcial (REQ-07).
 * Todas las propiedades son opcionales: el cliente solo envía lo que
 * quiere cambiar.
 */
export type UpdateBookDTO = Partial<CreateBookDTO>;

/**
 * Filtros soportados por la búsqueda mediante query params (REQ-08).
 */
export type BookFilters = {
  author?: string;
  title?: string;
  year?: number;
};
