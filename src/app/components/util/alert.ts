import Swal from 'sweetalert2';

export class Alert {
  static success(titulo: string) {
    Swal.fire(titulo, '', 'success');
  }

  static warning(titulo: string) {
    Swal.fire(titulo, '', 'warning');
  }

  static error(titulo: string, message?: string) {
    Swal.fire(titulo, message, 'error');
  }
}
