import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';
import useAxiosSecur from '../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const applicationId = searchParams.get('applicationId');
  const axiosSecure = useAxiosSecur();
  const navigate = useNavigate();

  // 🎉 Confetti animation
  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
    });
  };

  useEffect(() => {
    if (sessionId && applicationId) {
      axiosSecure
        .get(
          `/payment-success?session_id=${sessionId}&applicationId=${applicationId}`,
        )
        .then(res => {
          if (res.data.success || res.data.message === 'already exists') {
            fireConfetti(); // 🎉 confetti চালু
            Swal.fire({
              icon: 'success',
              title: '🎉 Payment Successful!',
              text: 'Tutor has been approved!',
            }).then(() => navigate('/dashboard/applied-tutors'));
          }
        });
    }
  }, [sessionId, applicationId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-success"></div>
        <p className="mt-4 text-gray-500">Processing your payment...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
