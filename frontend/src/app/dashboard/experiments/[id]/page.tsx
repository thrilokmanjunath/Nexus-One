"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Play, Square, Activity, Settings, BarChart2 } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function ExperimentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [experiment, setExperiment] = useState<any>(null);
  const [metricsHistory, setMetricsHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperimentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        
        const [expRes, metricsRes] = await Promise.all([
          fetch(`http://localhost:8000/api/v1/experiments/${id}`, { headers }),
          fetch(`http://localhost:8000/api/v1/experiments/${id}/metrics`, { headers })
        ]);
        
        if (expRes.ok) {
          const data = await expRes.json();
          setExperiment(data);
        } else {
          router.push("/dashboard/experiments");
          return;
        }
        
        if (metricsRes.ok) {
          const metricsData = await metricsRes.json();
          setMetricsHistory(metricsData.metrics || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperimentData();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!experiment) return null;

  return (
    <div className="flex-1 overflow-auto bg-slate-950">
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center px-8">
        <Link href="/dashboard/experiments" className="text-slate-400 hover:text-white transition-colors mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold text-white flex items-center gap-3">
          {experiment.name}
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            experiment.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
            experiment.status === 'running' ? 'bg-blue-500/10 text-blue-500' :
            'bg-slate-500/10 text-slate-400'
          }`}>
            {experiment.status}
          </span>
        </h1>
        <div className="ml-auto flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Square className="w-4 h-4 text-slate-400" /> Stop Run
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Play className="w-4 h-4" /> Restart
          </button>
        </div>
      </header>

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-blue-500" />
                  Training Metrics
                </h2>
                <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500">
                  <option>Loss & Val Loss</option>
                  <option>Accuracy</option>
                </select>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metricsHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="epoch" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickMargin={10} />
                    <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickMargin={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="loss" name="Training Loss" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="val_loss" name="Validation Loss" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-medium text-white flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-green-500" />
                Latest Metrics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Final Loss</div>
                  <div className="text-2xl font-bold text-white">
                    {metricsHistory.length > 0 ? metricsHistory[metricsHistory.length - 1].loss.toFixed(3) : "—"}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Val Loss</div>
                  <div className="text-2xl font-bold text-white">
                    {metricsHistory.length > 0 ? metricsHistory[metricsHistory.length - 1].val_loss.toFixed(3) : "—"}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Accuracy</div>
                  <div className="text-2xl font-bold text-white">
                    {metricsHistory.length > 0 ? `${(metricsHistory[metricsHistory.length - 1].accuracy * 100).toFixed(1)}%` : "—"}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Epochs</div>
                  <div className="text-2xl font-bold text-white">
                    {metricsHistory.length > 0 ? metricsHistory[metricsHistory.length - 1].epoch : "0"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-medium text-white flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-purple-500" />
                Hyperparameters
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                  <span className="text-slate-400 text-sm">learning_rate</span>
                  <span className="text-white font-mono text-sm bg-slate-800 px-2 py-1 rounded">0.001</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                  <span className="text-slate-400 text-sm">batch_size</span>
                  <span className="text-white font-mono text-sm bg-slate-800 px-2 py-1 rounded">32</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                  <span className="text-slate-400 text-sm">optimizer</span>
                  <span className="text-white font-mono text-sm bg-slate-800 px-2 py-1 rounded">&quot;Adam&quot;</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                  <span className="text-slate-400 text-sm">epochs</span>
                  <span className="text-white font-mono text-sm bg-slate-800 px-2 py-1 rounded">10</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400 text-sm">architecture</span>
                  <span className="text-white font-mono text-sm bg-slate-800 px-2 py-1 rounded">&quot;ResNet50&quot;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
