import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseName, amount, userInfo } = location.state || {};

  const handleMarkAsPaid = async () => {
    console.log('Payment button clicked!');
    
    try {
      const res = await axios.post('https://trading-server-ten.vercel.app/api/payments/add', {
        userName: userInfo?.name || 'Unknown User',
        courseName: courseName || 'Unknown Course',
        amount,
        paymentStatus: 'Paid',
        userPhone: userInfo?.phone,
        userEmail: userInfo?.email
      });

      alert('✅ Payment recorded successfully!');
      navigate('/course');
    } catch (err) {
      console.error('❌ Payment error:', err);
      alert('❌ Something went wrong while recording the payment.');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#111827', 
      color: 'white', 
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1
    }}>
      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        backgroundColor: '#1f2937', 
        padding: '30px', 
        borderRadius: '10px',
        position: 'relative',
        zIndex: 2
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Course Payment</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <p>👤 Student: {userInfo?.name || 'Unknown'}</p>
          <p>📘 Course: {courseName || 'Unknown'}</p>
          <p>💰 Amount: ₹{amount || 0}</p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img 
            src="/QR-Code.jpg" 
            alt="QR Code" 
            style={{ width: '200px', height: '200px', border: '1px solid #ccc' }}
          />
          <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '10px' }}>
            📸 Scan this QR to pay
          </p>
        </div>

        <button 
          onClick={handleMarkAsPaid}
          onMouseEnter={() => console.log('Button hover!')}
          style={{
            width: '100%',
            backgroundColor: '#059669',
            color: 'white',
            padding: '15px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '20px',
            position: 'relative',
            zIndex: 999,
            pointerEvents: 'auto',
            userSelect: 'none',
            outline: 'none'
          }}
          type="button"
        >
          ✅ I have paid
        </button>
        <p>"If you have completed the payment, kindly send a screenshot as confirmation of your registration."</p>
        {/* Debug button */}
        
      </div>
    </div>
  );
};

export default Payment; // ✅ This line is crucial!