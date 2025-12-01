import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, Trash2, Activity, Target, Wind, ArrowRight, List, RefreshCw, 
  Moon, Sun, HelpCircle, X, GitBranch, Split, Anchor, BookOpen, 
  PenLine, Calendar, Map, Compass, Tent, Footprints, Sparkles, 
  Navigation, ChevronRight, ChevronLeft,
  // 新增的圖示元件
  Home, Building2, Store, Trees, CloudFog, Mountain
} from 'lucide-react';

// --- 元件與工具函式 ---

const Card = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-600' : ''} ${className}`}
  >
    {children}
  </div>
);

// 說明視窗元件 (多步驟導覽)
const IntroModal = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "旅人，歡迎來到都市叢林",
      icon: <Compass className="w-6 h-6" />,
      colorClass: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
      content: (
        <>
          生活就像一座巨大的迷宮。有些地方是你的<b>安全屋</b>（可控），有些則是充滿迷霧的<b>未知邊境</b>（關注）。
          <br/><br/>
          在這個都市叢林中，你需要一個可靠的羅盤來指引方向，找回屬於你的生活節奏。
        </>
      )
    },
    {
      title: "解讀羅盤",
      icon: <Target className="w-6 h-6" />,
      colorClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      content: (
        <>
          羅盤上的同心圓代表你<b>控制的範疇</b>。
          <br/><br/>
          <ul className="list-disc list-inside text-left space-y-1 ml-2">
            <li><b>內圈 (綠色)</b>：完全可控的安全屋。</li>
            <li><b>外圈 (紅色)</b>：不可控的迷霧邊境。</li>
          </ul>
          <br/>
          辨識出哪些事情在內、哪些在外，是停止焦慮的第一步。
        </>
      )
    },
    {
      title: "善用規劃桌",
      icon: <Map className="w-6 h-6" />,
      colorClass: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      content: (
        <>
          當煩惱落在不可控的迷霧區時，不要硬闖。
          <br/><br/>
          進入<b>規劃桌</b>，將巨大的煩惱<b>拆解</b>成部分可控的小行動。將不可控轉化為可控，就是你在這座叢林中的生存之道。
        </>
      )
    },
    {
      title: "開始你的旅程",
      icon: <Plus className="w-6 h-6" />,
      colorClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      content: (
        <>
          準備好了嗎？
          <br/><br/>
          點擊右上角的<b>「+ 新增」</b>來標記你的第一個煩惱或發現，開始累積你的探索<b>里程</b>吧！
        </>
      )
    }
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const nextStep = () => {
    if (isLastStep) {
      onClose();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-800 transform transition-all scale-100 animate-in zoom-in-95 duration-300 relative flex flex-col min-h-[400px]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Content Area */}
        <div key={step} className="flex-1 flex flex-col items-center text-center animate-in slide-in-from-right-4 fade-in duration-300"> 
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm ${currentStep.colorClass}`}>
             {currentStep.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{currentStep.title}</h3>
          <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-6 text-justify w-full">
            {currentStep.content}
          </div>
        </div>

        {/* Navigation Area */}
        <div className="mt-auto">
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === step ? 'w-6 bg-slate-800 dark:bg-slate-200' : 'bg-slate-300 dark:bg-slate-700'}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button 
                onClick={prevStep}
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-3 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                上一步
              </button>
            )}
            <button 
              onClick={nextStep}
              className={`flex-1 ${isLastStep ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-900 hover:bg-slate-800'} dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-3 rounded-xl font-medium transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2`}
            >
              {isLastStep ? (
                <>開始探險 <Compass className="w-4 h-4" /></>
              ) : (
                <>下一步 <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 核心演算法
const calculateControlScore = (agency, predictability, external) => {
  const weightedScore = (agency * 0.5) + (predictability * 0.3) + ((100 - external) * 0.2);
  return Math.round(weightedScore);
};

// 更新區域名稱為都市探險主題
const getZone = (score) => {
  if (score >= 75) return { 
    id: 'control', 
    name: '安全屋 (可控)', 
    colorClass: 'bg-emerald-500', 
    textClass: 'text-emerald-700 dark:text-emerald-400', 
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderClass: 'border-emerald-100 dark:border-emerald-900/50',
    desc: '這是你的地盤。在這裡你很安全，可以自在地行動。',
    icon: <Home className="w-5 h-5" /> // 改為房子圖示
  };
  if (score >= 40) return { 
    id: 'influence', 
    name: '街頭探索 (影響)', 
    colorClass: 'bg-amber-500', 
    textClass: 'text-amber-700 dark:text-amber-400', 
    bgClass: 'bg-amber-50 dark:bg-amber-950/40',
    borderClass: 'border-amber-100 dark:border-amber-900/50',
    desc: '街道上充滿變數。保持警覺，隨機應變，享受過程。',
    icon: <Building2 className="w-5 h-5" /> // 改為大樓圖示
  };
  return { 
    id: 'concern', 
    name: '迷霧邊境 (關注)', 
    colorClass: 'bg-rose-500', 
    textClass: 'text-rose-700 dark:text-rose-400', 
    bgClass: 'bg-rose-50 dark:bg-rose-950/40',
    borderClass: 'border-rose-100 dark:border-rose-900/50',
    desc: '前方迷霧重重（不可控）。先停下來繪製地圖（拆解），不要迷失方向。',
    icon: <CloudFog className="w-5 h-5" /> // 改為迷霧圖示
  };
};

const calculateDistance = (score) => {
  if (score >= 75) {
    const normalized = (score - 75) / 25; 
    return 13 - (10 * normalized);
  } else if (score >= 40) {
    const normalized = (score - 40) / 35; 
    return 30 - (10 * normalized);
  } else {
    const normalized = score / 40; 
    return 46 - (9 * normalized);
  }
};

// --- Dashboard Component ---
const Dashboard = ({ items, startAdd, startDeconstruct, deleteItem, toggleTheme, isDark, onShowIntro, miles, startWriteLog, viewLogs }) => {
  const [tab, setTab] = useState('compass'); // compass, list, deconstruct

  // 預先計算所有點的座標，並加入「防重疊」的物理模擬
  const itemCoords = useMemo(() => {
    // 1. 初始化節點位置
    let nodes = items.map((item) => {
      const distance = calculateDistance(item.score);
      // 如果沒有儲存角度，則隨機生成
      const angle = item.angle !== undefined ? item.angle : Math.random() * 2 * Math.PI;
      return { ...item, distance, currentAngle: angle };
    });

    const iterations = 15; // 迭代次數
    const minPixelDist = 10; // 最小間距 (模擬像素距離，這裡以百分比近似)

    // 2. 簡單的力導向迭代
    for (let i = 0; i < iterations; i++) {
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const nodeA = nodes[a];
          const nodeB = nodes[b];

          // 轉換為極座標系下的近似距離比較 (簡化版)
          // 這裡為了效能，我們在極座標上做簡單的斥力推擠
          // 實際上應該轉成笛卡爾座標計算距離，再轉回極座標，但這裡為了保持 distance (Score) 不變，只調整 Angle

          // 簡單轉笛卡爾估算距離
          const ax = 50 + nodeA.distance * Math.cos(nodeA.currentAngle);
          const ay = 50 + nodeA.distance * Math.sin(nodeA.currentAngle);
          const bx = 50 + nodeB.distance * Math.cos(nodeB.currentAngle);
          const by = 50 + nodeB.distance * Math.sin(nodeB.currentAngle);

          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < minPixelDist) {
            // 太近了，推開
            let angleDiff = nodeA.currentAngle - nodeB.currentAngle;
            // 正規化角度差
            while (angleDiff <= -Math.PI) angleDiff += 2 * Math.PI;
            while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
            if (Math.abs(angleDiff) < 0.001) angleDiff = 0.1; // 避免除以零

            // 推開的幅度與半徑有關，半徑越小(越靠近中心)，角度變化對應的位移越小，所以需要轉動更多角度
            const rA = Math.max(nodeA.distance, 1);
            const rB = Math.max(nodeB.distance, 1);
            
            const pushAngleA = (0.2 / rA); 
            const pushAngleB = (0.2 / rB);

            if (angleDiff > 0) {
              nodeA.currentAngle += pushAngleA;
              nodeB.currentAngle -= pushAngleB;
            } else {
              nodeA.currentAngle -= pushAngleA;
              nodeB.currentAngle += pushAngleB;
            }
          }
        }
      }
    }

    // 3. 計算最終渲染座標 (百分比)
    return nodes.map(node => ({
      ...node,
      x: 50 + node.distance * Math.cos(node.currentAngle),
      y: 50 + node.distance * Math.sin(node.currentAngle)
    }));
  }, [items]);

  // 篩選出可解構的項目
  const deconstructableItems = items.filter(i => i.score < 75 && !i.parentId);
  const pendingDeconstructionCount = deconstructableItems.filter(item => {
    const childCount = items.filter(child => child.parentId === item.id).length;
    return childCount < 2;
  }).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            都市羅盤
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">
             在水泥叢林中找回你的方向。
          </p>
        </div>
        
        {/* 里程顯示 (原戰功/金幣) */}
        <div className="flex flex-col items-end gap-2">
          <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 px-3 py-1.5 rounded-full flex items-center gap-2 font-bold shadow-sm border border-amber-200 dark:border-amber-700" title="累積里程">
            <Footprints className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{miles} km</span>
          </div>
        </div>
      </header>
      
      <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={onShowIntro}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="探險指南"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title={isDark ? "切換亮色模式" : "切換深色模式"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={startWriteLog}
            className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-full shadow transition-all active:scale-95 flex items-center gap-2 font-medium"
            title="撰寫旅程隨筆"
          >
            <PenLine className="w-4 h-4" /> 筆記
          </button>

          <button 
            onClick={() => startAdd()}
            className="bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg transition-all active:scale-95 flex items-center gap-2 font-medium"
            title="新增煩惱"
          >
            <Plus className="w-5 h-5" /> 新增
          </button>
      </div>

      {/* 統計摘要 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/50 text-center transition-colors">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {items.filter(i => getZone(i.score).id === 'control').length}
          </div>
          <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">安全屋</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-100 dark:border-amber-900/50 text-center transition-colors">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {items.filter(i => getZone(i.score).id === 'influence').length}
          </div>
          <div className="text-xs text-amber-800 dark:text-amber-300 font-medium">街頭探索</div>
        </div>
        <div className="bg-rose-50 dark:bg-rose-950/30 p-3 rounded-xl border border-rose-100 dark:border-rose-900/50 text-center transition-colors">
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {items.filter(i => getZone(i.score).id === 'concern').length}
          </div>
          <div className="text-xs text-rose-700 dark:text-rose-400 font-medium">迷霧邊境</div>
        </div>
      </div>

      {/* 視圖切換 */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-4 transition-colors">
        <button 
          onClick={() => setTab('compass')}
          className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-all ${
            tab === 'compass' 
              ? 'bg-white dark:bg-slate-700 shadow text-slate-800 dark:text-slate-100' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Compass className="w-4 h-4" /> 羅盤
        </button>
        <button 
          onClick={() => setTab('list')}
          className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-all ${
            tab === 'list' 
              ? 'bg-white dark:bg-slate-700 shadow text-slate-800 dark:text-slate-100' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <List className="w-4 h-4" /> 探索清單
        </button>
        <button 
          onClick={() => setTab('deconstruct')}
          className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-all relative ${
            tab === 'deconstruct' 
              ? 'bg-white dark:bg-slate-700 shadow text-slate-800 dark:text-slate-100' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Map className="w-4 h-4" /> 
          規劃桌
          {pendingDeconstructionCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-800">
              {pendingDeconstructionCount}
            </span>
          )}
        </button>
      </div>

      {tab === 'compass' && (
        <div className="relative aspect-square max-w-sm mx-auto mt-8 mb-4">
          {/* 雷達背景 (羅盤) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* 1. 最外圈 (迷霧/關注) - 紅色 */}
            <div className="w-full h-full rounded-full bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30 flex items-center justify-center transition-colors relative overflow-hidden">
               
               {/* 裝飾圖案 - 迷霧區 (顏色加深) */}
               <CloudFog className="absolute top-4 left-1/4 w-8 h-8 text-rose-600/50" />
               <Trees className="absolute bottom-8 right-8 w-6 h-6 text-rose-600/50" />
               <Trees className="absolute top-1/3 right-2 w-5 h-5 text-rose-600/50" />
               <Mountain className="absolute bottom-1/4 left-4 w-5 h-5 text-rose-600/50" />
               <CloudFog className="absolute bottom-4 left-1/2 w-6 h-6 text-rose-600/50" />

               {/* 掃描線效果：紅色 */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/10 to-transparent animate-spin-slow opacity-0 dark:opacity-20" style={{animationDuration: '6s'}}></div>
               
              {/* 2. 中間圈 (街頭/影響) - 黃色 */}
              <div className="w-2/3 h-2/3 rounded-full bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 shadow-sm flex items-center justify-center transition-colors relative">
                 
                 {/* 裝飾圖案 - 街頭區 (顏色加深) */}
                 <Building2 className="absolute top-8 left-4 w-5 h-5 text-amber-600/50" />
                 <Store className="absolute bottom-6 right-6 w-5 h-5 text-amber-600/50" />
                 <Building2 className="absolute top-1/4 right-3 w-4 h-4 text-amber-600/50" />

                {/* 3. 最內圈 (安全屋/控制) - 綠色 */}
                <div className="w-1/2 h-1/2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 shadow-inner flex items-center justify-center transition-colors relative">
                  
                  {/* 裝飾圖案 - 安全屋 (顏色加深) */}
                  <Home className="absolute w-8 h-8 text-emerald-600/50" />
                </div>
              </div>
            </div>
          </div>

          {/* 日誌入口 (在雷達容器右上角) */}
          <button
            onClick={viewLogs}
            className="absolute top-2 right-2 z-20 p-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all pointer-events-auto group"
            title="旅程隨筆"
          >
            <BookOpen className="w-5 h-5" />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-xs font-bold bg-slate-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              翻閱筆記
            </span>
          </button>

          {/* 連線 SVG 層 */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {itemCoords.map(item => {
              if (!item.parentId) return null;
              const parent = itemCoords.find(p => p.id === item.parentId);
              if (!parent) return null;
              return (
                <line 
                  key={`line-${item.id}`}
                  x1={`${parent.x}%`} y1={`${parent.y}%`}
                  x2={`${item.x}%`} y2={`${item.y}%`}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-slate-300 dark:text-slate-600 opacity-60"
                  strokeDasharray="4 2"
                />
              );
            })}
          </svg>

          {/* 資料點 */}
          {itemCoords.map((item) => {
            const zone = getZone(item.score);
            const displayTitle = item.title.length > 5 ? item.title.slice(0, 5) + '...' : item.title;
            const isChild = !!item.parentId;

            return (
              <div 
                key={item.id}
                className="absolute group z-10"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                <div 
                  className={`absolute -ml-2 -mt-2 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 shadow-md cursor-pointer transform transition-transform hover:scale-150 ${zone.colorClass} ${isChild ? 'ring-2 ring-white dark:ring-slate-800 ring-offset-1 ring-offset-slate-200 dark:ring-offset-slate-700' : ''}`}
                  title={`${item.title} (${item.score}%) ${isChild ? '(路徑)' : ''}`}
                />
                
                <div className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                  <span className={`text-[10px] font-medium bg-white/60 dark:bg-slate-900/60 backdrop-blur-[1px] px-1.5 py-0.5 rounded-full border border-slate-100/50 dark:border-slate-800/50 shadow-sm ${isChild ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300'}`}>
                    {displayTitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'list' && (
        <div className="space-y-3">
          {items.map(item => {
            const zone = getZone(item.score);
            const parent = item.parentId ? items.find(p => p.id === item.parentId) : null;
            
            return (
              <Card key={item.id} className="p-4 flex justify-between items-center group relative overflow-hidden">
                {item.parentId && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-700"></div>
                )}
                <div>
                   {parent && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1">
                      <GitBranch className="w-3 h-3" /> 源自目標: {parent.title}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${zone.colorClass}`}></span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{item.title}</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex gap-2">
                      <span className={`${zone.textClass} ${zone.bgClass} px-1.5 py-0.5 rounded border ${zone.borderClass}`}>
                        {zone.name} ({item.score}%)
                      </span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="flex items-center gap-1 text-slate-300 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400 p-2 transition-colors text-xs font-medium"
                  title="完成/移除"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">抵達</span>
                  <Trash2 className="w-4 h-4" />
                </button>
              </Card>
            );
          })}
            {items.length === 0 && (
            <div className="text-center py-10 text-slate-400 dark:text-slate-600">
              這裡很安靜。準備好要出發了嗎？
            </div>
          )}
        </div>
      )}

      {tab === 'deconstruct' && (
        <div className="space-y-4 animate-in slide-in-from-right duration-300">
           <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 mb-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-800/50 rounded-full text-indigo-600 dark:text-indigo-400 mt-1">
                <Map className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-800 dark:text-indigo-300 text-sm">規劃桌 (迷霧尋路)</h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 leading-relaxed">
                  深入迷霧邊境的事物（不可控煩惱）無法一眼看清。必須在這裡攤開地圖，將其<b>拆解</b>成可行的路徑，才能累積探索<b>里程</b>！
                </p>
              </div>
            </div>
          </div>

          {deconstructableItems.length > 0 ? (
            deconstructableItems.map(item => {
               const zone = getZone(item.score);
               const childCount = items.filter(child => child.parentId === item.id).length;
               
               return (
                <Card key={item.id} className="p-4" onClick={() => startDeconstruct(item)}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${zone.colorClass}`}></span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">{item.title}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Score: {item.score}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        {childCount > 0 ? (
                          <span className={`flex items-center gap-1 ${childCount < 2 ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            <GitBranch className="w-3 h-3" /> 已規劃 {childCount} 條路徑
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500">尚未規劃</span>
                        )}
                      </div>
                      <button 
                        className="bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Split className="w-4 h-4" /> 拆解路徑
                      </button>
                  </div>
                </Card>
              );
            })
          ) : (
             <div className="text-center py-10 text-slate-400 dark:text-slate-600">
              視野清晰！目前沒有迷失在濃霧中的目標。<br/>(只有探索區或迷霧區的事物會出現在這裡)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Add View ---
const AddView = ({ newItem, setNewItem, submitTitle, onCancel, parentItem }) => (
  <div className="h-full flex flex-col pt-10 animate-in slide-in-from-right duration-300">
    <button onClick={onCancel} className="text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300">
      ← 返回
    </button>
    
    {parentItem && (
      <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
        <div className="text-xs text-indigo-400 dark:text-indigo-400 mb-1 flex items-center gap-1">
          <Map className="w-3 h-3" /> 正在尋找路徑
        </div>
        <div className="font-medium text-indigo-800 dark:text-indigo-200">{parentItem.title}</div>
      </div>
    )}

    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
      {parentItem ? "下一步怎麼走？" : "你在哪裡迷路了？"}
    </h2>
    <p className="text-slate-500 dark:text-slate-400 mb-8">
      {parentItem ? "針對這個目標，有什麼具體的小步驟（路徑）是你現在可以跨出的？" : "寫下那個讓你感到困惑或焦慮的地點。"}
    </p>
    
    <input
      autoFocus
      type="text"
      placeholder={parentItem ? "例如：先上網搜尋路線..." : "例如：擔心未來的職涯發展..."}
      className="w-full text-lg border-b-2 border-slate-200 dark:border-slate-700 py-4 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 bg-transparent text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-colors"
      value={newItem.title}
      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
      onKeyDown={(e) => e.key === 'Enter' && submitTitle()}
    />

    <div className="mt-auto pb-6">
      <button 
        onClick={submitTitle}
        disabled={!newItem.title.trim()}
        className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-lg"
      >
        評估路況 <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// --- Write Log View (撰寫日誌頁面) ---
const WriteLogView = ({ onSave, onCancel }) => {
  const [content, setContent] = useState('');
  const maxLength = 50;

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSave(content);
  };

  return (
    <div className="h-full flex flex-col pt-10 animate-in slide-in-from-right duration-300">
      <button onClick={onCancel} className="text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300">
        ← 取消
      </button>

      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">旅程隨筆</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        今天的風景如何？寫下你的發現，最多 {maxLength} 字。
      </p>

      <div className="relative">
        <textarea
          autoFocus
          className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none transition-all"
          placeholder="例如：雖然在迷霧中徘徊了一陣子，但我發現了一條通往安全屋的小徑..."
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setContent(e.target.value);
            }
          }}
        />
        <div className={`absolute bottom-3 right-3 text-xs font-mono ${content.length >= maxLength ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
          {content.length}/{maxLength}
        </div>
      </div>

      <div className="mt-auto pb-6">
        <button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-lg"
        >
          保存筆記 <PenLine className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// --- Log History View (閱覽日誌頁面) ---
const LogHistoryView = ({ logs, onBack }) => {
  return (
    <div className="h-full flex flex-col pt-6 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1">
          ← 返回羅盤
        </button>
        <span className="text-xs font-bold tracking-wider text-slate-300 dark:text-slate-600 uppercase">Journal</span>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> 旅程回顧
      </h2>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {logs.length > 0 ? (
          logs.map(log => (
            <div key={log.id} className="relative pl-6 pb-2 border-l-2 border-slate-200 dark:border-slate-700 last:border-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-100 dark:bg-slate-800 border-2 border-indigo-500 dark:border-indigo-400"></div>
              <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mb-2 flex items-center gap-1">
                   <Calendar className="w-3 h-3" /> {log.date}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {log.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-slate-400 dark:text-slate-600">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>筆記本是空的。<br/>記錄下你的第一個發現吧！</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Analyze View ---
const AnalyzeView = ({ newItem, setNewItem, saveItem, onBack }) => {
  const currentScore = calculateControlScore(newItem.agency, newItem.predictability, newItem.external);
  const currentZone = getZone(currentScore);

  return (
    <div className="h-full flex flex-col pt-4 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">← 返回</button>
        <span className="text-xs font-bold tracking-wider text-slate-300 dark:text-slate-600 uppercase">Assessment</span>
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">{newItem.title}</h2>

      <div className="space-y-8 flex-1 overflow-y-auto pr-2">
        {/* Slider 1 */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium text-slate-700 dark:text-slate-300">我的掌握程度？</label>
            <span className="text-slate-500 dark:text-slate-400 font-mono">{newItem.agency}%</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">這段旅程是完全由你決定方向，還是得跟著別人的腳步？</p>
          <input 
            type="range" min="0" max="100" 
            value={newItem.agency} 
            onChange={(e) => setNewItem({...newItem, agency: parseInt(e.target.value)})}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-slate-400 dark:text-slate-600 mt-1">
            <span>依賴他人</span>
            <span>自己決定</span>
          </div>
        </div>

        {/* Slider 2 */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium text-slate-700 dark:text-slate-300">結果確定性？</label>
            <span className="text-slate-500 dark:text-slate-400 font-mono">{newItem.predictability}%</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">如果按照地圖走，能保證到達目的地嗎？</p>
          <input 
            type="range" min="0" max="100" 
            value={newItem.predictability} 
            onChange={(e) => setNewItem({...newItem, predictability: parseInt(e.target.value)})}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
          />
            <div className="flex justify-between text-xs text-slate-400 dark:text-slate-600 mt-1">
            <span>充滿變數</span>
            <span>路線清晰</span>
          </div>
        </div>

        {/* Slider 3 */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium text-slate-700 dark:text-slate-300">環境干擾程度？</label>
            <span className="text-slate-500 dark:text-slate-400 font-mono">{newItem.external}%</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">天氣、交通或突發狀況對旅程的阻礙有多大？</p>
          <input 
            type="range" min="0" max="100" 
            value={newItem.external} 
            onChange={(e) => setNewItem({...newItem, external: parseInt(e.target.value)})}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-slate-400 dark:text-slate-600 mt-1">
            <span>風平浪靜</span>
            <span>環境險惡</span>
          </div>
        </div>

        {/* 預覽結果卡片 */}
        <div className={`mt-8 p-5 rounded-xl border transition-colors duration-500 ${currentZone.bgClass} ${currentZone.borderClass}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-full shadow-sm bg-white dark:bg-slate-800 ${currentZone.textClass}`}>
              {currentZone.icon}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider opacity-60 font-bold dark:text-slate-300">路況分析</div>
              <div className={`font-bold ${currentZone.textClass}`}>{currentZone.name} ({currentScore}%)</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentZone.desc}
          </p>
        </div>
      </div>

      <div className="mt-6 pb-6">
        <button 
          onClick={saveItem}
          className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-xl font-medium shadow-lg hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all active:scale-95 flex justify-center items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> 確認標記
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('dashboard'); // dashboard, add, analyze, write-log, view-logs
  
  // 1. Theme State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('anchor-theme');
      if (saved !== null) return JSON.parse(saved);
    }
    return true; 
  });

  // 更新：教學指引顯示邏輯 (改為讀取 localStorage)
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      // 檢查是否曾經看過教學
      const hasSeen = localStorage.getItem('anchor-intro-seen');
      return !hasSeen; // 如果沒看過 (null/false)，則顯示 (true)
    }
    return true;
  });

  const handleCloseIntro = () => {
    setShowIntro(false);
    // 關閉時標記為已讀
    localStorage.setItem('anchor-intro-seen', 'true');
  };

  // 2. Miles (Was Merits/Coins)
  const [miles, setMiles] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('anchor-miles'); 
      if (saved !== null) return JSON.parse(saved);
    }
    return 0; 
  });
  
  // 3. Items State
  const [items, setItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('anchor-items');
      if (saved !== null) return JSON.parse(saved);
    }
    return [
      { id: 1, title: '下週的專案報告', agency: 90, predictability: 80, external: 20, score: 85, date: '2023-10-01', parentId: null, angle: 1.2 },
      { id: 2, title: '市場對新產品的反應', agency: 40, predictability: 30, external: 80, score: 35, date: '2023-10-02', parentId: null, angle: 4.5 },
    ];
  });

  // 4. Logs State
  const [logs, setLogs] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('anchor-logs');
      if (saved !== null) return JSON.parse(saved);
    }
    return [];
  });
  
  const [newItem, setNewItem] = useState({ title: '', agency: 50, predictability: 50, external: 50, parentId: null });

  // Effects to Save to LocalStorage & Force Body Background
  useEffect(() => {
    localStorage.setItem('anchor-theme', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
      // 強制設定 body 背景色，解決手機版過度捲動出現白底問題
      document.body.style.backgroundColor = '#020617'; // slate-950
      document.documentElement.style.backgroundColor = '#020617';
    } else {
      document.documentElement.classList.remove('dark');
      // 強制設定 body 背景色
      document.body.style.backgroundColor = '#f8fafc'; // slate-50
      document.documentElement.style.backgroundColor = '#f8fafc';
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('anchor-items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('anchor-miles', JSON.stringify(miles)); 
  }, [miles]);

  useEffect(() => {
    localStorage.setItem('anchor-logs', JSON.stringify(logs));
  }, [logs]);

  const startAdd = (parentItem = null) => {
    setNewItem({ 
      title: '', 
      agency: 50, 
      predictability: 50, 
      external: 50,
      parentId: parentItem ? parentItem.id : null 
    });
    setView('add');
  };

  const submitTitle = () => {
    if (!newItem.title.trim()) return;
    setView('analyze');
  };

  const saveItem = () => {
    const score = calculateControlScore(newItem.agency, newItem.predictability, newItem.external);
    const randomAngle = Math.random() * 2 * Math.PI;

    const item = {
      id: Date.now(),
      ...newItem,
      score,
      angle: randomAngle, 
      date: new Date().toLocaleDateString()
    };
    
    // Miles Logic: Only deconstruction yields miles (+1 km)
    if (item.parentId) {
      setMiles(prev => prev + 1);
    } 

    setItems([item, ...items]);
    setView('dashboard');
  };

  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id && i.parentId !== id));
  };

  // 處理日誌保存
  const saveLog = (content) => {
    const newLog = {
      id: Date.now(),
      content: content,
      date: new Date().toLocaleDateString()
    };
    setLogs([newLog, ...logs]); 
    setView('dashboard');
  };

  const currentParentItem = newItem.parentId ? items.find(i => i.id === newItem.parentId) : null;

  return (
    // 更新：移除最外層 transition-colors 以避免初始閃爍
    <div className={`fixed inset-0 flex justify-center sm:p-4 font-sans overscroll-none ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 更新：傳遞新的關閉處理函式 */}
      {showIntro && <IntroModal onClose={handleCloseIntro} />}

      {/* 更新：主應用容器樣式調整，手機版滿版無圓角 */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full sm:h-auto sm:min-h-[85vh] shadow-2xl rounded-none sm:rounded-[2rem] overflow-hidden flex flex-col relative border-0 sm:border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="flex-1 p-6 overflow-y-auto overscroll-contain">
          {view === 'dashboard' && (
            <Dashboard 
              items={items} 
              startAdd={startAdd} 
              startDeconstruct={startAdd}
              deleteItem={deleteItem} 
              toggleTheme={() => setIsDark(!isDark)}
              isDark={isDark}
              onShowIntro={() => setShowIntro(true)} // 仍保留手動開啟教學的功能
              miles={miles}
              startWriteLog={() => setView('write-log')}
              viewLogs={() => setView('view-logs')}
            />
          )}
          {view === 'add' && (
            <AddView 
              newItem={newItem} 
              setNewItem={setNewItem} 
              submitTitle={submitTitle} 
              onCancel={() => setView('dashboard')}
              parentItem={currentParentItem}
            />
          )}
          {view === 'analyze' && (
            <AnalyzeView 
              newItem={newItem} 
              setNewItem={setNewItem} 
              saveItem={saveItem} 
              onBack={() => setView('add')} 
            />
          )}
          {view === 'write-log' && (
            <WriteLogView 
              onSave={saveLog}
              onCancel={() => setView('dashboard')}
            />
          )}
          {view === 'view-logs' && (
            <LogHistoryView 
              logs={logs}
              onBack={() => setView('dashboard')}
            />
          )}
        </div>
      </div>
    </div>
  );
}