// Validación de datos
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const nombre = form.elements.nombre.value.trim();
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value.trim();
  if (nombre === '' || email === '' || password === '') {
    alert('Por favor, complete todos los campos');
    return;
  }
  if (!isValidEmail(email)) {
    alert('Por favor, introduzca una dirección de correo electrónico válida');
    return;
  }
  // Verificar si los datos ya existen en LocalStorage
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const existeRegistro = registros.some(registro => registro.email === email);
  if (existeRegistro) {
    alert('Ya existe una cuenta con este correo electrónico');
    return;
  }
  // Si todos los campos están completos, el email es válido y no existe en LocalStorage, se guarda en LocalStorage
  guardarEnLocalStorage({ nombre, email, password });
  alert('Registro exitoso!');
  form.reset();
  redirigirAInicio();
});

// Función para redirigir al usuario a la página de inicio
function redirigirAInicio() {
  window.location.href = "index.html";
}

// Función para validar el email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función para guardar datos en LocalStorage
function guardarEnLocalStorage(datos) {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.push(datos);
  localStorage.setItem('registros', JSON.stringify(registros));
}

// Manipulación del DOM
const circle1 = document.querySelector('.circle-1');
const circle2 = document.querySelector('.circle-2');
const circle3 = document.querySelector('.circle-3');

// Evento de click en el botón de Crear Cuenta
const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
  circle1.classList.add('active');
  circle2.classList.add('active');
  circle3.classList.add('active');
});

// Función para obtener y mostrar datos de LocalStorage en el DOM
function mostrarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const ul = document.createElement('ul');
  registros.forEach(registro => {
    const li = document.createElement('li');
    li.textContent = `Nombre: ${registro.nombre}, Email: ${registro.email}, Contraseña: ${registro.password}`;
    ul.appendChild(li);
  });
  const form = document.querySelector('.form');
  form.appendChild(ul);
}