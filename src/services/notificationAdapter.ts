import toast from 'react-hot-toast';
import type { NotificationService } from '@Interfaces/ports/notification.interface';

export function useNotifier(): NotificationService {
  const notifySuccess = ({ message }: { message: string }) => {
    toast.success(message, {
      style: {
        padding: '10px',
        border: '1px solid darkgreen',
        background: '#cfffc4',
        color: 'darkgreen',
        fontSize: '16px',
        borderRadius: '50px',
      },
      iconTheme: {
        primary: 'darkgreen',
        secondary: '#fff',
      },
    });
  };

  const notifyError = ({ message }: { message: string }) => {
    toast.error(message, {
      style: {
        padding: '10px',
        border: '1px solid darkred',
        background: '#ffd3d3',
        color: 'darkred',
        fontSize: '16px',
        borderRadius: '50px',
      },
      iconTheme: {
        primary: 'darkred',
        secondary: '#fff',
      },
    });
  };

  return { notifySuccess, notifyError };
}
