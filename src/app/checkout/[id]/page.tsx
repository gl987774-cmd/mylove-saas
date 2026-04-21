"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Lock, CheckCircle2, ShieldCheck, Heart, Loader2, Copy, Check } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<{ qr_code: string; qr_code_base64: string; payment_id: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from("presents")
        .select("email, pago")
        .eq("id", params.id)
        .single();
      
      if (error || !data) {
        router.push("/");
        return;
      }
      setEmail(data.email);
      
      // Se já estiver pago, vai direto pro sucesso
      if (data.pago) {
        router.push(`/success/${params.id}`);
      }
    }
    
    if (params.id) {
      loadData();
    }
  }, [params.id, router]);

  // Pooling: Verifica se o pagamento foi aprovado a cada 3 segundos
  useEffect(() => {
    if (!params.id) return;

    const interval = setInterval(async () => {
      const { data } = await supabase
        .from("presents")
        .select("pago")
        .eq("id", params.id)
        .single();

      if (data?.pago) {
        clearInterval(interval);
        router.push(`/success/${params.id}`);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [params.id, router]);

  const handleGeneratePix = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: params.id }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setPaymentData(data);
      } else {
        alert("Erro ao gerar PIX: " + data.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (paymentData?.qr_code) {
      navigator.clipboard.writeText(paymentData.qr_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center z-10 py-10">
        
        {/* Resumo do Pedido */}
        <div className="space-y-6 md:pr-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-4">
            <Heart className="w-6 h-6" fill="currentColor" />
            MyLove
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-white">Sua página está pronta e aguardando você! 🔒</h1>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Eternize sua história agora. Assim que o pagamento for detectado, sua página será desbloqueada instantaneamente.
          </p>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="font-medium">Acesso por 1 ano</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="font-medium">QR Code enviado para {email || "seu e-mail"}</span>
            </div>
          </div>
        </div>

        {/* Caixa de Pagamento */}
        <div className="glass p-8 rounded-[2.5rem] border-primary/20 shadow-2xl relative overflow-hidden bg-[#0b132b]/80">
          <div className="absolute top-0 right-0 bg-primary text-white font-bold text-xs px-4 py-2 rounded-bl-2xl uppercase tracking-widest flex items-center gap-1 shadow-lg">
             <ShieldCheck className="w-4 h-4" /> Pagamento Real
          </div>
          
          {!paymentData ? (
             <>
               <h2 className="text-2xl font-bold mb-6 mt-4 text-white">Finalizar Pedido</h2>
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-4 bg-primary/5 rounded-2xl px-5 border border-primary/10">
                    <span className="text-lg font-medium text-white/80">Total</span>
                    <span className="text-3xl font-black text-primary">R$ 47,00</span>
                  </div>
               </div>

               <button 
                 onClick={handleGeneratePix}
                 disabled={loading}
                 className="w-full h-16 rounded-2xl bg-[#009ee3] text-white font-bold text-xl flex items-center justify-center gap-3 hover:bg-[#009ee3]/90 transition-all hover:scale-[1.02] shadow-xl shadow-[#009ee3]/20 disabled:opacity-50"
               >
                 {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Gerar PIX de R$ 47,00"}
               </button>
             </>
          ) : (
             <div className="flex flex-col items-center text-center">
                <div className="mb-6 animate-pulse flex items-center gap-2 text-primary font-bold">
                   <Loader2 className="w-4 h-4 animate-spin" />
                   Aguardando pagamento...
                </div>
                
                <div className="bg-white p-4 rounded-3xl mb-6 shadow-2xl border-4 border-primary/20">
                   <img 
                     src={`data:image/jpeg;base64,${paymentData.qr_code_base64}`} 
                     alt="QR Code PIX"
                     className="w-48 h-48"
                   />
                </div>

                <p className="text-sm text-foreground/60 mb-6 px-4">
                  Aproxime a câmera do seu banco ou copie a chave abaixo
                </p>

                <button 
                  onClick={copyToClipboard}
                  className="w-full h-14 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all mb-4"
                >
                  {copied ? (
                    <><Check className="w-5 h-5 text-green-500" /> Copiado!</>
                  ) : (
                    <><Copy className="w-5 h-5" /> Copiar Chave PIX</>
                  )}
                </button>

                <div className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
                   Código do Pagamento: {paymentData.payment_id}
                </div>
             </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-4 border-t border-white/5 pt-6">
             <img src="https://logopng.com.br/logos/mercado-pago-82.png" alt="Mercado Pago" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
             <div className="h-4 w-[1px] bg-white/20"></div>
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_Pix.png/1200px-Logo_Pix.png" alt="Pix" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>

      </div>
    </div>
  );
}
