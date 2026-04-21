"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, CheckCircle2, Download, Link as LinkIcon, Gift } from "lucide-react";
import Link from "next/link";
import QRCode from "react-qr-code";
import confetti from "canvas-confetti";
import { supabase } from "@/lib/supabase";

export default function SuccessPage() {
  const params = useParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [storyUrl, setStoryUrl] = useState("");

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from("presents")
        .select("email")
        .eq("id", params.id)
        .single();
      
      if (error || !data) {
        console.error("Erro ao buscar e-mail:", error);
        router.push("/");
        return;
      }
      setEmail(data.email);
      
      // Construct the final URL for the QR and Link
      const url = `${window.location.origin}/story/${params.id}`;
      setStoryUrl(url);

      // Dispara um confete de sucesso ao carregar a página
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.3 },
        colors: ['#e11d48', '#be123c', '#fb7185']
      });
    }

    if (params.id) {
      loadData();
    }
  }, [params.id, router]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(storyUrl);
    alert("Link copiado para a área de transferência!");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 py-12">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg z-10">
        
        <div className="text-center mb-8">
           <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
           </div>
           <h1 className="text-4xl font-bold tracking-tight mb-2">Pagamento Aprovado!</h1>
           <p className="text-foreground/70">
             Seu presente está pronto e o comprovante foi enviado para <strong className="text-primary">{email}</strong>.
           </p>
        </div>

        <div className="glass p-8 rounded-[2rem] border-primary/30 shadow-[0_0_50px_rgba(225,29,72,0.15)] flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            O seu QR Code Mágico
          </h2>
          
          <div className="bg-white p-4 rounded-3xl shadow-xl mb-6">
             {storyUrl && (
                <QRCode
                  value={storyUrl}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                />
             )}
          </div>
          
          <p className="text-center text-sm text-foreground/60 mb-8 max-w-sm">
            Tire um print ou aponte a câmera do celular para este código para acessar o presente agora mesmo.
          </p>

          <div className="w-full space-y-3">
             <button 
               onClick={copyToClipboard}
               className="w-full h-12 rounded-xl bg-secondary text-secondary-foreground font-medium flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
             >
               <LinkIcon className="w-4 h-4" />
               Copiar Link do Presente
             </button>

             <Link 
               href={`/story/${params.id}`}
               className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
             >
               <Heart className="w-4 h-4" fill="currentColor" />
               Visualizar a Surpresa
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
