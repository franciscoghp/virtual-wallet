import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { rechargeWallet } from '../services/api'; // Asegúrate de tener este servicio definido
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WalletRecharge = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true); // Comienza la carga
    try {
      await rechargeWallet(data); // Llama a la API para la recarga
      toast.success('Recarga exitosa');
      reset(); // Resetea el formulario
    } catch (error) {
      toast.error('Error en la recarga');
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Recargar Billetera</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Documento</label>
          <input
            {...register('document')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Documento"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Celular</label>
          <input
            {...register('phone')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Celular"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Monto</label>
          <input
            {...register('amount')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Monto"
            required
          />
        </div>

        {/* Botón deshabilitado mientras está cargando */}
        <button
          type="submit"
          className={"w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center"}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
              ></path>
            </svg>
          ) : (
            'Recargar'
          )}
        </button>
      </form>

      {/* Contenedor para los mensajes toast */}
      <ToastContainer />
    </div>
  );
};

export default WalletRecharge;
