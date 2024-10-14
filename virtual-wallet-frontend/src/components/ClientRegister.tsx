import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerClient } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientRegister = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false); // Estado de carga

  const onSubmit = async (data: any) => {
    setLoading(true); // Inicia el estado de carga
    try {
      await registerClient(data);
      toast.success('Cliente registrado exitosamente'); // Toast de éxito
      reset();
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message || 'Error al registrar cliente'); // Toast de error
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Registro de Cliente</h2>
      
      {/* Toast Container para mostrar los toasts */}
      <ToastContainer />

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
          <label className="block text-sm font-medium text-gray-600">Nombre Completo</label>
          <input
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Nombre completo"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Email"
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
        
        {/* Botón con spinner de carga */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center"
          disabled={loading} // Deshabilitar el botón cuando está cargando
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
            'Registrar'
          )}
        </button>
      </form>
    </div>
  );
};

export default ClientRegister;
