import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center items-center ">
            <h2 className='flex justify-center font-bold text-8xl text-white'>KeenKeeper</h2>
            <p className="mt-2 text-white font-bold">
              Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
            </p>
          </div>
          <h3 className="text-lg font-semibold text-white">Social Links</h3>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500 transition" aria-label="Facebook ">
        
              <img src="./src/assets/facebook.png" alt="" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 transition" aria-label="Twitter">
              <img src="./src/assets/twitter.png" alt="" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 transition" aria-label="Instagram">
              <img src="./src/assets/instagram.png" alt="" />
            </a>
          </div>
          <div className="text-center">
            <p className="text-sm text-white">
              © 2026 KeeNKeeper. All rights reserved.
            </p>
            <div className="mt-2 space-x-4 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-gray-900">Terms of Service</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-gray-900">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}