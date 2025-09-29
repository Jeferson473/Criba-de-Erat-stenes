import React, { useState, useEffect } from 'react';

const CribaEratostenes = () => {
  const [rango, setRango] = useState(50);
  const [numeros, setNumeros] = useState([]);
  const [numerosPrimos, setNumerosPrimos] = useState([]);
  const [mostrarPasos, setMostrarPasos] = useState(false);

  // Función para obtener el color según las reglas
  const obtenerColor = (num) => {
    if (num === 1) return 'bg-blue-400'; // Azul para el 1
    if (num > 2 && num % 2 === 0) return 'bg-red-400'; // Rojo para múltiplos de 2
    if (num > 3 && num % 3 === 0) return 'bg-orange-400'; // Anaranjado para múltiplos de 3
    if (num > 5 && num % 5 === 0) return 'bg-yellow-400'; // Amarillo para múltiplos de 5
    if (num > 7 && num % 7 === 0) return 'bg-green-400'; // Verde para múltiplos de 7
    return 'bg-white border-2 border-blue-500 text-blue-700 font-bold'; // Sin pintar (primos)
  };

  // Función para obtener el texto del color
  const obtenerTextoColor = (num) => {
    if (num === 1) return 'Azul (número 1)';
    if (num > 2 && num % 2 === 0) return 'Rojo (múltiplo de 2)';
    if (num > 3 && num % 3 === 0) return 'Anaranjado (múltiplo de 3)';
    if (num > 5 && num % 5 === 0) return 'Amarillo (múltiplo de 5)';
    if (num > 7 && num % 7 === 0) return 'Verde (múltiplo de 7)';
    return 'Sin pintar (PRIMO)';
  };

  // Aplicar la criba según las reglas del documento
  useEffect(() => {
    const numerosArray = [];
    const primos = [];

    for (let i = 1; i <= rango; i++) {
      const color = obtenerColor(i);
      numerosArray.push({ numero: i, color });
      
      // Si no está pintado (excepto el 1), es primo
      if (color.includes('bg-white') && i !== 1) {
        primos.push(i);
      }
    }

    setNumeros(numerosArray);
    setNumerosPrimos(primos);
  }, [rango]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        Criba de Eratóstenes
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Encuentra números primos siguiendo el método del matemático griego Eratóstenes
      </p>

      {/* Controles */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <label className="font-semibold">Rango (1 hasta):</label>
          <input
            type="number"
            value={rango}
            onChange={(e) => setRango(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="200"
            className="border rounded px-3 py-2 w-20"
          />
          <button
            onClick={() => setMostrarPasos(!mostrarPasos)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {mostrarPasos ? 'Ocultar' : 'Mostrar'} Reglas
          </button>
        </div>

        {/* Reglas del algoritmo */}
        {mostrarPasos && (
          <div className="bg-gray-100 rounded p-4 mb-4">
            <h3 className="font-bold mb-2">Pasos de la Criba de Eratóstenes:</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-400 rounded"></span>
                Pinta con color azul el número 1
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-400 rounded"></span>
                Pinta con color rojo los múltiplos de 2 (menos el 2)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 bg-orange-400 rounded"></span>
                Pinta con color anaranjado los múltiplos de 3 (menos el 3)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 bg-yellow-400 rounded"></span>
                Pinta con color amarillo los múltiplos de 5 (menos el 5)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-400 rounded"></span>
                Pinta con color verde los múltiplos de 7 (menos el 7)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 bg-white border-2 border-blue-500 rounded"></span>
                Los números que no se pintaron son los números primos
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Resultado de números primos */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-3 text-green-700">
          Números Primos Encontrados ({numerosPrimos.length}):
        </h2>
        <div className="bg-green-50 p-4 rounded border">
          <p className="text-lg font-mono">
            {numerosPrimos.length > 0 ? numerosPrimos.join(', ') : 'Ninguno en este rango'}
          </p>
        </div>
      </div>

      {/* Tabla de números */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Tabla de Números (1 - {rango})</h2>
        <div className="grid grid-cols-10 gap-1 mb-4">
          {numeros.map(({ numero, color }) => (
            <div
              key={numero}
              className={`${color} w-12 h-12 flex items-center justify-center text-sm font-semibold rounded shadow-sm hover:scale-105 transition-transform cursor-pointer`}
              title={`${numero}: ${obtenerTextoColor(numero)}`}
            >
              {numero}
            </div>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 mt-4">
          <p><strong>Instrucciones:</strong> Pasa el cursor sobre cualquier número para ver su clasificación</p>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 rounded-lg p-4 mt-6">
        <h3 className="font-bold text-blue-800 mb-2">¿Qué es la Criba de Eratóstenes?</h3>
        <p className="text-blue-700 text-sm">
          Es un algoritmo creado por el matemático griego Eratóstenes para encontrar todos los números primos 
          hasta un límite dado. El método consiste en ir eliminando (pintando) los múltiplos de cada número primo, 
          comenzando por el 2. Los números que quedan sin pintar son los números primos.
        </p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CribaEratostenes />
    </div>
  );
}

export default App;