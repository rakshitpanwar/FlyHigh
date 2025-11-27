import React from 'react';

export default function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Airline Info Skeleton */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Flight Times Skeleton */}
                <div className="flex-1 flex items-center justify-center gap-8 w-full">
                    <div className="space-y-2 text-center">
                        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-3 w-8 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </div>
                    <div className="flex-1 max-w-[120px] space-y-2">
                        <div className="h-3 w-12 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                    <div className="space-y-2 text-center">
                        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-3 w-8 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Price & Action Skeleton */}
                <div className="w-full md:w-1/4 flex flex-col items-end gap-3">
                    <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
