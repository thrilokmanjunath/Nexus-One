"use client";

import { useState, useEffect } from "react";
import { Activity, Plus, Search, ArrowRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpName, setNewExpName] = useState("");
  const [newExpDesc, setNewExpDesc] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const [expRes, projRes] = await Promise.all([
        fetch("http://localhost:8000/api/v1/experiments", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://localhost:8000/api/v1/projects", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      if (expRes.ok && projRes.ok) {
        const expData = await expRes.json();
        const projData = await projRes.json();
        setExperiments(expData);
        setProjects(projData);
        if (projData.length > 0) setSelectedProjectId(projData[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateExperiment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return alert("Please select a project");
    
    setCreating(true);
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch("http://localhost:8000/api/v1/experiments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newExpName,
          description: newExpDesc,
          project_id: selectedProjectId
        }),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setNewExpName("");
        setNewExpDesc("");
        fetchData();
      } else {
        alert("Failed to create experiment");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating experiment");
    } finally {
      setCreating(false);
    }
  };

  const getStatusIcon = (status: str) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'running': return <Activity className="w-5 h-5 text-blue-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8">
        <h1 className="text-lg font-semibold text-white">Experiments</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search experiments..."
              className="bg-slate-800/50 border border-slate-700 text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Experiment
          </button>
        </div>
      </header>

      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
             <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : experiments.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white">No experiments yet</h3>
              <p className="text-slate-400 mt-1">Start your first experiment to track ML models.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Create Experiment
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Project</th>
                  <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Created</th>
                  <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {experiments.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(exp.status)}
                        <span className="text-sm font-medium capitalize text-slate-300">{exp.status}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{exp.name}</div>
                      <div className="text-sm text-slate-500 truncate max-w-xs">{exp.description}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      {projects.find(p => p.id === exp.project_id)?.name || "Unknown"}
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      {new Date(exp.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Link href={`/dashboard/experiments/${exp.id}`} className="text-blue-500 hover:text-blue-400 font-medium text-sm flex items-center gap-1">
                        View <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Create New Experiment</h2>
            <form onSubmit={handleCreateExperiment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Project</label>
                <select
                  required
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 block w-full px-4 py-2.5 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white transition-colors"
                >
                  <option value="" disabled>Select a project</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Experiment Name</label>
                <input
                  required
                  type="text"
                  value={newExpName}
                  onChange={(e) => setNewExpName(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 block w-full px-4 py-2.5 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-500 transition-colors"
                  placeholder="e.g. Random Forest v1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description (Optional)</label>
                <textarea
                  value={newExpDesc}
                  onChange={(e) => setNewExpDesc(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 block w-full px-4 py-2.5 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-500 transition-colors h-24 resize-none"
                  placeholder="What are you testing?"
                ></textarea>
              </div>
              <div className="flex items-center gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || projects.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Experiment"}
                </button>
              </div>
              {projects.length === 0 && (
                <p className="text-red-400 text-xs mt-2 text-center">You must create a project first.</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
