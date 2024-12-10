import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    // Inisialisasi komponen aplikasi
    this._initialAppShell();
  }
  //tooglemenudrawer(){
  //  this._button.addEventListener('click', (event) => {
  //    event.preventDefault(); // Mencegah navigasi default
  //}

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    // Inisialisasi fungsi *skip-link* untuk aksesibilitas
    this._setupSkipLink();
  }

  _setupSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) {
      console.warn('Elemen skip-link tidak ditemukan.');
      return;
    }

    skipLink.addEventListener('click', (event) => {
      event.preventDefault(); // Mencegah navigasi default
      if (this._content) {
        this._content.tabIndex = -1; // Pastikan elemen dapat menerima fokus
        this._content.focus(); // Pindahkan fokus ke elemen utama
      } else {
        console.warn('Elemen konten utama tidak ditemukan.');
      }
    });
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url];

      if (!page) {
        throw new Error(`Route tidak ditemukan untuk URL: ${url}`);
      }

      // Kontrol visibilitas hero section
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        if (url === '/') {
          heroSection.style.display = 'block'; // Tampilkan hero di Home
        } else {
          heroSection.style.display = 'none'; // Sembunyikan di halaman lain
        }
      }

      // Render konten halaman
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } catch (error) {
      console.error('Terjadi kesalahan saat merender halaman:', error);
    }
  }
}

export default App;
