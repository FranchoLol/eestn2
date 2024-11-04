function adjustMenu() {
    const menuHeader = document.getElementById('menuHeader');
    const checkbox = document.getElementById('ckbMenuHeader');
    menuHeader.style.transform = window.innerWidth < 840 ? (checkbox.checked ? 'translateX(0)' : 'translateX(calc(-100% + var(--Wheader)))') : 'translateX(0)';
}
document.getElementById('ckbMenuHeader').addEventListener('change', adjustMenu);
window.addEventListener('resize', adjustMenu);
adjustMenu();
document.querySelector('#btnExit').onclick = () => location.href = '../../../index.html';