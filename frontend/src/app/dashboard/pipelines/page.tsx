"use client";

import { useState, useCallback } from "react";
import { GitCommit, Play, Plus, Search, Settings2, Share2, Save } from "lucide-react";
import ReactFlow, { Background, Controls, MiniMap, addEdge, applyNodeChanges, applyEdgeChanges, Node, Edge, Connection, NodeChange, EdgeChange } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  { id: '1', type: 'default', data: { label: 'Data Loader: Load Customers CSV' }, position: { x: 250, y: 50 } },
  { id: '2', type: 'default', data: { label: 'Preprocessing: Impute Missing Values' }, position: { x: 250, y: 150 } },
  { id: '3', type: 'default', data: { label: 'Model Training: Train XGBoost' }, position: { x: 250, y: 250 } },
  { id: '4', type: 'default', data: { label: 'Evaluation: Calculate Metrics' }, position: { x: 250, y: 350 } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];

export default function PipelinesPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8 shrink-0">
        <h1 className="text-lg font-semibold text-white flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-blue-500" />
          Pipeline Builder
        </h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Save className="w-4 h-4" /> Save
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Play className="w-4 h-4" /> Run Pipeline
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Components */}
        <div className="w-64 border-r border-slate-800 bg-slate-900/30 overflow-y-auto p-4 hidden md:block">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Components</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Data Operations</h4>
              <div className="space-y-2">
                <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg cursor-grab hover:border-blue-500 transition-colors">
                  <span className="text-sm text-white font-medium">Load Dataset</span>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg cursor-grab hover:border-blue-500 transition-colors">
                  <span className="text-sm text-white font-medium">Data Transformation</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Machine Learning</h4>
              <div className="space-y-2">
                <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg cursor-grab hover:border-purple-500 transition-colors">
                  <span className="text-sm text-white font-medium">Train Model</span>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg cursor-grab hover:border-purple-500 transition-colors">
                  <span className="text-sm text-white font-medium">Evaluate</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">AI Agents</h4>
              <div className="space-y-2">
                <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg cursor-grab hover:border-green-500 transition-colors">
                  <span className="text-sm text-white font-medium">Agent Task</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area with React Flow */}
        <div className="flex-1 h-full relative">
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-slate-950"
            theme="dark"
          >
            <Background color="#334155" gap={24} />
            <Controls className="bg-slate-800 border-slate-700 fill-white" />
            <MiniMap nodeStrokeColor="#475569" nodeColor="#1e293b" maskColor="rgba(15, 23, 42, 0.7)" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
