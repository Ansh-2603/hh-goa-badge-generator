'use client';

import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

export default function BadgeBuilder() {
  const [name, setName] = useState('Ansh Mangesh');
  const [stack, setStack] = useState('Terminal Wizard');
  const [title, setTitle] = useState('Founder');
  const [shipping, setShipping] = useState('Building the Future');
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
        const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.8 });
        processedFile = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      }
      setImage(URL.createObjectURL(processedFile));
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
    if (!canvas) { setIsGenerating(false); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { setIsGenerating(false); return; }

    // 1. Poster Dimensions (1080x1350 is a great 4:5 social media ratio)
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    // Palette inspired by the reference
    const cCream = '#F9F6E8';
    const cDarkGreen = '#063A24';
    const cPink = '#E83262';
    const cYellow = '#F6C338';
    const cOrange = '#E87A24';

    // 2. Base Background & Border
    ctx.fillStyle = cCream;
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 20;
    ctx.strokeStyle = cDarkGreen;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Helpers
    const drawText = (text: string, x: number, y: number, font: string, color: string, align: CanvasTextAlign = 'center') => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.fillText(text, x, y);
    };

    const drawRotatedText = (text: string, x: number, y: number, font: string, color: string, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle * Math.PI / 180);
      drawText(text, 0, 0, font, color, 'center');
      ctx.restore();
    };

    const drawPill = (x: number, y: number, w: number, h: number, fill: string, stroke: string, lw = 4, radius = h/2) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.arcTo(x + w, y, x + w, y + radius, radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
      ctx.lineTo(x + radius, y + h);
      ctx.arcTo(x, y + h, x, y + h - radius, radius);
      ctx.lineTo(x, y + radius);
      ctx.arcTo(x, y, x + radius, y, radius);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.lineWidth = lw;
      ctx.strokeStyle = stroke;
      ctx.stroke();
    };

    // --- TOP SECTION ---
    
    // Top Left Stamp
    ctx.save();
    ctx.translate(140, 100);
    ctx.rotate(-10 * Math.PI / 180);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(-80, -60, 160, 120);
    ctx.lineWidth = 4;
    ctx.strokeStyle = cDarkGreen;
    ctx.strokeRect(-80, -60, 160, 120);
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(-70, -50, 140, 100);
    ctx.setLineDash([]);
    drawText('GOA', -25, -20, '900 24px sans-serif', cPink);
    drawText('INDIA', -25, 0, 'bold 16px sans-serif', cDarkGreen);
    drawText('🌴', 30, -5, '40px sans-serif', '#000');
    drawText('🌅', 0, 35, '40px sans-serif', '#000');
    ctx.restore();

    // Top Right Stamp (Circular)
    ctx.beginPath();
    ctx.arc(920, 100, 70, 0, Math.PI * 2);
    ctx.strokeStyle = cDarkGreen;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(920, 100, 60, 0, Math.PI * 2);
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
    drawText('🌴', 920, 115, '50px sans-serif', '#000');
    
    // Center Pink Tag
    drawPill(450, 0, 180, 140, cPink, cYellow, 6, 20);
    drawText('HH', 540, 50, '900 32px sans-serif', cYellow);
    drawText('GOA', 540, 90, '900 36px sans-serif', cYellow);
    drawText('2026', 540, 120, '900 24px sans-serif', '#FFF');

    // --- MAIN TITLE ---
    drawText('HACKER', 280, 240, '900 80px serif', cDarkGreen);
    drawText('HOUSE', 800, 240, '900 80px serif', cDarkGreen);
    // Hindi Overlay
    ctx.save();
    ctx.shadowColor = '#FFF';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    drawText('गोवा', 540, 240, '900 90px sans-serif', cPink);
    ctx.restore();

    // Some birds in the sky
    drawText('~', 200, 300, 'bold 30px sans-serif', cDarkGreen);
    drawText('~', 250, 280, 'bold 20px sans-serif', cDarkGreen);
    drawText('~', 850, 320, 'bold 30px sans-serif', cDarkGreen);

    // --- SIDE GRAPHICS (Simulated) ---
    // Left Vertical Text
    drawRotatedText('✦ 28 - 31 OCT 2026 ✦', 70, 550, 'bold 24px sans-serif', cPink, -90);
    // Right Vertical Text
    drawRotatedText('✦ GOA, INDIA ✦', 1010, 550, 'bold 24px sans-serif', cPink, 90);

    // Left Directional Signs
    const signX = 180;
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(signX - 10, 400, 20, 250); // Pole
    drawPill(signX - 80, 420, 160, 40, cYellow, cDarkGreen, 3, 5);
    drawText('BUILD', signX, 448, '900 20px sans-serif', cDarkGreen);
    drawPill(signX - 70, 480, 140, 40, cPink, cDarkGreen, 3, 5);
    drawText('SHIP', signX, 508, '900 20px sans-serif', '#FFF');
    drawPill(signX - 80, 540, 160, 40, cDarkGreen, '#FFF', 3, 5);
    drawText('REPEAT', signX, 568, '900 20px sans-serif', '#FFF');
    drawText('🏄‍♂️', signX - 40, 640, '60px sans-serif', '#000');

    // Right Let's Build Sticker
    drawRotatedText('LET\'S', 870, 450, '900 36px sans-serif', cDarkGreen, -15);
    drawRotatedText('BUILD!', 880, 490, '900 36px sans-serif', cDarkGreen, -15);
    // Right Side Emojis
    drawText('🏡', 880, 600, '120px sans-serif', '#000');
    drawText('🛵', 830, 660, '70px sans-serif', '#000');

    // --- PROFILE PHOTO ---
    const imgCenterY = 540;
    const imgRadius = 240; 
    
    // Outer Rings
    ctx.beginPath();
    ctx.arc(540, imgCenterY, 260, 0, Math.PI * 2);
    ctx.fillStyle = cYellow;
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = cDarkGreen;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(540, imgCenterY, 248, 0, Math.PI * 2);
    ctx.setLineDash([15, 10]);
    ctx.lineWidth = 6;
    ctx.strokeStyle = cPink;
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
          ctx.arc(540, imgCenterY, imgRadius, 0, Math.PI * 2);
          ctx.clip(); 
          const imgSize = imgRadius * 2;
          const scale = Math.max(imgSize / img.width, imgSize / img.height);
          const scaledW = img.width * scale;
          const scaledH = img.height * scale;
          const dx = 540 - (scaledW / 2);
          const dy = imgCenterY - (scaledH / 2);
          ctx.drawImage(img, dx, dy, scaledW, scaledH);
          ctx.restore();
          
          ctx.beginPath();
          ctx.arc(540, imgCenterY, imgRadius, 0, Math.PI * 2);
          ctx.lineWidth = 6;
          ctx.strokeStyle = cDarkGreen;
          ctx.stroke();
          resolve();
        };
      });
    } else {
      ctx.beginPath();
      ctx.arc(540, imgCenterY, imgRadius, 0, Math.PI * 2);
      ctx.fillStyle = cCream;
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = cDarkGreen;
      ctx.stroke();
      drawText('📷', 540, imgCenterY + 20, '100px sans-serif', '#000');
    }

    // --- NAME & TITLE BOXES ---
    // Name Box
    drawPill(200, 840, 680, 80, cDarkGreen, cYellow, 4, 15);
    drawText(`✦   ${name.toUpperCase()}   ✦`, 540, 895, '900 42px sans-serif', '#FFF');

    // Title Box
    drawPill(250, 930, 580, 70, cYellow, cDarkGreen, 4, 10);
    drawText(`⚡      ${title.toUpperCase()}      ⚡`, 540, 978, '900 32px sans-serif', cPink);

    // Divider Line
    ctx.beginPath();
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = cDarkGreen;
    ctx.moveTo(100, 1030); ctx.lineTo(980, 1030);
    ctx.stroke();
    ctx.setLineDash([]); 

    // --- BOTTOM GRID (3 Columns) ---
    // Col 1: Builder Class + QR
    drawText('✦ BUILDER CLASS ✦', 260, 1070, '900 18px sans-serif', cDarkGreen);
    
    // Process tech stack text (split into two lines if too long)
    const words = stack.toUpperCase().split(' ');
    if (words.length > 2) {
      drawText(words.slice(0, 2).join(' '), 260, 1110, '900 24px sans-serif', cPink);
      drawText(words.slice(2).join(' '), 260, 1140, '900 24px sans-serif', cPink);
    } else {
      drawText(stack.toUpperCase(), 260, 1120, '900 28px sans-serif', cPink);
    }

    // Simulated QR Code
    ctx.fillStyle = '#FFF';
    ctx.fillRect(180, 1170, 160, 160);
    ctx.lineWidth = 4;
    ctx.strokeStyle = cDarkGreen;
    ctx.strokeRect(180, 1170, 160, 160);
    // QR Anchors
    ctx.fillStyle = '#000';
    ctx.fillRect(190, 1180, 40, 40); ctx.fillStyle = '#FFF'; ctx.fillRect(200, 1190, 20, 20);
    ctx.fillStyle = '#000';
    ctx.fillRect(290, 1180, 40, 40); ctx.fillStyle = '#FFF'; ctx.fillRect(300, 1190, 20, 20);
    ctx.fillStyle = '#000';
    ctx.fillRect(190, 1280, 40, 40); ctx.fillStyle = '#FFF'; ctx.fillRect(200, 1290, 20, 20);
    drawText('🌴', 260, 1265, '35px sans-serif', '#000'); // Center flair

    // Col 2: Beach Bag
    drawText('✦ BEACH BAG ✦', 540, 1070, '900 18px sans-serif', cDarkGreen);
    drawText('🥥', 470, 1130, '36px sans-serif', '#000');
    drawText('COCONUT', 570, 1120, 'bold 20px sans-serif', cDarkGreen, 'left');
    drawText('💻', 470, 1190, '36px sans-serif', '#000');
    drawText('VS CODE', 570, 1180, 'bold 20px sans-serif', cDarkGreen, 'left');
    drawText('🎧', 470, 1250, '36px sans-serif', '#000');
    drawText('LO-FI BEATS', 570, 1240, 'bold 20px sans-serif', cDarkGreen, 'left');

    // Col 3: Currently Shipping + Barcode
    drawText('✦ CURRENTLY SHIPPING ✦', 820, 1070, '900 18px sans-serif', cDarkGreen);
    
    const shipWords = shipping.toUpperCase().split(' ');
    if (shipWords.length > 2) {
      drawText(shipWords.slice(0, 2).join(' '), 820, 1110, '900 24px sans-serif', cPink);
      drawText(shipWords.slice(2).join(' '), 820, 1140, '900 24px sans-serif', cPink);
    } else {
      drawText(shipping.toUpperCase(), 820, 1120, '900 28px sans-serif', cPink);
    }

    // Squiggly line
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = cDarkGreen;
    for (let i = 0; i < 200; i++) {
      ctx.lineTo(720 + i, 1170 + Math.sin(i * 0.1) * 5);
    }
    ctx.stroke();

    const builderId = `HH-GOA-${Math.floor(Math.random() * 9000) + 1000}`;
    drawText('BUILDER ID', 820, 1200, 'bold 16px sans-serif', cDarkGreen);
    drawText(`#${builderId}`, 820, 1225, 'bold 20px sans-serif', cDarkGreen);
    
    // Simulated Barcode
    ctx.fillStyle = '#000';
    for (let i = 0; i < 45; i++) {
      let bw = Math.random() > 0.5 ? 2 : 5;
      ctx.fillRect(720 + (i * 4.5), 1250, bw, 60);
    }

    // Footer decoration
    drawText('🌴 🌅 🌴', 540, 1340, '50px sans-serif', '#000');

    // 11. Trigger Download Instantly
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `HH_GOA_26_${name.replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();

    // 12. Upload to Vercel Blob & Trigger Twitter Share
    canvas.toBlob(async (blob) => {
      if (!blob) { setIsGenerating(false); return; }
      
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
          
          const tweetText = encodeURIComponent(`Ticket punched for Hacker House Goa 2026! 🌴\n\nShipping: ${shipping}\nStack: ${stack}\n\nWho else is building from paradise? 👇⚡️\n\n#FrameInGoa #HHGoa2026`);
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
    <main className="min-h-screen bg-[#F9F6E8] text-[#063A24] p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start min-h-[80vh]">
        
        {/* LEFT COLUMN: Input Form */}
        <div className="space-y-6 bg-white p-8 rounded-3xl border-4 border-[#063A24] shadow-[10px_10px_0px_#E83262] sticky top-8">
          <div>
            <h1 className="text-4xl font-black text-[#063A24] mb-2 uppercase tracking-tighter">
              Hacker House <span className="text-[#E83262]">Goa</span>
            </h1>
            <p className="text-sm font-bold text-[#E87A24] uppercase tracking-widest">Builder Boarding Pass</p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#063A24] mb-2 uppercase tracking-wider">Builder Name</label>
                <input 
                  type="text" 
                  value={name}
                  maxLength={18}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F9F6E8] border-2 border-[#063A24] rounded-xl p-3 text-[#063A24] font-bold focus:outline-none focus:border-[#E83262] transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#063A24] mb-2 uppercase tracking-wider">Builder Role</label>
                <input 
                  type="text" 
                  value={title}
                  maxLength={15}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#F9F6E8] border-2 border-[#063A24] rounded-xl p-3 text-[#063A24] font-bold focus:outline-none focus:border-[#E83262] transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#063A24] mb-2 uppercase tracking-wider">Builder Class</label>
                <input 
                  type="text" 
                  value={stack}
                  maxLength={20}
                  onChange={(e) => setStack(e.target.value)}
                  className="w-full bg-[#F9F6E8] border-2 border-[#063A24] rounded-xl p-3 text-[#063A24] font-bold focus:outline-none focus:border-[#E83262] transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#063A24] mb-2 uppercase tracking-wider">Currently Shipping</label>
                <input 
                  type="text" 
                  value={shipping}
                  maxLength={22}
                  onChange={(e) => setShipping(e.target.value)}
                  className="w-full bg-[#F9F6E8] border-2 border-[#063A24] rounded-xl p-3 text-[#063A24] font-bold focus:outline-none focus:border-[#E83262] transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#063A24] mb-2 uppercase tracking-wider">Profile Photo</label>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#063A24] hover:border-[#E83262] hover:bg-[#E83262]/5 rounded-xl cursor-pointer transition-all bg-[#F9F6E8]">
                <Upload className="text-[#E83262] mb-2" size={28} />
                <span className="text-sm font-bold text-[#063A24]">Upload your best photo</span>
                <span className="text-xs text-[#063A24]/60 mt-1">JPG, PNG, or HEIC</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <button 
            onClick={generateBadge}
            disabled={isGenerating}
            className={`w-full ${isGenerating ? 'bg-[#C11244] opacity-70 cursor-wait' : 'bg-[#E83262] hover:bg-[#C11244]'} text-white font-black text-lg py-5 rounded-xl uppercase tracking-widest transition-all active:translate-y-1 active:shadow-none shadow-[6px_6px_0px_#063A24] border-2 border-[#063A24] flex items-center justify-center gap-3`}
          >
            {isGenerating ? 'Punching Ticket...' : 'Generate & Share on X'}
          </button>
        </div>

        {/* RIGHT COLUMN: The Visual Output (Scaled down preview) */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative w-full max-w-[480px] aspect-[4/5] bg-[#F9F6E8] border-[8px] border-[#063A24] rounded-lg overflow-hidden shadow-[16px_16px_0px_rgba(6,58,36,0.15)] pointer-events-none">
            
            {/* Real-time Preview mimicking the Canvas layout */}
            <div className="absolute inset-0 p-4 flex flex-col items-center">
               <div className="w-32 h-12 bg-[#E83262] border-2 border-[#F6C338] rounded-b-xl flex items-center justify-center mb-6 shadow-md">
                 <span className="text-white font-black text-xs">HH GOA 2026</span>
               </div>
               
               <h2 className="text-3xl font-black text-[#063A24] font-serif uppercase tracking-tight text-center leading-none">
                 Hacker<br/>House
               </h2>
               <div className="absolute top-24 text-3xl font-black text-[#E83262] opacity-90 drop-shadow-md">गोवा</div>

               <div className="mt-8 w-44 h-44 rounded-full border-4 border-[#F6C338] bg-[#F9F6E8] overflow-hidden relative shadow-lg">
                 <div className="absolute inset-0 border-4 border-dashed border-[#E83262] rounded-full z-10 m-1"></div>
                 {image ? (
                   <img src={image} className="w-full h-full object-cover" alt="Preview" />
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-[#063A24]/30">
                     <ImageIcon size={48} />
                   </div>
                 )}
               </div>

               <div className="mt-8 w-11/12 bg-[#063A24] border-2 border-[#F6C338] rounded-full py-2 text-center shadow-md">
                 <span className="text-white font-black uppercase tracking-wider text-sm">✦ {name} ✦</span>
               </div>
               <div className="mt-2 w-3/4 bg-[#F6C338] border-2 border-[#063A24] rounded-full py-1.5 text-center shadow-md">
                 <span className="text-[#E83262] font-black uppercase text-xs">⚡ {title} ⚡</span>
               </div>

               {/* Grid Preview */}
               <div className="mt-auto w-full grid grid-cols-3 gap-2 border-t-2 border-dashed border-[#063A24] pt-4">
                 <div className="text-center border-r-2 border-dashed border-[#063A24]/30">
                   <div className="text-[8px] font-bold text-[#E83262]">✦ CLASS ✦</div>
                   <div className="text-[10px] font-black text-[#063A24] leading-tight">{stack}</div>
                 </div>
                 <div className="text-center border-r-2 border-dashed border-[#063A24]/30">
                   <div className="text-[8px] font-bold text-[#E83262]">✦ BAG ✦</div>
                   <div className="text-[10px] font-black text-[#063A24]">🥥 💻 🎧</div>
                 </div>
                 <div className="text-center">
                   <div className="text-[8px] font-bold text-[#E83262]">✦ SHIPPING ✦</div>
                   <div className="text-[10px] font-black text-[#063A24] leading-tight">{shipping}</div>
                 </div>
               </div>
            </div>
          </div>
          
          <p className="text-[#063A24]/60 font-bold text-sm mt-6 text-center">
             High-resolution 4:5 image generated on download.
          </p>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>

      </div>
    </main>
  );
}
