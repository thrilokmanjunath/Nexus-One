"use client";

import { Activity } from "lucide-react";

export default function DashboardOverviewPage() {
  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">Welcome to your Nexus-One enterprise workspace.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium">Total Datasets</h3>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium">Active Experiments</h3>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium">Deployed Agents</h3>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl h-96 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white">No activity yet</h3>
          <p className="text-slate-400 mt-1">Get started by uploading your first dataset.</p>
        </div>
      </div>
    </div>
  );
}
