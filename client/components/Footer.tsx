import { Linkedin, Github, Mail } from "lucide-react";

export const BehanceIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.497 1.19.9.26 1.54.65 1.93 1.17.39.52.585 1.17.585 1.95 0 .75-.14 1.4-.425 1.96-.285.56-.68 1.03-1.188 1.41-.508.38-1.108.67-1.8.87-.69.2-1.44.3-2.25.3H0V4.51h6.938v-.007zM3.495 8.847h2.862c.577 0 1.03-.133 1.36-.4.33-.267.495-.7.495-1.3 0-.622-.165-1.055-.495-1.3-.33-.245-.783-.367-1.36-.367H3.495v3.367zm0 4.833h3.362c.693 0 1.215-.167 1.567-.5.35-.33.527-.853.527-1.567 0-.67-.177-1.18-.53-1.53-.353-.35-.874-.527-1.564-.527H3.495v4.124zM21.439 6.064c.966 0 1.844.155 2.635.465.79.31 1.463.744 2.017 1.304.554.56.98 1.24 1.286 2.04.305.8.458 1.697.458 2.693v.515H17.93c.058 1.177.29 1.988.696 2.434.407.446.856.67 1.348.67.653 0 1.151-.24 1.495-.72.344-.48.517-.98.517-1.503h3.62c-.02.972-.234 1.87-.641 2.697-.407.826-.955 1.508-1.644 2.048-.69.54-1.504.948-2.442 1.224-.938.276-1.938.414-3 .414-1.072 0-2.05-.153-2.933-.458-.884-.305-1.644-.738-2.284-1.297-.64-.56-1.136-1.247-1.488-2.056-.352-.81-.528-1.734-.528-2.772 0-1.106.193-2.084.579-2.934.386-.85.919-1.563 1.599-2.139.68-.576 1.486-1.01 2.418-1.302.932-.292 1.943-.438 3.033-.438zm-3.971 5.939h6.659c-.038-.67-.322-1.222-.853-1.657-.531-.435-1.146-.653-1.846-.653-.729 0-1.38.218-1.955.653-.575.435-.934.987-1.005 1.657zM17.367 1.661c.191 0 .363.028.516.085.153.057.284.143.393.26.109.116.194.26.255.43.061.17.092.37.092.6 0 .23-.031.43-.092.6-.061.17-.146.314-.255.43-.109.117-.24.203-.393.26-.153.057-.325.085-.516.085-.191 0-.363-.028-.516-.085-.153-.057-.284-.143-.393-.26-.109-.116-.194-.26-.255-.43-.061-.17-.092-.37-.092-.6 0-.23.031-.43.092-.6.061-.17.146-.314.255-.43.109-.117.24-.203.393-.26.153-.057.325-.085.516-.085z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-white border-t-4 border-black relative">
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
      <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          
          {/* System Info */}
           <div className="flex items-center gap-4">
              <div className="text-xs font-mono font-bold text-gray-400">
                 <div>SYSTEM_VER: 2.5.0</div>
                 <div>LAST_UPDATE: {new Date().getFullYear()}</div>
              </div>
           </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/prabhath-subhashana-6b694a20a"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#007BFF] transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-black" />
            </a>
            <a
              href="https://behance.net/prabathsubasha"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#EA4C89] transition-all duration-300"
              title="Behance"
            >
              <BehanceIcon className="w-5 h-5 text-black" />
            </a>
            <a
              href="https://github.com/subhashana00"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#333] transition-all duration-300"
              title="GitHub"
            >
              <Github className="w-5 h-5 text-black" />
            </a>
            <a
              href="mailto:prabathsubashana18@gmail.com"
              className="w-12 h-12 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#EA4335] transition-all duration-300"
              title="Email"
            >
              <Mail className="w-5 h-5 text-black" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center lg:text-right">
            <p className="text-sm font-black text-black uppercase tracking-wide">
              © Prabhath Subhashana
            </p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
               All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
