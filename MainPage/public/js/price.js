$(document).ready(function () {

    const $input = $('.service-radio');
    const priceMonthOne = 199000, priceMonthAll = 700000, priceYearOne = 1800000, priceYearAll = 6000000;

    $input.prop('checked', true);
    $input.data('storedValue', true);

    // package list
    $('ul.package-list li').click(function () {

        const $name = $(this).data('label');
       
        if ($name === 'all') {

            $input.prop('checked', true);
            $input.data('storedValue', true);
        } else {

            $input.filter(`[name!="${$name}"]`).prop('checked', false); 
            $input.filter(`[name!="${$name}"]`).data('storedValue', false); 

            $input.filter(`[name="${$name}"]`).prop('checked', true); 
            $input.filter(`[name="${$name}"]`).data('storedValue', true); 
        }
        
        calculatePrice();
    })

    // radio
    $input.click(function(){

        const $this = $(this);

        if ($input.filter(':checked').length <= 1) {

            return;
        }

        const previousValue = $this.data('storedValue');

        if (previousValue) {

            $this.prop('checked', !previousValue);
            $this.data('storedValue', !previousValue);
        }
        else{

            $this.data('storedValue', true);
        }

        calculatePrice();
    });

    // calculate & set price 
    function calculatePrice() {

        let priceMonth = 0, priceYear = 0;

        if ($input.filter(':checked').length === 4) {

            priceMonth = priceMonthAll;
            priceYear = priceYearAll;
        } else {

            $input.filter(':checked').each(function () {
        
                const $name = $(this).data('label');

                switch ($name) {

                    case 'ecom':
                        priceMonth += priceMonthOne;
                        priceYear +=priceYearOne;
                        break;
                    case 'pos':
                        priceMonth += priceMonthOne;
                        priceYear += priceYearOne;
                        break;
                    case 'social':
                        priceMonth += priceMonthOne;
                        priceYear += priceYearOne;
                        break;
                    case 'web':
                        priceMonth += priceMonthOne;
                        priceYear += priceYearOne;
                        break;
                    default:
                        break;
                }
            });
        }

        $('#price-month').html(`${priceMonth.toLocaleString().replaceAll(',', '.')}<sup>đ</sup>`);
        $('#price-month-describe').html(`Thanh toán định kỳ hàng tháng ${priceMonth.toLocaleString().replaceAll(',', '.')}đ`);

        $('#price-year').html(`${priceYear.toLocaleString().replaceAll(',', '.')}<sup>đ</sup>`);
        $('#price-year-describe').html(`Thanh toán định kỳ hàng năm ${priceYear.toLocaleString().replaceAll(',', '.')}đ`);
    }
})