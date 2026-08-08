import { ArrowRight, Database, BrainCircuit, Activity, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold tracking-tighter">Nexus-One</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#agents" className="hover:text-white transition-colors">Agents</Link>
          <Link href="#docs" className="hover:text-white transition-colors">Docs</Link>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-8 border border-purple-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          v2.0 Enterprise Release
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
          The Unified Platform for<br />Autonomous AI Teams
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Deploy, monitor, and scale AI Agents alongside your data pipelines. 
          Enterprise-grade MLOps, vector search, and RAG built right in.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
            Start Building
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-4 rounded-full font-medium border border-white/20 hover:bg-white/5 transition-all">
            View Documentation
          </button>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Database className="w-6 h-6 text-blue-400" />}
            title="Data Engineering"
            desc="Robust ETL/ELT pipelines with built-in validation and quality checks."
          />
          <FeatureCard 
            icon={<Cpu className="w-6 h-6 text-green-400" />}
            title="MLOps & Training"
            desc="Experiment tracking, model registry, and automated retraining workflows."
          />
          <FeatureCard 
            icon={<Activity className="w-6 h-6 text-orange-400" />}
            title="Real-time Analytics"
            desc="Monitor drift, latency, and performance with interactive dashboards."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
