import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_URL } from '../data/siteConfig';

export default function Footer() {
  return (
    <footer id="contacto" className="site-footer">
      <div className="section-inner">
        <h2 className="footer-title">Hablemos de tu espacio<span className="brand-dot">.</span></h2>
        <a className="btn btn--primary btn--icon" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          Contáctanos
        </a>
        <p className="footer-note">recorre. · Experiencias digitales · recorre.com.ar</p>
      </div>
    </footer>
  );
}