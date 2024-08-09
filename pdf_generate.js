document.getElementById('generate-pdf').addEventListener('click', function() {
  console.log("Generate PDF button clicked");
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(30);
  doc.text('INVOICE', 80, 20);

  // Company details
  doc.setFontSize(16);
  doc.setTextColor(27, 62, 152);
  doc.text('Iconicpages IT Solution', 20, 40);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text('Plot 21 Chikhali Rd, Amar Nagar, Manewada, Nagpur, MH 440031', 20, 50);
  doc.text('Phone No.:+91 8087744220, +91 7038214873', 20, 45);
  doc.text('Email: info@iconicpages.com, hitesh.bhagwat@iconicpages.com', 20, 55);
  doc.text('Website: www.iconicpages.com', 20, 60);

  // Client details

  const companyName = $('#company-name').val();
  const clientName = $('#client-name').val();
  const clientNumber = $('#client-number').val();
  const clientEmail = $('#client-email').val();
  const invoiceNumber = $('#invoice-number').val();
  const invoiceDate = $('#invoice-date').val();

  if (!invoiceDate) {
    alert("Please enter the invoice date.");
    return;
  }

  const dueDate = new Date(invoiceDate);
  dueDate.setDate(dueDate.getDate() + 14);

  doc.text('BILL TO', 20, 70);
  doc.text('Company Name: ' + companyName, 20, 80);
  doc.text('Client Name: ' + clientName, 20, 85);
  doc.text('Client Number: ' + clientNumber, 20, 75);
  doc.text('Client Email: ' + clientEmail, 20, 90);

  // Invoice details
  doc.text('Invoice No.: ' + invoiceNumber, 150, 40);
  doc.text('Issue date: ' + invoiceDate, 150, 45);
  doc.text('Due date: ' + dueDate.toISOString().split('T')[0], 150, 50);

  // Services table
  const services = [];
  $('.service').each(function() {
    const description = $(this).find('.service-description').val();
    const rate = parseFloat($(this).find('.service-rate').val());
    const frequency = $(this).find('.service-frequency').val();
    services.push({ description, rate, frequency });
  });
  
  const tableBody = services.map(service => [
    service.description,
    service.frequency,
    service.rate.toFixed(2),
    service.rate.toFixed(2)
  ]);
  
  doc.autoTable({
    startY: 100,  // Increased from 90 to accommodate new client details
    head: [['SERVICES', 'FREQUENCY', 'UNIT PRICE (Rs)', 'AMOUNT (Rs)']],
    body: tableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [27, 62, 152],
      textColor: [255, 255, 255]
    }
  });
  
  // Calculate total
  const totalAmount = services.reduce((acc, service) => acc + service.rate, 0);
  // Total amount
  doc.text('Total amount of service charge* (as per standard pricing): Rs.', 20, doc.autoTable.previous.finalY + 20);
  doc.setFontSize(18);
  doc.text(totalAmount.toFixed(2), 160, doc.autoTable.previous.finalY + 20);
  
  doc.save('(ClientName)_invoice.pdf');
});