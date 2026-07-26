import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import ChatAssistantDashboard from "@/components/MatrixAI/ChatAssistantDashboard";

export const Route = createFileRoute("/ai-assistant")({
  component: AIAssistantPageRoute
});

function AIAssistantPageRoute() {
  return (
    <PageLayout>
      <div className="bg-charcoal min-h-screen pt-20">
        <ChatAssistantDashboard />
      </div>
    </PageLayout>
  );
}
