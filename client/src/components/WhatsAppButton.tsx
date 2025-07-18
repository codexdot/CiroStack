import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppButton({ phoneNumber, message = "Hello! I'm interested in your services." }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 gradient-bg text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group hover:shadow-xl"
      aria-label="Contact via WhatsApp"
      style={{
        background: 'linear-gradient(135deg, #00f0ff, #ff00f0)',
        boxShadow: '0 4px 15px rgba(0, 240, 255, 0.3)'
      }}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700">
        Chat on WhatsApp
      </span>
    </button>
  );
}