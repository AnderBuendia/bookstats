export interface NotificationService {
  notifySuccess: ({ message }: { message: string }) => void;
  notifyError: ({ message }: { message: string }) => void;
}
