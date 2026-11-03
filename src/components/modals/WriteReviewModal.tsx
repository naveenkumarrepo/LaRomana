import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StarRating } from '../common/StarRating';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'place' | 'package' | 'guide' | 'hotel' | 'product';
  targetTitle: string;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetType,
  targetTitle
}) => {
  const { addReview, user, isGuest, setAuthModalOpen } = useApp();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuest) {
      setAuthModalOpen(true);
      return;
    }
    if (!comment.trim()) return;

    addReview({
      targetId,
      targetType,
      authorName: user.name || 'Verified Explorer',
      rating,
      comment: comment.trim()
    });

    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Share Your Review</h3>
            <p className="text-xs text-slate-500 truncate max-w-[260px]">{targetTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="text-center py-2.5 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500 block mb-1">Tap to Rate</span>
            <div className="flex justify-center">
              <StarRating
                rating={rating}
                interactive={true}
                size="lg"
                showNumber={false}
                onRate={(val) => setRating(val)}
              />
            </div>
            <span className="text-xs font-bold text-slate-800 mt-1 block">
              {rating === 5 ? 'Exceptional (5/5)' : rating === 4 ? 'Very Good (4/5)' : rating === 3 ? 'Average (3/5)' : 'Needs Improvement'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Your Experience
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your experience, highlights, or tips for fellow travelers..."
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            <span>Posting publicly as {isGuest ? 'Guest (will prompt sign-in)' : user.name}</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Review</span>
          </button>
        </form>

      </div>
    </div>
  );
};
