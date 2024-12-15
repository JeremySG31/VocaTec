// Selecciona todos los elementos con la clase 'feature'
const features = document.querySelectorAll('.feature');

// Añade eventos para cuando el ratón entra y sale
features.forEach((feature) => {
    feature.addEventListener('mouseenter', () => {
        feature.style.transform = 'translateY(-10px) scale(1.03)';
        feature.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.2)';
    });

    feature.addEventListener('mouseleave', () => {
        feature.style.transform = 'translateY(0) scale(1)';
        feature.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    });
});