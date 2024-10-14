import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makePayment, confirmPayment } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MakePayment = () => {
  const { register, handleSubmit, reset } = useForm();
  const [sessionId, setSessionId] = useState('');
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingConfir, setLoadingConfir] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoadingPay(true);
      const response = await makePayment(data);
      setSessionId(response.data.sessionId);
      toast.success('Compra iniciada, verifica tu correo para el código');
      reset();
    } catch (error) {
      toast.error('Error en la compra');
    } finally {
      setLoadingPay(false);
    }
  };

  const onConfirm = async (data: any) => {
    try {
      setLoadingConfir(true);
      await confirmPayment({ ...data, sessionId });
      toast.success('Compra confirmada');
      setSessionId('');
      reset();
    } catch (error) {
      toast.error('Error al confirmar la compra');
    } finally {
      setLoadingConfir(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Hacer Compra</h2>

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
          <label className="block text-sm font-medium text-gray-600">Monto de compra</label>
          <input
            {...register('amount')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Monto"
            required
          />
        </div>
        <button
          type="submit"
          className='w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center'
          disabled={loadingPay}
        >
           {loadingPay ? (
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
            'Pagar'
          )}
        </button>
      </form>

      {sessionId && (
        <form onSubmit={handleSubmit(onConfirm)} className="mt-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Confirmar Pago</h2>
          <div>
            <label className="block text-sm font-medium text-gray-600">Token de confirmación</label>
            <input
              {...register('token')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Token de confirmación"
              required
            />
          </div>
          <button
            type="submit"
            className='w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-centerw-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center'
            disabled={loadingConfir}
          >
          {loadingConfir ? (
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
            'Confirmar'
          )}
          </button>
        </form>
      )}
    </div>
  );
};

export default MakePayment;
