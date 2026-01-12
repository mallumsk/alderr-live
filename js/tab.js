       function showTab(tabId, btnElement) {
            // 1. Get the source data from the hidden HTML div
            const source = document.getElementById(tabId);
            const title = source.querySelector('.title').innerHTML;
            const number = source.querySelector('.number').innerHTML;
            const body = source.querySelector('.body').innerHTML;

            // 2. Update the display area
            document.getElementById('display-title').innerHTML = title;
            document.getElementById('display-number').innerHTML = number;
            document.getElementById('display-body').innerHTML = body;

            // 3. Update Button Styles
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('border-white', 'rounded-full');
                btn.classList.add('border-transparent');
            });
            btnElement.classList.add('border-white', 'rounded-full');
            btnElement.classList.remove('border-transparent');
        }