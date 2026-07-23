import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const applicationId = searchParams.get('applicationId');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId && applicationId) {
      axiosSecure
        .get(
          `/payment-success?session_id=${sessionId}&applicationId=${applicationId}`,
        )
        .then(res => {
          if (res.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful!',
              text: 'Tutor has been approved!',
            }).then(() => navigate('/dashboard/applied-tutors'));
          }
        });
    }
  }, [sessionId, applicationId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-success"></div>
        <p className="mt-4 text-gray-500">Processing your payment...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
