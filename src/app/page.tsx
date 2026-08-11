'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Palmtree } from 'lucide-react';

export default function BadgeBuilder() {
  const [name, setName] = useState('Ansh Mangesh Narkar');
  const [stack, setStack] = useState('Cloud & Gen AI');
  const [title, setTitle] = useState('Leader');
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

  // 🎨 REAL-TIME CANVAS RENDERING
  useEffect(() => {
    let isCancelled = false;

    const drawBadge = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1080;
      const height = 1350;
      canvas.width = width;
      canvas.height = height;

      // Color Palette
      const cCream = '#F9F6E8';
      const cDarkGreen = '#063A24';
      const cPink = '#E83262';
      const cYellow = '#F6C338';
      const cOrange = '#E87A24';

      // Base Background & Border
      ctx.fillStyle = cCream;
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 20;
      ctx.strokeStyle = cDarkGreen;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // Helper Functions
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

      // --- 1. GOAN TROPICAL BACKGROUND ELEMENTS ---
      
      // Bottom Sunset (Shrunk and pushed to the very bottom)
      ctx.fillStyle = cOrange;
      ctx.beginPath();
      ctx.arc(540, 1350, 120, Math.PI, 0);
      ctx.fill();
      
      // Ocean Waves over the sun
      ctx.strokeStyle = cCream;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(460, 1280); ctx.lineTo(620, 1280);
      ctx.moveTo(490, 1310); ctx.lineTo(590, 1310);
      ctx.stroke();

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

      // --- 2. MAIN HEADER ---
      drawText('HH GOA', 540, 220, '900 110px serif', cDarkGreen);
      // Hindi Overlay Shadow Trick
      ctx.save();
      ctx.shadowColor = '#FFF';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      drawText('गोवा', 540, 230, '900 90px sans-serif', cPink);
      ctx.restore();
      
      // Pushed 2026 higher so it doesn't overlap the photo
      drawText('2026', 540, 265, '900 45px sans-serif', cDarkGreen);

      // --- 3. SIDE GRAPHICS (Signs & Stickers) ---
      drawRotatedText('✦ 28 - 31 OCT 2026 ✦', 70, 550, 'bold 24px sans-serif', cPink, -90);
      drawRotatedText('✦ GOA, INDIA ✦', 1010, 550, 'bold 24px sans-serif', cPink, 90);

      // Left Directional Signs
      const signX = 170;
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(signX - 10, 400, 20, 250); 
      drawPill(signX - 80, 420, 160, 40, cYellow, cDarkGreen, 3, 5);
      drawText('BUILD', signX, 448, '900 20px sans-serif', cDarkGreen);
      drawPill(signX - 70, 480, 140, 40, cPink, cDarkGreen, 3, 5);
      drawText('SHIP', signX, 508, '900 20px sans-serif', '#FFF');
      drawPill(signX - 80, 540, 160, 40, cDarkGreen, '#FFF', 3, 5);
      drawText('REPEAT', signX, 568, '900 20px sans-serif', '#FFF');
      drawText('🏄‍♂️', signX - 40, 640, '60px sans-serif', '#000');

      // Right Let's Build Sticker
      drawRotatedText('LET\'S', 870, 430, '900 40px sans-serif', cOrange, -15);
      drawRotatedText('BUILD!', 880, 470, '900 40px sans-serif', cOrange, -15);
      drawText('🏡', 880, 580, '100px sans-serif', '#000');
      drawText('🛵', 820, 650, '70px sans-serif', '#000');

      // --- 4. PROFILE PHOTO MASKING ---
      const imgCenterY = 530;
      const imgRadius = 240; 
      
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
        await new Promise<void>((resolve) => { img.onload = () => resolve(); });
        
        if (isCancelled) return; 

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
      } else {
        ctx.beginPath();
        ctx.arc(540, imgCenterY, imgRadius, 0, Math.PI * 2);
        ctx.fillStyle = cCream;
        ctx.fill();
      }
      
      // Final Ring over the photo
      ctx.beginPath();
      ctx.arc(540, imgCenterY, imgRadius, 0, Math.PI * 2);
      ctx.lineWidth = 6;
      ctx.strokeStyle = cDarkGreen;
      ctx.stroke();

      if (!image) {
        drawText('📷', 540, imgCenterY + 20, '100px sans-serif', '#000');
      }

      // --- 5. NAME & TITLE BOXES ---
      drawPill(140, 830, 800, 90, cDarkGreen, cYellow, 5, 20);
      drawText(`✦   ${name.toUpperCase()}   ✦`, 540, 890, '900 46px sans-serif', '#FFF');

      drawPill(250, 930, 580, 70, cYellow, cDarkGreen, 4, 15);
      drawText(`⚡      ${title.toUpperCase()}      ⚡`, 540, 978, '900 32px sans-serif', cPink);

      ctx.beginPath();
      ctx.setLineDash([8, 8]);
      ctx.lineWidth = 3;
      ctx.strokeStyle = cDarkGreen;
      ctx.moveTo(100, 1030); ctx.lineTo(980, 1030);
      ctx.stroke();
      ctx.setLineDash([]); 

      // --- 6. STRUCTURED BOTTOM DATA GRID ---
      const boxY = 1050;
      const boxH = 170;
      const boxW = 260;
      
      // Box 1: Builder Class
      const b1X = 110;
      drawPill(b1X, boxY, boxW, boxH, '#FFF', cDarkGreen, 4, 20);
      drawText('✦ BUILDER CLASS ✦', b1X + boxW/2, boxY + 35, '900 16px sans-serif', cDarkGreen);
      const stackWords = stack.toUpperCase().split(' ');
      if (stackWords.length > 2) {
        drawText(stackWords.slice(0, 2).join(' '), b1X + boxW/2, boxY + 85, '900 24px sans-serif', cPink);
        drawText(stackWords.slice(2).join(' '), b1X + boxW/2, boxY + 120, '900 24px sans-serif', cPink);
      } else {
        drawText(stack.toUpperCase(), b1X + boxW/2, boxY + 105, '900 26px sans-serif', cPink);
      }

      // Box 2: Beach Bag
      const b2X = 410;
      drawPill(b2X, boxY, boxW, boxH, '#FFF', cDarkGreen, 4, 20);
      drawText('✦ BEACH BAG ✦', b2X + boxW/2, boxY + 35, '900 16px sans-serif', cDarkGreen);
      drawText('🥥', b2X + 50, boxY + 75, '26px sans-serif', '#000');
      drawText('COCONUT', b2X + 90, boxY + 68, 'bold 16px sans-serif', cDarkGreen, 'left');
      drawText('💻', b2X + 50, boxY + 115, '26px sans-serif', '#000');
      drawText('VS CODE', b2X + 90, boxY + 108, 'bold 16px sans-serif', cDarkGreen, 'left');
      drawText('🎧', b2X + 50, boxY + 155, '26px sans-serif', '#000');
      drawText('LO-FI BEATS', b2X + 90, boxY + 148, 'bold 16px sans-serif', cDarkGreen, 'left');

      // Box 3: Shipping & FrameInGoa
      const b3X = 710;
      drawPill(b3X, boxY, boxW, boxH, '#FFF', cDarkGreen, 4, 20);
      drawText('✦ SHIPPING ✦', b3X + boxW/2, boxY + 35, '900 16px sans-serif', cDarkGreen);
      const shipWords = shipping.toUpperCase().split(' ');
      if (shipWords.length > 2) {
        drawText(shipWords.slice(0, 2).join(' '), b3X + boxW/2, boxY + 80, '900 22px sans-serif', cPink);
        drawText(shipWords.slice(2).join(' '), b3X + boxW/2, boxY + 110, '900 22px sans-serif', cPink);
      } else {
        drawText(shipping.toUpperCase(), b3X + boxW/2, boxY + 95, '900 24px sans-serif', cPink);
      }
      drawText('#FRAMEINGOA', b3X + boxW/2, boxY + 150, '900 20px sans-serif', cDarkGreen);
      
      // Extra Goan flairs near the bottom
      drawText('🌴', 350, 1310, '60px sans-serif', '#000');
      drawText('🌴', 730, 1310, '60px sans-serif', '#000');
      drawText('🐦', 280, 220, '30px sans-serif', '#000');
      drawText('🐦', 800, 250, '20px sans-serif', '#000');

    };

    drawBadge();

    // Cleanup to prevent memory leaks if you type really fast
    return () => { isCancelled = true; };
  }, [name, stack, title, shipping, image]);

  const handleShare = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    const canvas = canvasRef.current;
    if (!canvas) { setIsGenerating(false); return; }

    // 1. Trigger Download Instantly
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `HH_GOA_26_${name.replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();

    // 2. Open Twitter with the pre-filled caption (No URL attached to text)
    const tweetText = encodeURIComponent(`Ticket punched for Hacker House Goa 2026! 🌴\n\nShipping: ${shipping}\nStack: ${stack}\n\nWho else is building from paradise? 👇⚡️\n\n#FrameInGoa #HHGoa2026`);
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    
    window.open(twitterIntentUrl, '_blank');
    
    setIsGenerating(false);
  };

  return (
    <main className="min-h-screen bg-[#F9F6E8] text-[#063A24] p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start min-h-[80vh]">
        
        {/* LEFT COLUMN: Input Form */}
        <div className="space-y-6 bg-white p-8 rounded-3xl border-4 border-[#063A24] shadow-[10px_10px_0px_#E83262] sticky top-8">
          <div>
            <h1 className="text-4xl font-black text-[#063A24] mb-2 uppercase tracking-tighter">
              HH <span className="text-[#E83262]">GOA 2026</span>
            </h1>
            <p className="text-sm font-bold text-[#E87A24] uppercase tracking-widest flex items-center gap-2">
              <Palmtree size={18} /> Builder Boarding Pass
            </p>
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
            onClick={handleShare}
            disabled={isGenerating}
            className={`w-full ${isGenerating ? 'bg-[#C11244] opacity-70 cursor-wait' : 'bg-[#E83262] hover:bg-[#C11244]'} text-white font-black text-lg py-5 rounded-xl uppercase tracking-widest transition-all active:translate-y-1 active:shadow-none shadow-[6px_6px_0px_#063A24] border-2 border-[#063A24] flex items-center justify-center gap-3`}
          >
            {isGenerating ? 'Punching Ticket...' : 'Generate & Share on X'}
          </button>
        </div>

        {/* RIGHT COLUMN: Real-Time Canvas Render */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative w-full max-w-[500px] border-[8px] border-[#063A24] rounded-2xl overflow-hidden shadow-[16px_16px_0px_rgba(6,58,36,0.15)] bg-white">
            <canvas 
              ref={canvasRef} 
              className="w-full h-auto block"
            />
          </div>
          <p className="text-[#063A24]/60 font-bold text-sm mt-6 text-center">
             Live preview. High-resolution 4:5 image generated on download.
          </p>
        </div>

      </div>
    </main>
  );
}
