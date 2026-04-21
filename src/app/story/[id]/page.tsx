"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import { intervalToDuration } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type StoryData = {
  name1: string;
  name2: string;
  startDate: string;
  message: string;
  youtubeUrl: string;
  photos?: string[];
};

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<StoryData | null>(null);
  const [timePassed, setTimePassed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    async function loadStory() {
      const { data: story, error } = await supabase
        .from("presents")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !story) {
        console.error("Erro ao buscar presente:", error);
        router.push("/");
        return;
      }

      setData({
        name1: story.name1,
        name2: story.name2,
        startDate: story.start_date, // Mapeando snake_case para camelCase
        message: story.message,
        youtubeUrl: story.youtube_url,
        photos: story.photos
      });
    }

    if (params.id) {
      loadStory();
    }
  }, [params.id, router]);

  useEffect(() => {
    if (!data?.startDate) return;

    const start = new Date(data.startDate);
    
    // Heart Confetti on load
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e11d48', '#be123c', '#fb7185']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e11d48', '#be123c', '#fb7185']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Timer Interval
    const timer = setInterval(() => {
      const now = new Date();
      if (now < start) return; // Future date check

      const dur = intervalToDuration({ start, end: now });
      // Calculate seconds difference since intervalToDuration doesn't strictly keep exact live ticks sometimes if not formatted properly, but it usually does. 
      // Workaround for strict numbers:
      setTimePassed({
        years: dur.years || 0,
        months: dur.months || 0,
        days: dur.days || 0,
        hours: dur.hours || 0,
        minutes: dur.minutes || 0,
        seconds: dur.seconds || 0,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  if (!data) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
       <Heart className="w-8 h-8 text-primary animate-pulse" fill="currentColor" />
    </div>;
  }

  // Parse Youtube URL to embed if exists
  const getEmbedUrl = (url: string) => {
    try {
      if(url.includes("youtube.com/watch")) {
         const videoId = new URL(url).searchParams.get("v");
         return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1`;
      }
      if(url.includes("youtu.be/")) {
         const videoId = url.split("youtu.be/")[1]?.split("?")[0];
         return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1`;
      }
    } catch {
      return null;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(data.youtubeUrl);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-12">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <div className="z-10 w-full max-w-2xl text-center">
        <div className="flex items-center justify-center gap-4 mb-10 text-4xl md:text-6xl font-serif text-primary/90 glow-primary drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]">
          <span>{data.name1}</span>
          <Heart className="w-10 h-10 md:w-14 md:h-14 text-primary animate-pulse" fill="currentColor" />
          <span>{data.name2}</span>
        </div>

        {data.photos && data.photos.length > 0 && (
          <ImageCarousel photos={data.photos} />
        )}

        <div className="glass rounded-[2rem] p-8 md:p-12 mb-10 border-primary/20 shadow-2xl relative">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full border-primary/30 text-primary flex items-center gap-2 font-medium text-sm">
            <Clock className="w-4 h-4" />
            Nossa História
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10 mt-4">
            <TimeBox label="Anos" value={timePassed.years} />
            <TimeBox label="Meses" value={timePassed.months} />
            <TimeBox label="Dias" value={timePassed.days} />
            <TimeBox label="Horas" value={timePassed.hours} />
            <TimeBox label="Minutos" value={timePassed.minutes} />
            <TimeBox label="Segundos" value={timePassed.seconds} />
          </div>

          <div className="relative">
            <Heart className="absolute -top-4 -left-4 w-6 h-6 text-primary/20" fill="currentColor" />
            <Heart className="absolute -bottom-4 -right-4 w-6 h-6 text-primary/20" fill="currentColor" />
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-medium italic">
              "{data.message}"
            </p>
          </div>
        </div>

        {embedUrl && (
          <div className="mt-8 glass rounded-2xl p-4 overflow-hidden border-primary/10 max-w-md mx-auto aspect-video">
            <iframe 
              className="w-full h-full rounded-xl opacity-80 mix-blend-screen"
              src={embedUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        )}

      </div>
    </div>
  );
}

function TimeBox({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
      <div className="text-2xl md:text-3xl font-bold font-mono tracking-tighter text-primary">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-wider text-foreground/60 mt-1">
        {label}
      </div>
    </div>
  );
}

function ImageCarousel({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <div className="relative w-64 h-80 md:w-80 md:h-[400px] mb-10 mx-auto rounded-3xl overflow-hidden glass border-4 border-white/20 shadow-[0_0_40px_rgba(225,29,72,0.3)]">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={photos[index]}
          alt="Momento Inesquecível"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />
      </AnimatePresence>
      <FloatingHearts />
    </div>
  );
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: Math.random() * 80 + 10,
        delay: Math.random() * 5,
        size: Math.random() * 15 + 15,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-0 text-primary opacity-80 drop-shadow-md"
          initial={{ y: "150%", x: 0, opacity: 0 }}
          animate={{ 
            y: "-400%", 
            x: Math.sin(h.id) * 30, 
            opacity: [0, 1, 1, 0] 
          }}
          transition={{ 
            duration: 4 + Math.random() * 3, 
            repeat: Infinity, 
            delay: h.delay,
            ease: "linear"
          }}
          style={{ left: `${h.left}%` }}
        >
          <Heart width={h.size} height={h.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
