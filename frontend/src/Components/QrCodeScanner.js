import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');

  const handleScan = (result) => {
    if (result) {
      setScanResult(result?.text || result); // Update the result
    }
  };

  const handleError = (err) => {
    setError(err.message || 'Error occurred while scanning QR code');
  };

  return (
    <div className="qr-scanner-container">
      <h2>QR Code Scanner</h2>

      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result);
          }

          if (!!error) {
            handleError(error);
          }
        }}
        style={{ width: '100%' }}
      />

      <div className="scan-result">
        {scanResult ? (
          <p><strong>Scanned Data:</strong> {scanResult}</p>
        ) : (
          <p>No QR code detected</p>
        )}
      </div>

      {error && <div className="error-message">Error: {error}</div>}
    </div>
  );
};

export default QrCodeScanner;
