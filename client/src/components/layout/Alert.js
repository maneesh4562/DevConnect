import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    <div className="fixed top-20 right-4 z-50 w-80">
      {alerts.length > 0 &&
        alerts.map(alert => (
          <div
            key={alert.id}
            className={`mb-4 p-4 rounded-md shadow-md ${alert.type === 'danger' ? 'bg-red-100 text-red-700 border-l-4 border-red-500' : 
              alert.type === 'success' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 
              'bg-blue-100 text-blue-700 border-l-4 border-blue-500'}`}
          >
            <div className="flex items-center">
              {alert.type === 'danger' && (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {alert.type === 'success' && (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <p>{alert.msg}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Alert;