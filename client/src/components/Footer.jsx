import { FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-3xl hover:text-pink-500 transition-colors" />
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="text-3xl hover:text-green-500 transition-colors" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-3xl hover:text-blue-700 transition-colors" />
        </a>
      </div>
      <p className="text-center text-gray-400">Powered by Sharafath ST</p>
    </footer>
  );
};

export default Footer;
