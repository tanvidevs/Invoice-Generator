$(document).ready(function() {
  $('.btn-next').on('click', function() {
    var currentStep = $(this).closest('.step-content').data('step');
    var nextStep = currentStep + 1;
    
    // If moving to step 4, populate the review
    if (nextStep === 4) {
      populateReview();
    }
    
    navigateToStep(nextStep);
  });

  $('.btn-previous').on('click', function() {
    var currentStep = $(this).closest('.step-content').data('step');
    var previousStep = currentStep - 1;
    navigateToStep(previousStep);
  });

  function navigateToStep(step) {
    $('.step-content').removeClass('active').addClass('hidden');
    $('.step-content[data-step="' + step + '"]').removeClass('hidden').addClass('active');
    $('.step').removeClass('active');
    $('.step[data-step="' + step + '"]').addClass('active');
  }

  $('#add-service').on('click', function() {
    var newService = `
      <div class="service mb-4">
        <label class="block text-gray-700">Service Description</label>
        <input type="text" class="service-description w-full px-3 py-2 border" />
        <label class="block text-gray-700">Service Rate</label>
        <input type="number" class="service-rate w-full px-3 py-2 border" />
        <label class="block text-gray-700">Service Frequency</label>
        <select class="service-frequency w-full px-3 py-2 border">
          <option value="One-Time">One-Time</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>`;
    $('#services-container').append(newService);
  });

  function populateReview() {
    // Populate client details
    $('#review-client-number').text($('#client-number').val());
    $('#review-company-name').text($('#company-name').val());
    $('#review-client-name').text($('#client-name').val());
    $('#review-client-email').text($('#client-email').val());
    
    // Populate invoice details
    $('#review-invoice-number').text($('#invoice-number').val());
    $('#review-invoice-date').text($('#invoice-date').val());
    
    // Populate services
    let servicesHtml = '';
  let total = 0;
  $('.service').each(function() {
    const description = $(this).find('.service-description').val();
    const rate = parseFloat($(this).find('.service-rate').val()) || 0;
    const frequency = $(this).find('.service-frequency').val();
    const amount = rate; // Since we're not multiplying by quantity anymore
    total += amount;
    
    servicesHtml += `
      <tr class="text-center">
        <td class="border p-2">${description}</td>
        <td class="border p-2">Rs. ${rate.toFixed(2)}</td>
        <td class="border p-2">${frequency}</td>
        <td class="border p-2">Rs. ${amount.toFixed(2)}</td>
      </tr>
    `;
  });
  
  $('#review-services').html(servicesHtml);
  $('#review-total').text(total.toFixed(2));
}

  // Add event listener for the generate PDF button
  $('#generate-pdf').on('click', function() {
    if (confirm("Are you sure you want to generate the PDF?")) {
      generatePDF(); // Make sure this function is defined in pdf_generate.js
    }
  });
});