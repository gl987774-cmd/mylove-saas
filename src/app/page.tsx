"use client";

import Link from "next/link";
import { Heart, Sparkles, Clock, QrCode, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
          <Heart className="w-6 h-6 text-primary" fill="currentColor" />
          MyLove
        </div>
        <Link 
          href="/create"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Criar Presente
        </Link>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4 pt-20 pb-32 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium mb-8 text-primary/80 border-primary/20">
          <Sparkles className="w-4 h-4" />
          O presente digital definitivo
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Surpreenda seu amor hoje… e marque esse momento <span className="text-primary glow-primary">pra sempre.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto">
          Crie uma página exclusiva com cronômetro de relacionamento ao vivo, suas fotos e a música de vocês. Um presente inesquecível a um QR Code de distância.
        </p>

        {/* Hero Image (Celular + QR Code flutuante) */}
        <div className="relative w-full max-w-xl mx-auto mb-8 group perspective">
           {/* Glow pesado atrás da imagem para dar o efeito Ghibli/Espacial */}
           <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-colors duration-700" />
           
           <img 
             src="https://i.postimg.cc/tRYDGKDW/Gemini-Generated-Image-9pvxv49pvxv49pvx.png" 
             alt="Amostra do Presente Story Infinito" 
             className="w-full h-auto relative z-10 drop-shadow-[0_20px_50px_rgba(225,29,72,0.3)] hover:scale-105 transition-transform duration-700" 
           />
        </div>

        {/* --- Social Proof: +5616 Casais Felizes --- */}
        <div className="flex items-center justify-center gap-4 mb-10">
           <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="Casal feliz" />
              <img className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Pessoa encantada" />
              <img className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop" alt="Casal impressionado" />
              <img className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" alt="Usuário que presenteou" />
           </div>
           <div className="text-left flex flex-col">
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-sm font-medium text-foreground/80 leading-tight">
                <span className="font-bold text-white tracking-wide">+5.616</span> casais felizes
              </p>
           </div>
        </div>
        
        <Link 
          href="/create"
          className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-medium text-primary-foreground shadow-[0_0_40px_rgba(225,29,72,0.6)] hover:bg-primary/90 transition-all hover:scale-110 active:scale-95"
        >
          Criar meu presente agora
        </Link>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto text-left">
          <div className="glass p-8 rounded-3xl">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Contador Ao Vivo</h3>
            <p className="text-foreground/60">Acompanhe cada segundo, minuto e dia que vocês estão juntos desde o momento em que se conheceram.</p>
          </div>
          <div className="glass p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
            <div className="relative">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Página Exclusiva</h3>
              <p className="text-foreground/60">Personalize com nomes, declaração de amor e a música que marcou a história do casal.</p>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Acesso por QR Code</h3>
            <p className="text-foreground/60">Envie o link ou imprima o QR Code para fazer uma surpresa mágica que vai emocionar seu parceiro(a).</p>
          </div>
        </div>

        {/* Como fazer section */}
        <div className="mt-40 mb-20 max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-center text-left">
          
          {/* Lado Esquerdo */}
          <div className="lg:w-1/3 flex flex-col items-center lg:items-start relative">
             <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-8 font-sans">
               Como<br/>fazer?
             </h2>
             
             {/* 3D Chat 
             Usando emojis 3D reais (Google Noto CDN) */}
             <div className="w-32 h-32 mb-12 drop-shadow-[0_10px_20px_rgba(225,29,72,0.3)] transform -rotate-[10deg] animate-pulse">
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f49d/512.webp" alt="Coração 3D" className="w-full h-full object-contain" />
             </div>

             {/* Seta Desenhada Igual a imagem */}
             <svg width="180" height="180" viewBox="0 0 200 200" fill="none" className="absolute top-[50%] lg:top-[40%] -right-20 lg:-right-32 text-white opacity-90 hidden md:block pointer-events-none">
                <path d="M20 20 C60 100, 100 -20, 150 100 C170 140, 160 180, 160 180" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="transparent" />
                <path d="M130 160 L160 180 L180 150" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="transparent" />
             </svg>
          </div>

          {/* Lado Direito (Grid de Passos) */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-white">
            
            {/* Passo 1 - BG Escuro Azulado semelhante à imagem */}
            <div className="bg-[#0b132b] border border-white/5 p-6 rounded-[1.5rem] flex flex-col items-center gap-6 shadow-xl hover:-translate-y-2 transition-transform duration-300">
               <h4 className="font-bold text-lg text-center tracking-wide">1. Crie o Story Infinito</h4>
               <div className="w-full h-40 rounded-xl flex items-center justify-center overflow-hidden relative border border-white/5 bg-[#050914] shadow-inner">
                  {/* Pedaço de Interface Estilo Celular (Instagram Mock) */}
                  <div className="w-11/12 h-5/6 bg-[#1a1b26] rounded-xl flex items-start p-2 gap-2 relative overflow-hidden text-[10px]">
                     <div className="w-1/2 h-full bg-cover bg-center rounded-lg relative bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=200&auto=format&fit=crop')]" />
                     <div className="w-1/2 h-full flex flex-col gap-2 relative">
                        <div className="text-white/80 font-bold mt-1 tracking-widest text-[#e11d48]">I ♥ U</div>
                        <div className="w-8 h-8 rounded-full bg-yellow-400 absolute bottom-2 right-2 flex items-center justify-center shadow-lg transform rotate-12">
                          <span className="text-sm">😘</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Passo 2 */}
            <div className="bg-[#0b132b] border border-white/5 p-6 rounded-[1.5rem] flex flex-col items-center gap-6 shadow-xl hover:-translate-y-2 transition-transform duration-300">
               <h4 className="font-bold text-lg text-center tracking-wide">2. Faça o pagamento</h4>
               <div className="w-full h-40 bg-transparent rounded-xl flex flex-col items-center justify-center relative">
                  <div className="w-32 h-32 drop-shadow-2xl hover:scale-110 transition-transform">
                     <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Coin/3D/coin_3d.png" alt="Moedas 3D" className="w-full h-full object-contain" />
                  </div>
               </div>
            </div>

            {/* Passo 3 */}
            <div className="bg-[#0b132b] border border-white/5 p-6 rounded-[1.5rem] flex flex-col items-center gap-6 shadow-xl hover:-translate-y-2 transition-transform duration-300">
               <h4 className="font-bold text-lg text-center tracking-wide">3. Receba o seu story +<br/>QR Code no e-mail</h4>
               <div className="w-full h-40 bg-transparent rounded-xl flex flex-col items-center justify-center relative">
                  <div className="w-32 h-32 drop-shadow-2xl hover:scale-110 transition-transform">
                     <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f48c/512.webp" alt="Envelope 3D" className="w-full h-full object-contain" />
                  </div>
               </div>
            </div>

            {/* Passo 4 */}
            <div className="bg-[#0b132b] border border-white/5 p-6 rounded-[1.5rem] flex flex-col items-center gap-6 shadow-xl hover:-translate-y-2 transition-transform duration-300">
               <h4 className="font-bold text-lg text-center tracking-wide">4. Surpreenda seu amor</h4>
               <div className="w-full h-40 bg-transparent rounded-xl flex items-center justify-center relative">
                  <div className="w-20 h-auto absolute z-10 bottom-0 left-4 drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]">
                     <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.webp" alt="Emoji" className="w-full" />
                  </div>

                  <div className="w-20 h-36 bg-[#050914] rounded-2xl border-[3px] border-[#1f2937] shadow-xl relative overflow-hidden flex flex-col items-center">
                     <div className="w-6 h-1 bg-[#1f2937] rounded-b-xl absolute top-0"></div>
                     <div className="w-full h-full mt-2 bg-cover bg-center rounded-lg bg-[url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=200&auto=format&fit=crop')]" />
                     <Heart className="w-8 h-8 text-rose-500 fill-rose-500 absolute top-4 right-2 animate-bounce" />
                  </div>

                  <div className="w-16 h-16 absolute top-0 -right-2 drop-shadow-lg z-20">
                     <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f49e/512.webp" alt="Coração" className="w-full" />
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* --- CARROSSEL: SURPRESAS QUE VIRALIZARAM --- */}
        <div className="mt-40 mb-32 w-full overflow-hidden">
           <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-16">
             Surpresas que <span className="text-primary">viralizaram 💕</span>
           </h2>
           
           <div className="relative w-full flex overflow-hidden group">
              {/* Degradês nas Bordas para suavizar a entrada e saída */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>

              {/* Animação com framer-motion da esteira */}
              <motion.div 
                 className="flex gap-6 w-max"
                 animate={{ x: ["0%", "-50%"] }}
                 transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
              >
                 {/* Gerando itens duplicados para efeito infinito perfeito */}
                 {[1, 2, 3, 1, 2, 3, 1, 2, 3].map((item, idx) => (
                    <div key={idx} className="w-64 h-[450px] rounded-3xl overflow-hidden relative shadow-2xl flex-shrink-0 border-[4px] border-white/5 bg-[#161a2b]">
                       <div className={`absolute inset-0 bg-cover bg-center ${
                          item === 1 ? 'bg-[url("https://i.postimg.cc/FK05pfd6/a1.webp")]' :
                          item === 2 ? 'bg-[url("https://i.postimg.cc/t4VLR15G/a2.webp")]' :
                          'bg-[url("https://i.postimg.cc/C1wt4cVf/a3.webp")]'
                       }`} />
                    </div>
                 ))}
              </motion.div>
           </div>
        </div>

        {/* --- PREÇOS SECTION --- */}
        <div className="mt-32 mb-40 text-center px-4">
           <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-20 font-sans">
             Preços
           </h2>

           <div className="max-w-md mx-auto bg-[#0b132b] rounded-3xl border border-rose-500 shadow-[0_0_60px_rgba(225,29,72,0.2)] relative flex flex-col pt-12 pb-8 px-8 text-left transition-transform hover:-translate-y-2 duration-300">
             
             {/* Badge Superior */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white font-bold text-sm tracking-widest px-6 py-2 rounded-full flex items-center gap-2 shadow-lg z-20">
               <span>★</span> COMECE AQUI
             </div>

             {/* Cabeçalho do Preço */}
             <div className="flex border-b border-rose-500/30 pb-8 relative">
               <div className="flex flex-col z-10">
                 <h3 className="text-xl text-white/80 font-medium mb-1">Story Infinito</h3>
                 <div className="flex items-end gap-2 text-white">
                   <span className="text-3xl font-black mb-1">R$</span>
                   <span className="text-7xl font-black leading-none tracking-tighter">47</span>
                 </div>
                 <span className="text-white/60 font-medium mt-1">/ 1 ano</span>
               </div>
               
               {/* Ícone 3D Flutuante - Coração em Chamas (Google Noto) */}
               <div className="absolute -right-4 -top-8 w-36 h-36 origin-right drop-shadow-2xl">
                  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f_200d_1f525/512.webp" alt="Coração em Chamas" className="w-full h-full object-contain filter hue-rotate-15" />
               </div>
             </div>

             {/* Itens do Pacote */}
             <ul className="flex flex-col gap-4 mt-8 mb-10 text-white/90 text-lg font-medium tracking-wide">
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="text-rose-500 w-6 h-6 flex-shrink-0" />
                  <span>7 fotos</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="text-rose-500 w-6 h-6 flex-shrink-0" />
                  <span>2 vídeos do YouTube</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="text-rose-500 w-6 h-6 flex-shrink-0" />
                  <span>1 áudio gravado</span>
                </li>
                <li className="flex items-center gap-4 items-start">
                  <CheckCircle2 className="text-rose-500 w-6 h-6 mt-1 flex-shrink-0" />
                  <span>Contador de relacionamento ao vivo</span>
                </li>
                <li className="flex items-center gap-4 items-start">
                  <CheckCircle2 className="text-rose-500 w-6 h-6 mt-1 flex-shrink-0" />
                  <span>Desenhos, textos e emojis animados</span>
                </li>
             </ul>

             {/* Botão de Compra */}
             <Link 
                href="/create"
                className="w-full h-16 bg-[#fb3f5c] hover:bg-[#fd2345] text-white rounded-2xl flex items-center justify-center text-2xl font-bold tracking-tight shadow-xl transition-all hover:scale-105 active:scale-95"
             >
                Criar Story Infinito
             </Link>
             
           </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="mt-32 mb-40 max-w-3xl mx-auto px-4">
           <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-16 font-sans">
             Perguntas Frequentes
           </h2>
           <div className="flex flex-col gap-4">
             {[
               {
                 q: "O que é o MyLove?",
                 a: "O MyLove é uma plataforma que permite criar páginas personalizadas de relacionamento para casais. Você pode adicionar fotos, uma mensagem especial, um contador que mostra há quanto tempo vocês estão juntos e muito mais. É perfeito para presentes surpresas!"
               },
               {
                 q: "Quais são as formas de pagamento?",
                 a: "No momento, aceitamos PIX para liberação imediata e segura do seu presente."
               },
               {
                 q: "A página personalizada tem validade?",
                 a: "Sim, atualmente a sua página fica no ar e acessível durante 1 ano inteiro para vocês acompanharem o tempo juntos."
               }
             ].map((faq, i) => (
               <details key={i} className="group bg-[#0b132b]/50 backdrop-blur-sm rounded-3xl border border-white/5 overflow-hidden cursor-pointer open:bg-[#0b132b] transition-colors shadow-lg">
                 <summary className="flex items-center justify-between p-6 md:p-8 font-bold text-lg md:text-xl select-none list-none text-white/90 group-open:text-rose-500 transition-colors">
                   {faq.q}
                   <span className="transform group-open:rotate-180 transition-transform duration-300 bg-white/5 rounded-full p-2">
                     <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                   </span>
                 </summary>
                 <div className="px-6 md:px-8 pb-8 text-white/70 leading-relaxed text-lg">
                   {faq.a}
                 </div>
               </details>
             ))}
           </div>
        </div>

        {/* --- BOTTOM CTA (RODAPÉ FINAL) --- */}
        <div className="mt-32 mb-20 text-center px-4 flex flex-col items-center">
           <div className="inline-flex items-center justify-center p-4 bg-rose-500/10 rounded-full mb-6">
              <Heart className="w-10 h-10 text-rose-500 fill-rose-500 animate-pulse" />
           </div>
           <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
             Quer fazer uma surpresa pra quem você ama hoje?
           </h2>
           <p className="text-xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed">
             É rápido, totalmente digital e demora menos que <strong className="text-white">5 minutos</strong> para preparar.
           </p>
           <Link 
              href="/create"
              className="inline-flex h-16 items-center justify-center rounded-full bg-primary px-12 text-xl font-bold text-primary-foreground shadow-[0_0_60px_rgba(225,29,72,0.4)] hover:bg-primary/90 transition-all hover:scale-110 active:scale-95"
           >
              Começar Agora
           </Link>
        </div>

      </main>

      {/* Footer Simples */}
      <footer className="border-t border-white/5 py-10 mt-10 text-center text-white/30 text-sm">
        <p>© {new Date().getFullYear()} MyLove. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
