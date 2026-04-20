import React from "react";
import {
  BarChart3,
  Zap,
  Star,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const LimitBar = ({ limitData }) => {
  if (!limitData) return null;

  const progress = Math.min(
    (limitData.used / limitData.freeLimit) * 100,
    100
  );

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-green-100 rounded-2xl shadow-lg p-4 mt-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">
          <BarChart3 className="text-green-600" />
          <p className="font-semibold text-gray-700">
            Listing Usage Overview
          </p>
        </div>

        <div className="text-xs text-gray-500">
          Free Plan
        </div>
      </div>

      {/* FREE LIMIT PROGRESS */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-700 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>
          Used: {limitData.used}/{limitData.freeLimit}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>

      {limitData.remainingFree === 0 && (
        <div className="flex items-center gap-1 mt-2 text-red-500 text-xs">
          <AlertTriangle size={14} />
          Free limit exhausted
        </div>
      )}

      {/* PAID CREDITS */}
      {(limitData.paidCredits?.normal > 0 ||
        limitData.paidCredits?.featured > 0) && (
        <div className="mt-4 border-t pt-3">

          <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <Zap size={16} className="text-yellow-500" />
            Paid Credits
          </p>

          <div className="flex gap-2 flex-wrap">

            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full flex items-center gap-1">
              <CheckCircle2 size={12} />
              Normal: {limitData.paidCredits.normal}
            </span>

            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1">
              <Star size={12} />
              Featured: {limitData.paidCredits.featured}
            </span>

          </div>
        </div>
      )}
    </div>
  );
};

export default LimitBar;