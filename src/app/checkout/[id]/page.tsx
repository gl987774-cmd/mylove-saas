"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, Loader2, Copy, Check, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Review, 2: Payment
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
        setStep(2);
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
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#050914]">
      {/* Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full z-10">
        
        <div className="flex justify-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-2xl">
            <Heart className="w-8 h-8" fill="currentColor" />
            MyLove
          </Link>
        </div>

        {/* Caixa de Checkout Minimalista */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 overflow-hidden text-slate-900 border border-white/20">
          
          {step === 1 ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Checkout Seguro</h2>

              <div className="w-full space-y-4 mb-10">
                <div className="flex justify-between items-center py-5 border-b border-slate-100 font-bold text-slate-400 uppercase text-xs tracking-widest">
                  <span>Produto</span>
                  <span className="text-slate-900">Story Infinito</span>
                </div>
                <div className="flex justify-between items-center py-6">
                  <span className="text-xl font-bold text-slate-400">Total</span>
                  <span className="text-4xl font-black text-primary">R$ 47,00</span>
                </div>
              </div>

              <button 
                onClick={handleGeneratePix}
                disabled={loading}
                className="w-full h-16 rounded-2xl bg-primary text-white font-black text-xl flex items-center justify-center gap-3 hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-primary/20"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Ir para pagamento"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 flex flex-col items-center">
                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <Check className="w-6 h-6" strokeWidth={3} />
                 </div>
                 <h2 className="text-xl font-black text-slate-900">Escaneie o PIX</h2>
              </div>
              
              <div className="bg-white p-2 rounded-3xl mb-8 shadow-inner border border-slate-100">
                 <img 
                   src={`data:image/jpeg;base64,${paymentData?.qr_code_base64}`} 
                   alt="QR Code PIX"
                   className="w-56 h-56"
                 />
              </div>

              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-8 px-4 leading-relaxed">
                Aguardando a confirmação do seu pagamento...
              </p>

              <button 
                onClick={copyToClipboard}
                className="w-full h-16 rounded-2xl bg-black text-white font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl mb-4"
              >
                {copied ? (
                  <><Check className="w-6 h-6" /> Copiado!</>
                ) : (
                  <><Lock className="w-6 h-6" /> Pagar</>
                )}
              </button>

              <div className="text-[10px] uppercase tracking-widest text-slate-300 font-bold mt-4">
                 ID: {paymentData?.payment_id}
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-center gap-6 border-t border-slate-100 pt-8 grayscale opacity-30">
             <img src="https://i.postimg.cc/h4mzxn0k/555.png" alt="MP" className="h-6" />
             <img src="https://i.postimg.cc/RVXMJpjC/66666.webp" alt="Pix" className="h-6" />
          </div>
        </div>

      </div>
    </div>
  );
}
