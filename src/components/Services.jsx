import ForkHero from './services/hub/ForkHero';
import ServiceRibbon from './services/hub/ServiceRibbon';
import GrowthOrbit from './services/hub/GrowthOrbit';
import BuildLab from './services/hub/BuildLab';
import ResultsWall from './work/ResultsWall';
import BeforeAfter from './services/hub/BeforeAfter';
import WebsiteAudit from './services/hub/WebsiteAudit';
import PlanBuilder from './services/hub/PlanBuilder';
import PromiseCard from './services/hub/PromiseCard';
import '../styles/services-hub.css';

export default function Services() {
  return (
    <div id="services" className="hub">
      <ForkHero />
      <ServiceRibbon />
      <GrowthOrbit />
      <ResultsWall
        id="results"
        title={<>Proof, not <em>promises.</em></>}
        lead="Real Instagram accounts we manage — tap through and check the numbers yourself."
      />
      <BuildLab />
      <BeforeAfter />
      <WebsiteAudit />
      <PlanBuilder />
      <PromiseCard />
    </div>
  );
}
