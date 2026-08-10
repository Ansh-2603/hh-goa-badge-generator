'use client';

import { useState, useRef } from 'react';
import { Upload, Palmtree } from 'lucide-react';

export default function BadgeBuilder() {
  const [name, setName] = useState('Ansh Mangesh Narkar');
  const [stack, setStack] = useState('Cloud & Gen AI');
  const [title, setTitle] = useState('Platform Architect');
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      let processedFile: Blob | File = file;
      
      if (file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic') {
        const heic2any = (await import('heic2any')).default;
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8
        });
        processedFile = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      }

      const imageUrl = URL.createObjectURL(processedFile);
      setImage(imageUrl);
      
    } catch (error) {
      console.error("Error processing image:", error);
      alert("There was an issue processing that image. Please try a standard JPG or PNG.");
    } finally {
      e.target.value = '';
    }
  };

  const generateBadge = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsGenerating(false);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    // 1. High-Res Canvas Dimensions (2x scale)
    const width = 840;
    const height = 1160;
    canvas.width = width;
    canvas.height = height;

    // Colors
    const cDarkGreen = '#064E3B';
    const cOrange = '#F97316';
    const cTeal = '#0D9488';
    const cYellow = '#FCD34D';
    const cBg = '#FFFFFF';

    // 2. Base Card Background
    ctx.fillStyle = cBg;
    ctx.fillRect(0, 0, width, height);

    // 3. Card Outer Border
    ctx.lineWidth = 16;
    ctx.strokeStyle = cDarkGreen;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Helpers
    const drawText = (text: string, x: number, y: number, font: string, color: string, align: CanvasTextAlign = 'center') => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.fillText(text, x, y);
    };

    const drawPill = (x: number, y: number, w: number, h: number, fill: string, stroke: string) => {
      const r = h / 2;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = stroke;
      ctx.stroke();
    };

    // 4. Top Header & Accents
    drawText('MADGAON', width / 2, 140, '900 80px serif', cDarkGreen);
    drawText('COAST', width / 2, 200, '900 48px serif', cOrange);
    
    drawPill(width / 2 - 190, 230, 380, 50, cTeal, cDarkGreen);
    drawText('HH GOA 2026 • OCT 28-31', width / 2, 262, '900 20px sans-serif', '#FFFFFF');

    ctx.beginPath();
    ctx.arc(100, 100, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#E0F2FE';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = cTeal;
    ctx.stroke();
    drawText('🌴', 100, 115, '40px sans-serif', '#000');
    drawText('🌺', 740, 100, '60px sans-serif', '#000');

    // 5. Name Banner Background
    ctx.fillStyle = cDarkGreen;
    ctx.fillRect(0, 680, width, 120);
    ctx.beginPath();
    ctx.moveTo(0, 680); ctx.lineTo(width, 680);
    ctx.moveTo(0, 800); ctx.lineTo(width, 800);
    ctx.lineWidth = 8;
    ctx.strokeStyle = cOrange;
    ctx.stroke();

    drawText(name.toUpperCase(), width / 2, 755, '900 48px sans-serif', '#FFFFFF');

    const titleWidth = 440;
    drawPill(width / 2 - (titleWidth / 2), 775, titleWidth, 60, cYellow, cDarkGreen);
    drawText(`🌊 ${title.toUpperCase()} 🌊`, width / 2, 815, '900 24px sans-serif', cDarkGreen);

    // 6. Draw Grid Dividers
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(6, 78, 59, 0.3)';
    ctx.moveTo(0, 880); ctx.lineTo(width, 880); 
    ctx.moveTo(width / 2, 880); ctx.lineTo(width / 2, 1080); 
    ctx.stroke();
    ctx.setLineDash([]); 

    // 7. Left Column
    drawText('✦ BUILDER CLASS ✦', width / 4, 930, '900 20px sans-serif', cOrange);
    drawText(stack.toUpperCase(), width / 4, 970, '900 28px sans-serif', cDarkGreen);
    
    drawText('✦ CURRENT VIBE ✦', width / 4, 1030, '900 20px sans-serif', cTeal);
    drawText('FULL SUSHEGAD', width / 4, 1070, '900 24px sans-serif', cDarkGreen);

    // 8. Right Column
    drawText('✦ TROPICAL TOTE ✦', (width / 4) * 3, 930, '900 20px sans-serif', cOrange);
    drawText('🥥 Tender Coconut', (width / 4) * 3, 975, 'bold 24px sans-serif', cDarkGreen);
    drawText('🥘 Goan Ros Omelette', (width / 4) * 3, 1025, 'bold 24px sans-serif', cDarkGreen);
    drawText('💻 Code Editor', (width / 4) * 3, 1075, 'bold 24px sans-serif', cDarkGreen);

    // 9. Footer Ribbon
    ctx.fillStyle = cOrange;
    ctx.fillRect(0, 1100, width, 60);
    ctx.beginPath();
    ctx.moveTo(0, 1100); ctx.lineTo(width, 1100);
    ctx.lineWidth = 8;
    ctx.strokeStyle = cDarkGreen;
    ctx.stroke();
    drawText('#FRAMEINGOA', width / 2, 1140, '900 28px sans-serif', '#FFFFFF');

    // 10. Circular Profile Photo
    const imgCenterY = 480;
    const imgRadius = 180; 
    
    ctx.beginPath();
    ctx.arc(width / 2, imgCenterY, 210, 0, Math.PI * 2);
    ctx.setLineDash([20, 15]);
    ctx.lineWidth = 12;
    ctx.strokeStyle = cOrange;
    ctx.stroke();
    ctx.setLineDash([]);

    if (image) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = image;
      
      await new Promise<void>((resolve) => {
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(width / 2, imgCenterY, imgRadius, 0, Math.PI * 2);
          ctx.clip(); 

          const imgSize = imgRadius * 2;
          const scale = Math.max(imgSize / img.width, imgSize / img.height);
          const scaledW = img.width * scale;
          const scaledH = img.height * scale;
          const dx = (width / 2) - (scaledW / 2);
          const dy = imgCenterY - (scaledH / 2);

          ctx.drawImage(img, dx, dy, scaledW, scaledH);
          ctx.restore();

          ctx.beginPath();
          ctx.arc(width / 2, imgCenterY, imgRadius, 0, Math.PI * 2);
          ctx.lineWidth = 10;
          ctx.strokeStyle = cDarkGreen;
          ctx.stroke();

          resolve();
        };
      });
    } else {
      ctx.beginPath();
      ctx.arc(width / 2, imgCenterY, imgRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFBEB';
      ctx.fill();
      ctx.lineWidth = 10;
      ctx.strokeStyle = cDarkGreen;
      ctx.stroke();
      drawText('🥥', width / 2, imgCenterY, '80px sans-serif', '#000');
    }

    // 11. Trigger Download Instantly
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `HH_GOA_26_${name.replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();

    // 12. Upload to Vercel Blob & Trigger Twitter Share
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setIsGenerating(false);
        return;
      }
      
      const formData = new FormData();
      formData.append('file', blob, `badge.png`);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await res.json();
        
        if (data.url) {
          const baseUrl = window.location.origin;
          const sharePageUrl = `${baseUrl}/share?img=${encodeURIComponent(data.url)}`;
          
          const tweetText = encodeURIComponent("Just secured my Tropical Pass for Hacker House Goa 2026! 🌴 Drop your tech stack in the replies or quote tweet with yours! #FrameInGoa");
          const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(sharePageUrl)}`;
          
          window.open(twitterIntentUrl, '_blank');
        }
      } catch (error) {
        console.error("Failed to upload for sharing:", error);
      } finally {
        setIsGenerating(false);
      }
    }, 'image/png');
  };

  return (
    <main className="min-h-screen bg-[#FFFBEB] text-[#064E3B] p-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        
        {/* LEFT COLUMN: Input Form */}
        <div className="space-y-8 bg-white p-8 rounded-2xl border-2 border-[#064E3B] shadow-[8px_8px_0px_#F97316]">
          <div>
            <h1 className="text-3xl font-black text-[#064E3B] mb-2 flex items-center gap-3 uppercase tracking-tight">
              <Palmtree className="text-[#F97316]" size={32} />
              Tropical Check-In
            </h1>
            <p className="text-sm font-bold text-[#0D9488] uppercase tracking-widest">HH Goa 2026 • Madgaon Coast</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#F97316] mb-1 uppercase tracking-wider">Builder Name</label>
              <input 
                type="text" 
                value={name}
                maxLength={20}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FFFBEB] border-2 border-[#064E3B] rounded-lg p-3 text-[#064E3B] font-bold focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F97316] mb-1 uppercase tracking-wider">Tech Stack (Short)</label>
              <input 
                type="text" 
                value={stack}
                maxLength={20}
                onChange={(e) => setStack(e.target.value)}
                className="w-full bg-[#FFFBEB] border-2 border-[#064E3B] rounded-lg p-3 text-[#064E3B] font-bold focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F97316] mb-1 uppercase tracking-wider">Upload Portrait</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#064E3B] hover:border-[#F97316] hover:bg-[#F97316]/5 rounded-lg cursor-pointer transition-all">
                <Upload className="text-[#064E3B] mb-2" />
                <span className="text-sm font-bold text-[#064E3B]">Click to upload</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <button 
            onClick={generateBadge}
            disabled={isGenerating}
            className={`w-full ${isGenerating ? 'bg-[#EA580C] opacity-70 cursor-wait' : 'bg-[#F97316] hover:bg-[#EA580C]'} text-white font-black py-4 rounded-lg uppercase tracking-widest transition-all active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_#064E3B] border-2 border-[#064E3B]`}
          >
            {isGenerating ? 'Processing...' : 'Generate Pass & Share'}
          </button>
        </div>

        {/* RIGHT COLUMN: The Visual Output */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-[420px] bg-white border-[4px] border-[#064E3B] rounded-[2rem] pt-6 px-6 pb-16 relative overflow-hidden shadow-[12px_12px_0px_rgba(6,78,59,0.15)] flex flex-col items-center">
            
            <div className="w-full flex flex-col items-center mb-6 relative">
              <div className="absolute left-0 top-2 w-10 h-10 border-2 border-[#0D9488] rounded-full flex items-center justify-center text-[#0D9488] transform rotate-12 opacity-80 bg-[#E0F2FE]">
                <span className="text-sm font-black">🌴</span>
              </div>
              <div className="absolute right-0 top-0 text-3xl opacity-80 animate-pulse">
                🌺
              </div>
              
              <h2 className="text-4xl font-black text-[#064E3B] tracking-tighter uppercase font-serif relative z-10 text-center">
                MADGAON <br/><span className="text-[#F97316] text-2xl">COAST</span>
              </h2>
              <div className="bg-[#0D9488] text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-5 rounded-full mt-2 border-2 border-[#064E3B] shadow-[2px_2px_0px_#064E3B]">
                HH GOA 2026 • OCT 28-31
              </div>
            </div>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 border-[6px] border-dotted border-[#F97316] rounded-full scale-110 animate-[spin_40s_linear_infinite]"></div>
              
              <div className="w-48 h-48 bg-[#FFFBEB] rounded-full border-[5px] border-[#064E3B] overflow-hidden relative z-10 flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.2)]">
                {image ? (
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <span className="text-4xl block mb-1">🥥</span>
                    <span className="font-bold text-[#064E3B]/40 text-sm">NO PHOTO</span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-[110%] flex flex-col items-center gap-3 mb-6">
              <div className="bg-[#064E3B] text-white w-full text-center py-2.5 border-y-4 border-[#F97316] shadow-[0_4px_0px_#0D9488]">
                <h3 className="text-2xl font-black uppercase tracking-widest">{name}</h3>
              </div>
              <div className="bg-[#FCD34D] text-[#064E3B] px-8 py-1 rounded-full border-2 border-[#064E3B] font-black text-sm uppercase flex gap-2 items-center shadow-[2px_2px_0px_#064E3B]">
                <span>🌊</span> {title} <span>🌊</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 border-t-[3px] border-dashed border-[#064E3B]/30 pt-4">
              <div className="text-center border-r-[3px] border-dashed border-[#064E3B]/30 pr-4">
                <div className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest mb-1">✦ BUILDER CLASS ✦</div>
                <div className="font-black text-[#064E3B] text-sm uppercase leading-tight mb-3">{stack}</div>
                
                <div className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest mb-1">✦ CURRENT VIBE ✦</div>
                <div className="font-black text-[#064E3B] text-xs uppercase">Full Sushegad</div>
              </div>

              <div className="pl-2">
                 <div className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest mb-2 text-center">✦ TROPICAL TOTE ✦</div>
                 <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-xs font-bold text-[#064E3B]"><span className="text-lg leading-none">🥥</span> Tender Coconut</div>
                    <div className="flex items-center gap-3 text-xs font-bold text-[#064E3B]"><span className="text-lg leading-none">🥘</span> Goan Ros Omelette</div>
                    <div className="flex items-center gap-3 text-xs font-bold text-[#064E3B]"><span className="text-lg leading-none">💻</span> Code Editor</div>
                 </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full bg-[#F97316] text-white text-center py-2.5 font-black text-sm tracking-widest border-t-[4px] border-[#064E3B]">
              #FRAMEINGOA
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>

      </div>
    </main>
  );
}
