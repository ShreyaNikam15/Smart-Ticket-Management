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
    <div style={styles.qrScannerContainer}>
      <h2 style={styles.title}>QR Code Scanner</h2>

      <div style={styles.scannerWrapper}>
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
          style={styles.qrReader}
        />
      </div>

      <div style={styles.scanResult}>
        {scanResult ? (
          <p style={styles.resultText}>
            <strong>Scanned Data:</strong> {scanResult}
          </p>
        ) : (
          <p style={styles.noResultText}>No QR code detected</p>
        )}
      </div>

      {error && <div style={styles.errorMessage}>Error: {error}</div>}
    </div>
  );
};

const styles = {
  qrScannerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '600px',
    margin: '30px auto',
    fontFamily: '"Playfair Display", serif',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#2c3e50',
  },
  scannerWrapper: {
    width: '100%',
    maxWidth: '500px',
    marginBottom: '20px',
    position: 'relative',
    border: '2px solid #2c3e50',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  qrReader: {
    width: '100%',
  },
  scanResult: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#f7f9fa',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
  },
  resultText: {
    color: '#2c3e50',
    fontSize: '18px',
  },
  noResultText: {
    color: '#999',
    fontSize: '18px',
  },
  errorMessage: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
};

export default QrCodeScanner;
