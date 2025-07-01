import { useState, useEffect } from "react";
import { AgentService } from "@/services/agentService";
import { Agent } from "@/lib/supabase";

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AgentService.getAllAgents();
      setAgents(data);
    } catch (err) {
      setError("Erreur lors du chargement des agents");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const refreshAgents = () => {
    fetchAgents();
  };

  return {
    agents,
    loading,
    error,
    refreshAgents,
  };
};

export const useAgent = (id: string) => {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await AgentService.getAgentById(id);
        setAgent(data);
      } catch (err) {
        setError("Erreur lors du chargement de l'agent");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAgent();
    }
  }, [id]);

  return { agent, loading, error };
};
