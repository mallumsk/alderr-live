
            document.querySelectorAll('.faq-item button').forEach(button => {
            button.addEventListener('click', () => {
                const parent = button.parentElement;
                
                // Close other open items
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });

                // Toggle the clicked item
                parent.classList.toggle('active');
            });
        });