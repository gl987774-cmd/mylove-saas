"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight, Loader2, ImagePlus, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name1: "",
    name2: "",
    startDate: "",
    message: "",
    youtubeUrl: "",
    email: "",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 3 - photos.length;
    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from("presents")
        .insert([
          { 
            name1: formData.name1,
            name2: formData.name2,
            start_date: formData.startDate,
            message: formData.message,
            youtube_url: formData.youtubeUrl,
            email: formData.email,
            photos: photos,
            pago: false
          }
        ])
        .select()
        .single();

      if (error) throw error;

      router.push(`/checkout/${data.id}`);
    } catch (error: any) {
      console.error("Supabase Error:", error);
      alert("Erro ao salvar presente: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 bg-[#050914]">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-2xl">
            <Heart className="w-8 h-8" fill="currentColor" />
            MyLove
          </Link>
        </div>
        
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 overflow-hidden text-slate-900 border border-white/20">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black mb-2 text-slate-900">Crie o seu presente</h1>
            <p className="text-slate-500 font-medium">Preencha os detalhes e insira suas melhores memórias.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Fotos */}
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Fotos do Casal (Até 3)</label>
              
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
                    <img src={photo} alt={`Foto ${i+1}`} className="object-cover w-full h-full" />
                    <button 
                      type="button" 
                      onClick={() => removePhoto(i)}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-rose-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {photos.length < 3 && (
                  <label className="cursor-pointer aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-primary/50 transition-all hover:bg-primary/5 text-slate-400 hover:text-primary">
                    <ImagePlus className="w-7 h-7" />
                    <span className="text-xs font-bold uppercase">Adicionar</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handlePhotoUpload} 
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Seu Nome</label>
                <input 
                  required
                  type="text" 
                  className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="Ex: Ana"
                  value={formData.name1}
                  onChange={e => setFormData({...formData, name1: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Nome do seu Amor</label>
                <input 
                  required
                  type="text" 
                  className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="Ex: João"
                  value={formData.name2}
                  onChange={e => setFormData({...formData, name2: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Quando o namoro começou?</label>
              <input 
                required
                type="date" 
                className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                value={formData.startDate}
                onChange={e => setFormData({...formData, startDate: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Mensagem de Declaração</label>
              <textarea 
                required
                rows={4}
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                placeholder="Escreva algo lindo que marque a história de vocês..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
               <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Música Tema (Link do YouTube)</label>
              <input 
                type="url" 
                className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.youtubeUrl}
                onChange={e => setFormData({...formData, youtubeUrl: e.target.value})}
              />
              <p className="text-[11px] text-slate-400 font-medium">Opcional. A música tocará de fundo na página.</p>
            </div>

            <div className="space-y-2 pt-6 border-t border-slate-100">
               <label className="text-sm font-bold uppercase tracking-wider text-primary">Seu Melhor E-mail</label>
              <input 
                required
                type="email" 
                className="w-full h-14 px-5 bg-primary/[0.03] border-2 border-primary/10 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                placeholder="Para onde enviaremos o QR Code Mágico?"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <p className="text-[11px] text-slate-400 text-center mt-2 font-medium">Você precisará deste e-mail para validar a compra.</p>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-16 rounded-2xl bg-primary text-white font-black text-lg flex items-center justify-center gap-3 hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none shadow-xl shadow-primary/20"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Continuar para Pagamento <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest leading-relaxed">
                Lembre-se de não subir fotos gigantes para esta demonstração não travar!
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
