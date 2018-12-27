export function currencyStyle(amount) {
  var re = /\d(?=(\d{3})+\.)/g;
  return String(Number(amount).toFixed(2)).replace(new RegExp(re, 'g'), '$&,');
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function dateISO2Local(isoDate) {
  var date = new Date(isoDate);
  // var options = {};
  // return d.toLocaleString();
  var monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct',
    'Nov', 'Dec'
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  var hours = date.getHours();
  var mins = date.getMinutes();

  var ampm = 'AM';
  if (hours > 12) {
    ampm = 'PM';
    hours -= 12;
  } else if (hours === 12) {
    ampm = 'PM';
  }

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (mins < 10) {
    mins = '0' + mins;
  }

  return monthNames[monthIndex] + ' ' + day + ', ' + year + ' - ' + hours + ':' + mins + ' ' + ampm;
}

export function stateToDisplay(state) {
  switch ((state || '').toLowerCase()) {
    case 'all':
      return 'All';
    case 'approved':
      return 'Approved';
    case 'archived':
      return 'Archived';
    case 'fundable':
      return 'Available for Funding';
    case 'funded':
      return 'Funded';
    case 'paid':
      return 'Paid';
    case 'past_due':
      return 'Not Eligible';
    case 'processing':
      return 'Processing';
    case 'rejected':
      return 'Rejected';
    case 'sent_to_payor':
      return 'Sent';
    default:
      console.log('unknown state', state)
      return 'Unknown';
  }
}

export function eventToDisplay(invoiceEvent) {
  let eventLower = invoiceEvent.toLowerCase();
  let eventDisplay = 'Unknown';

  switch (eventLower) {
    case 'invoice_creation_completed':
      eventDisplay = 'Creation Completed';
      break;
    case 'invoice_payment_overdue':
      eventDisplay = 'Payment Overdue';
      break;
    case 'invoice_payor_informed':
      eventDisplay = 'Payor Informed';
      break;
    case 'invoice_source_removed':
      eventDisplay = 'Invoice Not Present in Source';
      break;
    case 'invoice_verification_accepted':
      eventDisplay = 'Invoice Accepted by Payor';
      break;
    case 'invoice_verification_approved':
      eventDisplay = 'Invoice Accepted by Admin';
      break;
    case 'invoice_verification_delayed':
      eventDisplay = 'Verification Delayed';
      break;
    case 'invoice_verification_disputed':
      eventDisplay = 'Invoice Disputed by Payor';
      break;
    case 'invoice_verification_rejected':
      eventDisplay = 'Invoice Rejected by Admin';
      break;
    case 'invoice_verification_requested':
      eventDisplay = 'Payor Verification Requested';
      break;
  }

  return eventDisplay;
}

export function checkAuth() {
  if (!localStorage.token) {
    return false;
  }

  return true;
}

export function checkAdminAuth() {
  if (!localStorage.adminToken) {
    return false;
  }

  return true;
}
