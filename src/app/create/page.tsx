"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight, Loader2, ImagePlus, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
      // Basic compression trick for demo: we just rely on small files or browser downscale 
      // but standard FileReader base64 will do for a quick MVP.
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
    <div className="min-h-screen relative py-12 px-4">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8">
          <Heart className="w-5 h-5" fill="currentColor" />
          MyLove
        </Link>
        
        <div className="glass p-8 md:p-10 rounded-[2rem] border-primary/10 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Crie o seu presente</h1>
            <p className="text-foreground/60">Preencha os detalhes e insira suas melhores memórias.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fotos */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Fotos do Casal (Até 3)</label>
              
              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden glass border border-primary/20">
                    <img src={photo} alt={`Foto ${i+1}`} className="object-cover w-full h-full" />
                    <button 
                      type="button" 
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {photos.length < 3 && (
                  <label className="cursor-pointer aspect-square rounded-xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-background/50 text-foreground/50 hover:text-primary hover:bg-primary/5">
                    <ImagePlus className="w-6 h-6" />
                    <span className="text-xs">Adicionar</span>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Seu Nome</label>
                <input 
                  required
                  type="text" 
                  className="w-full h-12 px-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                  placeholder="Ex: Ana"
                  value={formData.name1}
                  onChange={e => setFormData({...formData, name1: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do seu Amor</label>
                <input 
                  required
                  type="text" 
                  className="w-full h-12 px-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                  placeholder="Ex: João"
                  value={formData.name2}
                  onChange={e => setFormData({...formData, name2: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quando o namoro começou?</label>
              <input 
                required
                type="date" 
                className="w-full h-12 px-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
                value={formData.startDate}
                onChange={e => setFormData({...formData, startDate: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mensagem de Declaração</label>
              <textarea 
                required
                rows={4}
                className="w-full p-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Escreva algo lindo que marque a história de vocês..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
               <label className="text-sm font-medium">Música Tema (Link do YouTube)</label>
              <input 
                type="url" 
                className="w-full h-12 px-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.youtubeUrl}
                onChange={e => setFormData({...formData, youtubeUrl: e.target.value})}
              />
              <p className="text-xs text-foreground/40">Opcional. A música tocará de fundo na página.</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/50">
               <label className="text-sm font-medium text-primary">Seu Melhor E-mail</label>
              <input 
                required
                type="email" 
                className="w-full h-12 px-4 bg-background/50 border border-primary/30 rounded-xl focus:outline-none focus:border-primary transition-colors"
                placeholder="Para onde enviaremos o QR Code Mágico?"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <p className="text-xs text-foreground/40 text-center mt-2">Você precisará deste e-mail para validar a compra.</p>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Continuar para Pagamento <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-foreground/40 mt-4">
                Lembre-se de não subir fotos gigantes para esta demonstração não travar!
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
