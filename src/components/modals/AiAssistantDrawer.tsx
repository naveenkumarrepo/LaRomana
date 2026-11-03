import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ArrowRight, 
  Compass, 
  Package, 
  Building, 
  Utensils, 
  ShoppingBag, 
  Home 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  SAMPLE_PLACES, 
  SAMPLE_PACKAGES, 
  SAMPLE_HOTELS, 
  SAMPLE_RESTAURANTS, 
  SAMPLE_PRODUCTS, 
  SAMPLE_PROPERTIES 
} from '../../data/sampleData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AssistantCard {
  title: string;
  image: string;
  subtitle: string;
  price?: string;
  badge: string;
  routeAction: () => void;
}

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
  cards?: AssistantCard[];
  followUps?: string[];
}

export const AiAssistantDrawer: React.FC = () => {
  const { isAiAssistantOpen, setAiAssistantOpen, navigate } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initialGreeting: Message = {
    id: 'msg-0',
    sender: 'assistant',
    text: "Hi! I'm your personal discovery assistant. Where would you like to explore today?",
    time: 'Just now',
    followUps: [
      'Find places to visit',
      'Recommend travel packages',
      'Find hotels nearby',
      'Discover local food',
      'Shop for products',
      'Find properties'
    ]
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isAiAssistantOpen) return null;

  const handleSend = (userQuery: string) => {
    const q = userQuery.trim();
    if (!q) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = q.toLowerCase();
      let responseText = "Here are curated recommendations for your journey on OnePlace:";
      let cards: AssistantCard[] = [];
      let followUps: string[] = ['Find hotels nearby', 'Recommend travel packages', 'Shop for products'];

      if (lower.includes('place') || lower.includes('visit') || lower.includes('destination') || lower.includes('see')) {
        responseText = "I picked two of the most breathtaking destinations in La Romana for you to explore:";
        cards = SAMPLE_PLACES.slice(0, 2).map((place) => ({
          title: place.name,
          image: place.images[0],
          subtitle: place.location,
          badge: place.category,
          routeAction: () => {
            setAiAssistantOpen(false);
            navigate({ name: 'place_detail', id: place.id });
          }
        }));
        followUps = ['Recommend travel packages', 'Find hotels in Casa de Campo', 'Discover local food'];
      } else if (lower.includes('package') || lower.includes('tour') || lower.includes('trip') || lower.includes('itinerary')) {
        responseText = "Here are top-rated all-inclusive excursions departing from Bayahíbe and La Romana:";
        cards = SAMPLE_PACKAGES.slice(0, 2).map((pkg) => ({
          title: pkg.name,
          image: pkg.images[0],
          subtitle: pkg.destination,
          price: `$${pkg.pricePerPerson.toLocaleString()} USD`,
          badge: pkg.duration,
          routeAction: () => {
            setAiAssistantOpen(false);
            navigate({ name: 'package_detail', id: pkg.id });
          }
        }));
        followUps = ['Find places to visit', 'Find hotels nearby'];
      } else if (lower.includes('hotel') || lower.includes('stay') || lower.includes('resort')) {
        responseText = "Check out these exceptional Caribbean luxury resorts in Casa de Campo and Bayahíbe:";
        cards = SAMPLE_HOTELS.slice(0, 2).map((h) => ({
          title: h.name,
          image: h.images[0],
          subtitle: h.location,
          price: `$${h.pricePerNight.toLocaleString()} USD/night`,
          badge: 'Luxury Resort',
          routeAction: () => {
            setAiAssistantOpen(false);
            navigate({ name: 'hotel_detail', id: h.id });
          }
        }));
        followUps = ['Discover local food', 'Recommend travel packages'];
      } else if (lower.includes('food') || lower.includes('restaurant') || lower.includes('eat') || lower.includes('dish')) {
        responseText = "Indulge in authentic Dominican seafood, mofongo, and signature criollo flavors:";
        cards = SAMPLE_RESTAURANTS.slice(0, 2).map((r) => ({
          title: r.name,
          image: r.images[0],
          subtitle: r.cuisine,
          price: r.priceLevel,
          badge: r.location,
          routeAction: () => {
            setAiAssistantOpen(false);
            navigate({ name: 'food_detail', id: r.id });
          }
        }));
        followUps = ['Find hotels nearby', 'Shop for products'];
      } else if (lower.includes('shop') || lower.includes('product') || lower.includes('buy') || lower.includes('larimar') || lower.includes('cigar') || lower.includes('rum')) {
        responseText = "Here are authentic Dominican artisanal treasures sourced directly in La Romana:";
        cards = SAMPLE_PRODUCTS.slice(0, 2).map((p) => ({
          title: p.name,
          image: p.images[0],
          subtitle: p.category,
          price: `$${p.price.toLocaleString()} USD`,
          badge: p.variants ? `${p.variants.length} Options` : 'Artisan Crafted',
          routeAction: () => {
            setAiAssistantOpen(false);
            navigate({ name: 'product_detail', id: p.id });
          }
        }));
        followUps = ['Find properties', 'Recommend travel packages'];
      } else if (lower.includes('property') || lower.includes('real estate') || lower.includes('villa') || lower.includes('land') || lower.includes('house')) {
        responseText = "Explore exclusive Casa de Campo luxury villas and Caribbean oceanfront residences:";
        cards = SAMPLE_PROPERTIES.slice(0, 2).map((prop) => ({
          title: prop.title,
          image: prop.images[0],
          subtitle: prop.location,
          price: prop.priceFormatted,
          badge: prop.propertyType,
          routeAction: () => {
            setAiAssistantOpen(false);
            navigate({ name: 'property_detail', id: prop.id });
          }
        }));
        followUps = ['Find places to visit', 'Find hotels nearby'];
      } else {
        responseText = `I'd love to help with that! Here is a popular Caribbean highlight from our La Romana catalog:`;
        cards = [
          {
            title: SAMPLE_PACKAGES[0].name,
            image: SAMPLE_PACKAGES[0].images[0],
            subtitle: SAMPLE_PACKAGES[0].destination,
            price: `$${SAMPLE_PACKAGES[0].pricePerPerson.toLocaleString()} USD`,
            badge: 'Featured Excursion',
            routeAction: () => {
              setAiAssistantOpen(false);
              navigate({ name: 'package_detail', id: SAMPLE_PACKAGES[0].id });
            }
          }
        ];
      }

      const botMsg: Message = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cards,
        followUps
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 h-[85vh] sm:h-[680px] flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900">OnePlace AI Assistant</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Personalized travel & discovery concierge</p>
            </div>
          </div>
          <button
            onClick={() => setAiAssistantOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer border border-slate-200"
            title="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat message feed */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-2.5">
              <div className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-teal-500/10 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`block text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Recommendation Cards */}
              {msg.cards && msg.cards.length > 0 && (
                <div className="pl-9 space-y-2">
                  {msg.cards.map((card, idx) => (
                    <div
                      key={idx}
                      onClick={card.routeAction}
                      className="group p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 cursor-pointer transition-all shadow-2xs flex items-center gap-3"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative bg-slate-900">
                        <ImageWithFallback src={card.image} alt={card.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-teal-700 block truncate">
                          {card.badge}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                          {card.title}
                        </h4>
                        <span className="text-[11px] text-slate-500 truncate block">
                          {card.subtitle}
                        </span>
                        {card.price && (
                          <span className="text-xs font-bold text-slate-900 tabular-nums mt-0.5 block">
                            {card.price}
                          </span>
                        )}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center text-slate-500 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Follow-up question chips */}
              {msg.followUps && msg.followUps.length > 0 && (
                <div className="pl-9 flex flex-wrap gap-1.5 pt-1">
                  {msg.followUps.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(chip)}
                      className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-teal-500 text-[11px] font-medium text-slate-700 hover:text-teal-700 transition-colors shadow-2xs cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[11px]">Finding recommendations...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (places, hotels, foods, properties)..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
