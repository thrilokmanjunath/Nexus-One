"use client";

import { useState } from "react";
import { Box, Search, ArrowRight, Tag, Star } from "lucide-react";

export default function ModelRegistryPage() {
  const [models] = useState([
    { id: 1, name: "Customer Churn Model", version: "v1.2.0", stage: "Production", accuracy: 0.92, lastUpdated: "2024-03-20" },
    { id: 2, name: "Fraud Detection DeepNet", version: "v2.0.1", stage: "Staging", accuracy: 0.95, lastUpdated: "2024-03-18" },
    { id: 3, name: "Product Recommendation", version: "v0.9.0", stage: "Archived", accuracy: 0.81, lastUpdated: "2023-11-10" },
  ]);

  const getStageColor = (stage: string) => {
    if (stage === "Production") return "bg-green-500/10 text-green-500";
    if (stage === "Staging") return "bg-blue-500/10 text-blue-500";
    return "bg-slate-500/10 text-slate-400";
  };

  return (
    <div className="flex-1 overflow-auto">
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8">
        <h1 className="text-lg font-semibold text-white">Model Registry</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search models..."
              className="bg-slate-800/50 border border-slate-700 text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80">
                <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Model Name</th>
                <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Version</th>
                <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Stage</th>
                <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Accuracy</th>
                <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Last Updated</th>
                <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {models.map((model) => (
                <tr key={model.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                        <Box className="w-4 h-4 text-purple-500" />
                      </div>
                      <span className="font-medium text-white">{model.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Tag className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono text-sm">{model.version}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStageColor(model.stage)}`}>
                      {model.stage}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className={`w-3.5 h-3.5 ${model.accuracy > 0.9 ? 'text-yellow-500' : 'text-slate-500'}`} />
                      <span className="text-slate-300 font-medium">{(model.accuracy * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-400">
                    {model.lastUpdated}
                  </td>
                  <td className="p-4">
                    <button className="text-blue-500 hover:text-blue-400 font-medium text-sm flex items-center gap-1">
                      Details <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
