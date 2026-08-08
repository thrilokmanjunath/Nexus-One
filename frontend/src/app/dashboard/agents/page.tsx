"use client";

import { useState, useEffect } from "react";
import { Zap, Plus, Settings, Play, Bot, ArrowRight, UserCog } from "lucide-react";

export default function AgentsWorkspacePage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", role: "", goal: "" });

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/agents");
      if (res.ok) {
        const data = await res.json();
        setAgents(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/v1/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAgent),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewAgent({ name: "", role: "", goal: "" });
        fetchAgents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8">
        <h1 className="text-lg font-semibold text-white">AI Agents Workspace</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Agent
        </button>
      </header>

      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
             <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : agents.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <Bot className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white">No agents deployed</h3>
              <p className="text-slate-400 mt-1">Create autonomous agents to automate workflows.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Create Agent
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {agents.map(agent => (
              <div key={agent.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{agent.name}</h3>
                    <p className="text-slate-400 text-sm flex items-center gap-1">
                      <UserCog className="w-3 h-3" /> {agent.role}
                    </p>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-3 mb-6">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Goal</p>
                  <p className="text-slate-300 text-sm line-clamp-2">{agent.goal}</p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Play className="w-4 h-4" /> Run Task
                  </button>
                  <button className="flex items-center justify-center w-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Create Autonomous Agent</h2>
            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Agent Name</label>
                <input
                  required
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                  className="bg-slate-800/50 border border-slate-700 block w-full px-4 py-2.5 sm:text-sm rounded-lg text-white"
                  placeholder="e.g. Data Scientist"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                <input
                  required
                  type="text"
                  value={newAgent.role}
                  onChange={(e) => setNewAgent({...newAgent, role: e.target.value})}
                  className="bg-slate-800/50 border border-slate-700 block w-full px-4 py-2.5 sm:text-sm rounded-lg text-white"
                  placeholder="e.g. Analyzes datasets and builds models"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Goal</label>
                <textarea
                  required
                  value={newAgent.goal}
                  onChange={(e) => setNewAgent({...newAgent, goal: e.target.value})}
                  className="bg-slate-800/50 border border-slate-700 block w-full px-4 py-2.5 sm:text-sm rounded-lg text-white h-24 resize-none"
                  placeholder="What is this agent supposed to achieve?"
                ></textarea>
              </div>
              <div className="flex items-center gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
                >
                  Create Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
