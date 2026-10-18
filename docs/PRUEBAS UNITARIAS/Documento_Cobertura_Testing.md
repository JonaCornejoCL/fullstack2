# Documento de Cobertura de Testing - Cafeta TiPum
**Asignatura:** Desarrollo Fullstack II (DSY1104)  
**Framework de Pruebas:** Vitest + React Testing Library + jsdom[cite: 13, 14]  

## 1. Resumen de Pruebas Ejecutadas
Se han implementado y verificado exitosamente **12 pruebas unitarias automatizadas** (superando el estándar de la rúbrica de 10 pruebas)[cite: 60, 62], abarcando componentes clave del frontend, renderizado condicional, manejo de propiedades (props), estados (state), eventos de usuario y reglas de negocio del inventario[cite: 53, 56]:

1. **Saludo.test.jsx (1 prueba):** Valida el renderizado correcto del componente `Saludo` y la recepción de props[cite: 15].
2. **Producto.test.jsx (5 pruebas):** 
   - Comprueba la visualización correcta del nombre y precio del producto[cite: 15, 16].
   - Verifica el stock inicial y la ocultación/aparición condicional de los controles interactivos[cite: 16].
   - Simula la acción del usuario (*user-event*) al añadir al carrito, aumentando cantidades y actualizando el stock disponible en tiempo real[cite: 17].
   - Valida la regla de negocio que impide generar stock negativo[cite: 17].
3. **Login.test.jsx (6 pruebas):**
   - Verifica la existencia del formulario y la correcta asociación entre etiquetas (`label`) e inputs (`id`) para accesibilidad[cite: 18].
   - Simula la escritura en los campos de correo y contraseña evaluando el cambio de estado con `useState`[cite: 19, 20].
   - Comprueba el renderizado condicional de mensajes de error ante credenciales inválidas o contraseñas con longitud insuficiente[cite: 19, 20].

## 2. Análisis de Resultados y Conclusión
Todas las pruebas ejecutadas mediante el comando `npm test` obtuvieron el estado **PASS**, garantizando la robustez del código, la ausencia de regresiones ante futuros cambios y el cumplimiento riguroso de los indicadores de evaluación de la asignatura[cite: 20, 21, 56].