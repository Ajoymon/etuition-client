import { useNavigate } from 'react-router';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md w-full">
        {/* Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">❌</span>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-red-500 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-500 mb-8">
          Your payment was cancelled. No charges were made.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary w-full"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/dashboard/applied-tutors')}
            className="btn btn-outline w-full"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
