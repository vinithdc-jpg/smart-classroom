export default function GlassyCard({ className = '', children }) {
  return (
    <div className={`glass-panel rounded-[28px] border border-white/10 p-6 ${className}`}>
      {children}
    </div>
  );
}
